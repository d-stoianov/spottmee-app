import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import { usePublicAlbumProvider } from '@/features/match/PublicAlbumProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'
import AlbumInfo from '@/features/match/AlbumInfo.tsx'
import Button from '@/components/ui/Button.tsx'
import { AnimatePresence } from 'motion/react'
import Modal from '@/components/ui/Modal.tsx'
import DragDropUpload from '@/components/DragDropUpload.tsx'
import useModal from '@/hooks/useModal.tsx'
import { useNavigate } from 'react-router-dom'

const SpotAlbumRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    const { isModalOpen, closeModal, openModal } = useModal()

    const { album } = usePublicAlbumProvider()

    const handleSelfieSelect = (files: File[]) => {
        console.log('handleSelfieSelect', files)
        closeModal()
    }

    if (!album) return

    return (
        <Main className="flex w-full flex-col lg:px-[8rem] lg:py-[3rem]">
            <Typography
                className="mb-[3rem] text-start text-white"
                variant={isMobile ? 'heading3' : 'heading1'}
                dangerouslySetInnerHTML={{ __html: t('spot.albumTitle') }}
            />

            <div
                className={
                    'flex w-full flex-col items-center justify-center gap-[8rem] lg:flex-row'
                }
            >
                {/* cards mosaic */}
                <div className={'w-[25rem]'}></div>

                {/*album info */}
                <div className={'flex flex-col gap-[2.5rem]'}>
                    <AlbumInfo {...album} />
                    <Button
                        className={'w-full border-primaryLight'}
                        variant={'transparent'}
                        onClick={() => navigate(`/spot/${album.id}/selfie`)}
                    >
                        <Typography
                            className={'text-white'}
                            variant={'buttonText'}
                        >
                            {t('spot.useYourCamera')}
                        </Typography>
                    </Button>{' '}
                    <Button
                        className={'w-full'}
                        variant={'primary'}
                        onClick={openModal}
                    >
                        <Typography
                            className={'text-white'}
                            variant={'buttonText'}
                        >
                            {t('spot.uploadSelfie')}
                        </Typography>
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <Modal onClose={closeModal} title={t('spot.uploadSelfie')}>
                        <DragDropUpload onFilesSelected={handleSelfieSelect} />
                    </Modal>
                )}
            </AnimatePresence>
        </Main>
    )
}

export default SpotAlbumRoute
