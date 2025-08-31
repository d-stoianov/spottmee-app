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
    const [photosToUpload, setPhotosToUpload] = useState<File[]>([])

    const [photosOffset, setPhotosOffset] = useState<number>(0)

    const { getAlbumById } = useAlbums()

    const {
        getPhotos,
        uploadProgress,
        uploadPhotosInBatches,
        downloadPhoto,
        deletePhoto,
    } = usePhotos(albumId || '')

    const album = albumId ? getAlbumById(albumId) : undefined

    const handlePhotosUpload = async (files: File[]) => {
        setPhotosToUpload(files)
        closeModal()
        await uploadPhotosInBatches(files, PHOTOS_UPLOAD_BATCH_SIZE)
        if (album) {
            const photos = await getPhotos(0, PHOTOS_GRID_SIZE)
            setPhotos(photos)
            setPhotosToUpload([])
            setPhotosOffset(0)
        }
    }

    const loadMorePhotos = async () => {
        const newOffset = photosOffset + PHOTOS_GRID_SIZE
        if (album) {
            const photos = await getPhotos(newOffset, PHOTOS_GRID_SIZE)
            setPhotos((prev) => [...prev, ...photos])
            setPhotosOffset(newOffset)
        }
    }

    useEffect(() => {
        const getAlbumPhotos = async () => {
            if (album) {
                const photos = await getPhotos(0, PHOTOS_GRID_SIZE)
                setPhotos(photos)
            }
        }
        getAlbumPhotos()
    }, [album])

    if (!album) {
        return
    }

    return (
        <Main className="flex w-full flex-col items-center lg:px-[8rem] lg:py-[3rem]">
            <Typography
                className="mb-[0.75rem] text-center text-white"
                variant={isMobile ? 'heading2' : 'heading1'}
            >
                {t('albums.uploadFirstPhotos')}
            </Typography>

            {!isMobile && (
                <Typography
                    className="mb-[4rem] text-secondary"
                    variant={isMobile ? 'heading3' : 'heading3'}
                >
                    {t('albums.uploadFirstPhotosSubtext', {
                        albumName: album.name,
                    })}
                </Typography>
            )}

            <Button onClick={() => openModal()} variant="primary">
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
                                }}
                            />
                        )
                    })}
            </div>

            {photos.length > 0 && (
                <button onClick={loadMorePhotos}>
                    <Typography className="text-secondary" variant="buttonText">
                        {t('albums.seeMore')}
                    </Typography>
                </button>
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
