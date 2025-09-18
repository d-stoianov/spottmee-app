import Main from '@/components/layout/Main'
import { usePublicAlbumProvider } from '@/features/match/PublicAlbumProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'
import { Typography } from '@/components/ui/Typography.tsx'
import Button from '@/components/ui/Button.tsx'

const SpotSelfieRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const { album } = usePublicAlbumProvider()

    if (!album) return

    return (
        <Main className="w-full gap-[4rem] lg:flex-row lg:px-[8rem] lg:py-[3rem]">
            <div
                className={
                    'mt-[4rem] flex w-full flex-col items-center gap-[6rem] lg:mt-[8rem] lg:flex-row lg:items-start lg:justify-center'
                }
            >
                <div
                    className={
                        'flex h-[22rem] w-[18rem] flex-col bg-black lg:h-[36rem] lg:w-[32rem]'
                    }
                ></div>

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
                        <Button className={'w-full'} variant={'primary'}>
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
