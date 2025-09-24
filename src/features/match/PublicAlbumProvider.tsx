import { MatchService } from '@/services/MatchService'
import { MatchAlbumDTO, MatchResult } from '@/services/MatchService/types'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface PublicAlbumContextType {
    album: MatchAlbumDTO | null | undefined // MatchAlbum - album has found, null - no album found, undefined - value is unset
    startMatching: (selfie: File) => Promise<string> // return match id to be redirected to
    getMatchResult: (matchId: string) => Promise<MatchResult>
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

    const matchService = useMemo(() => new MatchService(albumId), [albumId])

    useEffect(() => {
        const loadAlbum = async () => {
            try {
                const album = await matchService.getAlbum()
                setAlbum(album)
            } catch (error) {
                setAlbum(null)
                console.error(error)
            }
        }
        loadAlbum()
    }, [albumId, matchService])

    const startMatching = async (selfie: File) => {
        const formData = new FormData()
        formData.append('selfie', selfie)

        return await matchService.startMatching(formData)
    }

    const getMatchResult = async (matchId: string) => {
        return await matchService.getMatchResult(matchId)
    }

    return (
        <PublicAlbumContext.Provider
            value={{
                album,
                startMatching,
                getMatchResult,
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
