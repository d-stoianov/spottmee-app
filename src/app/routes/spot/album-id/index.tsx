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
import GlowingParticleDesktop from '@/assets/glowing-particle-desktop.svg'
import GlowingParticleMobile from '@/assets/glowing-particle-mobile.svg'
import AlbumCard from '@/features/albums/AlbumCard.tsx'
import { InfoIcon } from 'lucide-react'

const SpotAlbumRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    const { isModalOpen, closeModal, openModal } = useModal()

    const { album, startMatching } = usePublicAlbumProvider()

    const handleSelfieSelect = async (files: File[]) => {
        if (!album || !files.length || !files[0]) {
            return
        }

        closeModal()

        const matchId = await startMatching(files[0])
        navigate(`/spot/${album.id}/${matchId}`)
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
                    'flex w-full flex-col items-center justify-center gap-[5rem] lg:flex-row lg:items-start lg:gap-[12rem]'
                }
            >
                <div className="relative overflow-visible">
                    <AlbumCard
                        className="relative z-[15] h-[18rem] w-[18rem] lg:h-[24rem] lg:w-[24rem]"
                        album={album}
                        showDetails={false}
                    />
                    {isMobile ? (
                        <img
                            className="absolute -left-[4rem] top-[7.5rem] z-[10] max-h-none max-w-none scale-[0.9]"
                            src={GlowingParticleMobile}
                            alt="Glowing particle"
                        />
                    ) : (
                        <img
                            className="absolute -left-[8rem] top-[4rem] z-[10] max-h-none max-w-none scale-[0.9]"
                            src={GlowingParticleDesktop}
                            alt="Glowing particle"
                        />
                    )}

                    {!isMobile && <Tooltip />}
                </div>

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

                {isMobile && <Tooltip />}
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

const Tooltip: React.FC = () => {
    const { t } = useTranslation()

    return (
        <div className={'mt-[0rem] flex items-center gap-2 lg:mt-[3rem]'}>
            <InfoIcon className={'text-secondary'} size={'1.25rem'} />
            <Typography className={'text-secondary'} variant={'bodyDefault'}>
                {t('spot.weOnlyUseThisToFindYourPhotos')}
            </Typography>
        </div>
    )
}

export default SpotAlbumRoute
