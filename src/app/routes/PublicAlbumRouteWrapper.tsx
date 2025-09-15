import {
    PublicAlbumProvider,
    usePublicAlbumProvider,
} from '@/features/match/PublicAlbumProvider'
import { useParams, Outlet, Navigate } from 'react-router-dom'
import LoadingPage from '@/app/loading'

const PublicAlbumContent: React.FC = () => {
    const { album } = usePublicAlbumProvider()

    if (album === undefined) {
        return <LoadingPage />
    }

    if (album === null) {
        return <Navigate to="/spot/not-found" replace />
    }

    return <Outlet />
}

const PublicAlbumRouteWrapper: React.FC = () => {
    const { albumId } = useParams<{ albumId: string }>()

    if (!albumId) return <Navigate to="/spot/not-found" replace />

    return (
        <PublicAlbumProvider albumId={albumId}>
            <PublicAlbumContent />
        </PublicAlbumProvider>
    )
}

export default PublicAlbumRouteWrapper
