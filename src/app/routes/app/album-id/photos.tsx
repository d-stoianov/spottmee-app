import DragDropUpload from '@/components/DragDropUpload'
import Main from '@/components/layout/Main'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Typography } from '@/components/ui/Typography'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import usePhotos from '@/features/albums/usePhotosUpload'
import PhotoCard from '@/features/photos/PhotoCard'
import useIsMobile from '@/hooks/useIsMobile'
import useModal from '@/hooks/useModal'
import { Photo } from '@/services/PhotoService/types'
import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import PhotosTable from '@/features/photos/PhotosTable.tsx'
import { downloadFileFromURL } from '@/utils/file.ts'

// count of photos shown in a grid (API only, not the one that are uploading)
const PHOTOS_GRID_SIZE = 20

// size of the batch the photos are being uploaded to the API (whole batch shares the same progress)
const PHOTOS_UPLOAD_BATCH_SIZE = 10

const AlbumPhotosRoute: React.FC = () => {
    // general
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const { albumId } = useParams()

    // photos state
    const [photos, setPhotos] = useState<Photo[]>([]) // photos from API
    const [totalPhotos, setTotalPhotos] = useState<number>(0) // total number of photos (not current that are shown) need that to determine whether to show "see more" button
    const [photosToUpload, setPhotosToUpload] = useState<File[]>([])

    const [photosOffset, setPhotosOffset] = useState<number>(0)

    // loading states
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)

    // modals state
    const {
        isModalOpen: isUploadPhotosModalOpen,
        closeModal: closeUploadPhotosModal,
        openModal: openUploadPhotosModal,
    } = useModal()
    const {
        isModalOpen: isUploadDoneModalOpen,
        closeModal: closeUploadDoneModal,
        openModal: openUploadDoneModal,
    } = useModal()

    const { getAlbumById } = useAlbums()

    const {
        getPhotos,
        uploadProgress,
        uploadPhotosInBatches,
        isUploading,
        deletePhoto,
    } = usePhotos(albumId || '')

    const album = albumId ? getAlbumById(albumId) : undefined

    const handlePhotosUpload = async (files: File[]) => {
        setPhotosToUpload(files)
        closeUploadPhotosModal()
        await uploadPhotosInBatches(files, PHOTOS_UPLOAD_BATCH_SIZE)
        if (album) {
            // once upload is done show modal if its first upload
            if (photos.length === 0) {
                openUploadDoneModal()
            }

            const { photos: refetchedPhotos, total } = await getPhotos(
                0,
                PHOTOS_GRID_SIZE
            )
            setPhotos(refetchedPhotos)
            setTotalPhotos(total)
            setPhotosToUpload([])
            setPhotosOffset(0)
        }
    }

    const loadMorePhotos = async () => {
        const newOffset = photosOffset + PHOTOS_GRID_SIZE
        if (album) {
            const { photos, total } = await getPhotos(
                newOffset,
                PHOTOS_GRID_SIZE
            )
            setPhotos((prev) => [...prev, ...photos])
            setTotalPhotos(total)
            setPhotosOffset(newOffset)
        }
    }

    useEffect(() => {
        const getAlbumPhotos = async () => {
            if (album) {
                setIsPageLoading(true)
                const { photos, total } = await getPhotos(0, PHOTOS_GRID_SIZE)
                setPhotos(photos)
                setTotalPhotos(total)
                setIsPageLoading(false)
            }
        }
        getAlbumPhotos()
    }, [album])

    if (!album) {
        return
    }

    if (isPageLoading) {
        return (
            <Typography className="text-secondary" variant="bodyLarge">
                {t('general.loading')}
            </Typography>
        )
    }

    return (
        <Main className="flex w-full flex-col items-center lg:px-[8rem] lg:py-[3rem]">
            <Typography
                className="mb-[0.75rem] text-start text-white lg:text-center"
                variant={isMobile ? 'heading3' : 'heading1'}
            >
                {isUploading
                    ? t('albums.yourPhotosAreUploading')
                    : photos.length === 0
                      ? t('albums.uploadFirstPhotos')
                      : t('albums.photosFromAlbum', { albumName: album.name })}
            </Typography>

            <Typography
                variant={isMobile ? 'bodyLarge' : 'heading3'}
                className="text-secondary"
            >
                {totalPhotos > 0
                    ? t('albums.photosFromAlbumSubtext', {
                          count: totalPhotos,
                      })
                    : t('albums.uploadFirstPhotosSubtext', {
                          albumName: album.name,
                      })}
            </Typography>

            <Button
                className="mt-[2rem] lg:mt-[4rem]"
                onClick={() => openUploadPhotosModal()}
                variant="primary"
            >
                <Typography className="text-white" variant="buttonText">
                    {t('albums.uploadPhotos')}
                </Typography>
            </Button>

            {/* grid with existing and photos that are currently uploading */}

            <PhotosTable
                photosCards={photos
                    .sort(
                        (a, b) => b.createdAt.getTime() - a.createdAt.getTime() // sort by recents first
                    )
                    .map((photo) => {
                        return (
                            <PhotoCard
                                key={photo.id}
                                photo={photo}
                                onDownload={async () => {
                                    await downloadFileFromURL(
                                        photo.url,
                                        photo.originalName
                                    )
                                }}
                                onDelete={async () => {
                                    // delete in the API
                                    await deletePhoto(photo.id)
                                    // delete locally
                                    setPhotos((prevPhotos) =>
                                        prevPhotos.filter(
                                            (p) => p.id !== photo.id
                                        )
                                    )
                                    setTotalPhotos((prev) => prev - 1)
                                }}
                            />
                        )
                    })}
                uploadingPhotosCards={photosToUpload.map((f, idx) => {
                    const batchIndex = Math.floor(
                        idx / PHOTOS_UPLOAD_BATCH_SIZE
                    )

                    return (
                        <PhotoCard
                            key={idx} // make sure to have a unique key
                            photo={f}
                            uploadProgress={uploadProgress[batchIndex]}
                        />
                    )
                })}
                totalPhotos={totalPhotos}
                onLoadMorePhotos={loadMorePhotos}
            />

            <AnimatePresence>
                {isUploadPhotosModalOpen && (
                    <Modal
                        onClose={closeUploadPhotosModal}
                        title={t('albums.uploadPhotos')}
                    >
                        {/* upload drag-n-drop */}
                        <DragDropUpload onFilesSelected={handlePhotosUpload} />
                    </Modal>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isUploadDoneModalOpen && (
                    <Modal
                        onClose={closeUploadDoneModal}
                        title={t('albums.uploadDone')}
                        classname="items-center flex flex-col"
                    >
                        {/* navigation to sharing album page */}

                        <Link to={`/${album.id}/share`}>
                            <Typography
                                className="text-primary underline"
                                variant="buttonText"
                            >
                                {t('albums.shareTheAlbum')}
                            </Typography>
                        </Link>
                    </Modal>
                )}
            </AnimatePresence>
        </Main>
    )
}

export default AlbumPhotosRoute
