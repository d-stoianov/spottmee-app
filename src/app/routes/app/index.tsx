import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import AlbumCard from '@/features/albums/AlbumCard'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'

const HomeRoute: React.FC = () => {
    const { albums } = useAlbums()

    const { t } = useTranslation()
    const isMobile = useIsMobile()

    return (
        <Main className="flex w-full flex-col items-center md:items-start md:px-[8rem] md:py-[3rem]">
            <Typography
                className="mb-[2rem]"
                variant={isMobile ? 'heading2' : 'heading1'}
            >
                {t('albums.yourAlbums')}
            </Typography>

            {/* album cards grid */}
            <div className="flex w-full flex-wrap justify-center md:justify-between gap-y-10 gap-x-4">
                {albums.map((al) => (
                    <AlbumCard {...al} />
                ))}
            </div>
        </Main>
    )
}

export default HomeRoute
