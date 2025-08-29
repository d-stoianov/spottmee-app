import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import AlbumCreateForm from '@/features/albums/AlbumCreateForm'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'

const CreateRoute: React.FC = () => {
    const { createAlbum } = useAlbums()

    const { t } = useTranslation()
    const isMobile = useIsMobile()

    return (
        <Main className="flex w-full flex-col items-center lg:px-[8rem] lg:py-[3rem]">
            <Typography
                className="mb-[0.75rem]"
                variant={isMobile ? 'heading2' : 'heading1'}
            >
                {t('albums.createNewAlbum')}
            </Typography>

            {!isMobile && (
                <Typography
                    className="mb-[4rem] text-secondary"
                    variant={isMobile ? 'heading3' : 'heading3'}
                >
                    {t('albums.createAlbumSubtext')}
                </Typography>
            )}

            {/* creation form */}
            <AlbumCreateForm onAlbumCreate={createAlbum} />
        </Main>
    )
}

export default CreateRoute
