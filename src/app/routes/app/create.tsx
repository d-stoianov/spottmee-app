import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import AlbumForm from '@/features/albums/AlbumForm'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const CreateRoute: React.FC = () => {
    const { createAlbum } = useAlbums()

    const navigate = useNavigate()

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
            <AlbumForm
                onSubmit={async (albumCreateDTO) => {
                    const newAlbum = await createAlbum(albumCreateDTO)
                    navigate(`/${newAlbum.id}/upload`)
                }}
            />
        </Main>
    )
}

export default CreateRoute
