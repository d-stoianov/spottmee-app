import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const AlbumPhotosRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const { getAlbumById } = useAlbums()

    const { albumId } = useParams()

    const album = albumId ? getAlbumById(albumId) : undefined

    if (!album) {
        return
    }

    return (
        <Main className="flex w-full flex-col items-center lg:px-[8rem] lg:py-[3rem]">
            <Typography
                className="mb-[0.75rem] text-white text-center"
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

            {/* upload drag-n-drop */}
        </Main>
    )
}

export default AlbumPhotosRoute
