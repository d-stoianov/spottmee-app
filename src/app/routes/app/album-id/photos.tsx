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
import { useParams } from 'react-router-dom'

// count of photos shown in a grid (API only, not the one that are uploading)
const PHOTOS_GRID_SIZE = 20

// size of the batch the photos are being uploaded to the API (whole batch shares the same progress)
const PHOTOS_UPLOAD_BATCH_SIZE = 10

const AlbumPhotosRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const { albumId } = useParams()
    const { isModalOpen, closeModal, openModal } = useModal()

    const [photos, setPhotos] = useState<Photo[]>([]) // photos from API
    const [totalPhotos, setTotalPhotos] = useState<number>(0) // total number of photos (not current that are shown) need that to determine whether to show "see more" button
    const [photosToUpload, setPhotosToUpload] = useState<File[]>([])

    const [photosOffset, setPhotosOffset] = useState<number>(0)

    // loading states
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)

    const { getAlbumById } = useAlbums()

    const {
        getPhotos,
        uploadProgress,
        uploadPhotosInBatches,
        isUploading,
        downloadPhoto,
        deletePhoto,
    } = usePhotos(albumId || '')

    const album = albumId ? getAlbumById(albumId) : undefined

    const handlePhotosUpload = async (files: File[]) => {
        setPhotosToUpload(files)
        closeModal()
        await uploadPhotosInBatches(files, PHOTOS_UPLOAD_BATCH_SIZE)
        if (album) {
            const { photos, total } = await getPhotos(0, PHOTOS_GRID_SIZE)
            setPhotos(photos)
            setTotalPhotos(total)
            setPhotosToUpload([])
            setPhotosOffset(0)
        }
    }

    const loadMorePhotos = async () => {
        const newOffset = photosOffset + PHOTOS_GRID_SIZE
        if (album) {
            setIsLoadingMore(true)

            const { photos, total } = await getPhotos(
                newOffset,
                PHOTOS_GRID_SIZE
            )
            setPhotos((prev) => [...prev, ...photos])
            setTotalPhotos(total)
            setPhotosOffset(newOffset)

            setIsLoadingMore(false)
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
                onClick={() => openModal()}
                variant="primary"
            >
                <Typography className="text-white" variant="buttonText">
                    {t('albums.uploadPhotos')}
                </Typography>
            </Button>

            <div
                className="mt-8 grid w-full justify-center gap-6"
                style={{
                    gridTemplateColumns:
                        'repeat(auto-fit, minmax(25rem, max-content))',
                }}
            >
                {/* uploading photos in the grid */}
                {photosToUpload.map((f, idx) => {
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
                {/* existing photos in the grid */}
                {photos
                    .sort(
                        (a, b) => b.createdAt.getTime() - a.createdAt.getTime() // sort by recents first
                    )
                    .map((photo) => {
                        return (
                            <PhotoCard
                                key={photo.id}
                                photo={photo}
                                onDownload={async () => {
                                    await downloadPhoto(photo)
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
            </div>

            {photos.length < totalPhotos && (
                <>
                    {/* TODO: replace with a spinner */}
                    {isLoadingMore ? (
                        <Typography
                            className="text-secondary"
                            variant="bodyLarge"
                        >
                            {t('general.loading')}
                        </Typography>
                    ) : (
                        <button onClick={loadMorePhotos}>
                            <Typography
                                className="text-secondary"
                                variant="buttonText"
                            >
                                {t('albums.seeMore')}
                            </Typography>
                        </button>
                    )}
                </>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <Modal
                        onClose={closeModal}
                        title={t('albums.uploadPhotos')}
                    >
                        {/* upload drag-n-drop */}
                        <DragDropUpload onFilesSelected={handlePhotosUpload} />
                    </Modal>
                )}
            </AnimatePresence>
        </Main>
    )
}

export default AlbumPhotosRoute
