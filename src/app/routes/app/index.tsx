import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import { useAlbums } from '@/features/albums/AlbumsProvider'

const HomeRoute: React.FC = () => {
    const { albums } = useAlbums()

    return (
        <Main>
            <Typography variant="heading2">Your albums</Typography>

            <div>{albums.map((al) => al.name)}</div>
        </Main>
    )
}

export default HomeRoute
