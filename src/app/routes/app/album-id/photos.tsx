import DragDropUpload from '@/components/DragDropUpload'
import Main from '@/components/layout/Main'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { Typography } from '@/components/ui/Typography'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import useIsMobile from '@/hooks/useIsMobile'
import useModal from '@/hooks/useModal'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const AlbumPhotosRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const { isModalOpen, closeModal, openModal } = useModal()

    const [filesToUpload, setFilesToUpload] = useState<File[]>([])

    const { getAlbumById } = useAlbums()

    const { albumId } = useParams()

    const album = albumId ? getAlbumById(albumId) : undefined

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

            <AnimatePresence>
                {isModalOpen && (
                    <Modal
                        onClose={closeModal}
                        title={t('albums.uploadPhotos')}
                    >
                        {/* upload drag-n-drop */}
                        <DragDropUpload
                            onFilesSelected={(files) => {
                                setFilesToUpload(files)
                                closeModal()
                            }}
                        />
                    </Modal>
                )}
            </AnimatePresence>
        </Main>
    )
}

export default AlbumPhotosRoute
