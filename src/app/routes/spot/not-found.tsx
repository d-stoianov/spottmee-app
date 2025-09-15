import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'

const SpotNotFoundRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    return (
        <Main className="flex w-full flex-col items-center md:items-start md:px-[8rem] md:py-[3rem]">
            <Typography
                className="mb-[2rem] text-white"
                variant={isMobile ? 'heading3' : 'heading1'}
            >
                {t('spot.noAlbumFound')}
            </Typography>
        </Main>
    )
}

export default SpotNotFoundRoute
