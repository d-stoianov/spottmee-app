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

const PHOTOS_BATCH_SIZE = 10

const AlbumPhotosRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const { albumId } = useParams()

    const { isModalOpen, closeModal, openModal } = useModal()

    const [photos, setPhotos] = useState<Photo[]>([]) // photos from API
    const [photosToUpload, setPhotosToUpload] = useState<File[]>([])

    const { getAlbumById } = useAlbums()

    const { getPhotos, uploadProgress, uploadPhotosInBatches } = usePhotos(
        albumId || ''
    )

    const album = albumId ? getAlbumById(albumId) : undefined

    useEffect(() => {
        const getAlbumPhotos = async () => {
            if (album) {
                const photos = await getPhotos()
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
                    const batchIndex = Math.floor(idx / PHOTOS_BATCH_SIZE)

                    return (
                        <PhotoCard
                            key={idx} // make sure to have a unique key
                            photo={f}
                            uploadProgress={uploadProgress[batchIndex]}
                            onDownload={async () => {}}
                            onDelete={async () => {}}
                        />
                    )
                })}
                {/* existing photos in the grid */}
                {photos.map((photo) => {
                    return (
                        <PhotoCard
                            key={photo.id}
                            photo={photo}
                            onDownload={async () => {}}
                            onDelete={async () => {}}
                        />
                    )
                })}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <Modal
                        onClose={closeModal}
                        title={t('albums.uploadPhotos')}
                    >
                        {/* upload drag-n-drop */}
                        <DragDropUpload
                            onFilesSelected={async (files) => {
                                setPhotosToUpload(files)
                                closeModal()
                                await uploadPhotosInBatches(
                                    files,
                                    PHOTOS_BATCH_SIZE
                                )
                            }}
                        />
                    </Modal>
                )}
            </AnimatePresence>
        </Main>
    )
}

export default AlbumPhotosRoute
