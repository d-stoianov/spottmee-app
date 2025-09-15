import { MatchService } from '@/services/MatchService'
import { MatchAlbumDTO } from '@/services/MatchService/types'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface PublicAlbumContextType {
    album: MatchAlbumDTO | null | undefined // MatchAlbum - album has found, null - no album found, undefined - value is unset
}

const PublicAlbumContext = createContext<PublicAlbumContextType | undefined>(
    undefined
)

export const PublicAlbumProvider = ({
    albumId,
    children,
}: {
    albumId: string
    children: React.ReactNode
}) => {
    const [album, setAlbum] = useState<MatchAlbumDTO | null | undefined>(
        undefined
    )

    const matchService = useMemo(() => new MatchService(), [])

    useEffect(() => {
        const loadAlbum = async () => {
            try {
                const album = await matchService.getAlbum(albumId)
                setAlbum(album)
            } catch (error) {
                setAlbum(null)
            }
        }
        loadAlbum()
    }, [albumId, matchService])

    return (
        <PublicAlbumContext.Provider
            value={{
                album,
            }}
        >
            {children}
        </PublicAlbumContext.Provider>
    )
}

export const usePublicAlbumProvider = () => {
    const context = useContext(PublicAlbumContext)

    if (!context)
        throw new Error(
            'usePublicAlbumProvider must be used within PublicAlbumProvider'
        )

    return context
}
