import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'

const CreateRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    return (
        <Main className="flex w-full flex-col items-center md:px-[8rem] md:py-[3rem]">
            <Typography
                className="mb-[0.75rem]"
                variant={isMobile ? 'heading2' : 'heading1'}
            >
                {t('albums.createNewAlbum')}
            </Typography>
            <Typography
                className="mb-[4rem] text-secondary"
                variant={isMobile ? 'heading3' : 'heading3'}
            >
                {t('albums.createAlbumSubtext')}
            </Typography>

            {/* creation form */}

            <div></div>
        </Main>
    )
}

export default CreateRoute
