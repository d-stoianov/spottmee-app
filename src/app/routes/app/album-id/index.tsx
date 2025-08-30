import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import AlbumForm from '@/features/albums/AlbumForm'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

const AlbumRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const { getAlbumById, updateAlbum, deleteAlbum } = useAlbums()

    const { albumId } = useParams()

    const navigate = useNavigate()

    const album = albumId ? getAlbumById(albumId) : undefined

    if (!album) {
        return
    }

    return (
        <Main className="flex w-full flex-col items-center lg:px-[8rem] lg:py-[3rem]">
            <Typography
                className="mb-[3rem] text-white text-center"
                variant={isMobile ? 'heading2' : 'heading1'}
            >
                {t('albums.manageYourAlbum', { albumName: album.name })}
            </Typography>

            <AlbumForm
                onSubmit={async (albumCreateDTO) => {
                    await updateAlbum(album.id, albumCreateDTO)
                }}
                onDelete={async () => {
                    await deleteAlbum(album.id)
                    navigate('/')
                }}
                album={album}
            />
        </Main>
    )
}

export default AlbumRoute
