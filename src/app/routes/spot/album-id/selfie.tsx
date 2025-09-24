import Main from '@/components/layout/Main.tsx'
import { usePublicAlbumProvider } from '@/features/match/PublicAlbumProvider.tsx'
import useIsMobile from '@/hooks/useIsMobile.tsx'
import { useTranslation } from 'react-i18next'
import { Typography } from '@/components/ui/Typography.tsx'
import Button from '@/components/ui/Button.tsx'
import CameraCapture from '@/features/match/CameraCapture.tsx'
import { useState } from 'react'
import { dataURLtoFile } from '@/utils/file.ts'
import { useNavigate } from 'react-router-dom'

const SpotSelfieRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    const [resetTrigger, setResetTrigger] = useState<boolean>(false)
    const [selfieData, setSelfieData] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { album, startMatching } = usePublicAlbumProvider()

    if (!album) return

    const onSelfieCapture = (imageData: string) => {
        setSelfieData(imageData)
        setResetTrigger(false)
    }

    const resetCamera = () => {
        setSelfieData(null)
        setResetTrigger(true)
    }

    const onSelfieSubmit = async () => {
        if (!selfieData) return
        try {
            setIsSubmitting(true)
            const matchId = await startMatching(
                dataURLtoFile(selfieData, 'selfie.png')
            )
            navigate(`/spot/${album.id}/${matchId}`)
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Main className="w-full gap-[4rem] lg:flex-row lg:px-[8rem] lg:py-[3rem]">
            <div
                className={
                    'mt-[2rem] flex w-full flex-col items-center gap-[6rem] lg:mt-[8rem] lg:flex-row lg:items-start lg:justify-center'
                }
            >
                <div
                    className={
                        'flex w-full flex-col rounded-[1.25rem] border-[0.125rem] border-[#C1FAF5] p-8 lg:w-[32rem]'
                    }
                >
                    <CameraCapture
                        onCapture={onSelfieCapture}
                        resetTrigger={resetTrigger}
                    />
                </div>

                <div className={'flex flex-col gap-[3rem]'}>
                    <Typography
                        className="text-center text-white"
                        variant={isMobile ? 'heading3' : 'heading1'}
                    >
                        {t('spot.preview')}
                    </Typography>
                    {/* buttons */}
                    <div
                        className={
                            'flex w-full flex-col gap-[1.25rem] lg:w-[24rem]'
                        }
                    >
                        <Button
                            className={'w-full'}
                            variant={'primary'}
                            onClick={onSelfieSubmit}
                            disabled={selfieData === null || isSubmitting}
                        >
                            <Typography
                                className={'text-white'}
                                variant={'buttonText'}
                            >
                                {t('spot.startMatching')}
                            </Typography>
                        </Button>
                        <Button
                            className={'w-full border-primaryLight'}
                            variant={'transparent'}
                            onClick={resetCamera}
                            disabled={selfieData === null || isSubmitting}
                        >
                            <Typography
                                className={'text-white'}
                                variant={'buttonText'}
                            >
                                {t('spot.retry')}
                            </Typography>
                        </Button>
                    </div>
                    {/* bullet points */}
                    <ul className="flex list-disc flex-col gap-2 pl-5">
                        <li className={'marker:text-secondary'}>
                            <Typography
                                variant="bodyDefault"
                                className="text-secondary"
                            >
                                {t('spot.selfieBulletPointOne')}
                            </Typography>
                        </li>
                        <li className={'marker:text-secondary'}>
                            <Typography
                                variant="bodyDefault"
                                className="text-secondary"
                            >
                                {t('spot.selfieBulletPointTwo')}
                            </Typography>
                        </li>
                        <li className={'marker:text-secondary'}>
                            <Typography
                                variant="bodyDefault"
                                className="text-secondary"
                            >
                                {t('spot.selfieBulletPointThree')}{' '}
                            </Typography>
                        </li>
                    </ul>
                </div>
            </div>
        </Main>
    )
}

export default SpotSelfieRoute
