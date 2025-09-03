import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import AlbumCard from '@/features/albums/AlbumCard'
import AlbumShareLink from '@/features/albums/AlbumShareLink'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

const AlbumShareRoute: React.FC = () => {
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
                className="mb-[3rem] text-center text-white"
                variant={isMobile ? 'heading3' : 'heading1'}
            >
                {t('albums.yourAlbumIsReady')}
            </Typography>

            <AlbumCard showDetails={false} album={album} />

            <div className="mt-[2rem] flex w-full flex-col items-center gap-4 lg:w-[34rem]">
                <AlbumShareLink albumId={album.id} />
                <Link to={'/'}>
                    <Typography
                        className="text-secondary underline"
                        variant="bodyDefault"
                    >
                        {t('general.backToHome')}
                    </Typography>
                </Link>
            </div>
        </Main>
    )
}

export default AlbumShareRoute
