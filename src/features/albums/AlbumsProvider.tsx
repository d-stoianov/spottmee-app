import { useAuth } from '@/providers/AuthProvider'
import { AlbumService } from '@/services/AlbumService'
import { Album, AlbumCreateDTO } from '@/services/AlbumService/types'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface AlbumsContextType {
    albums: Album[]
    createAlbum: (albumDto: AlbumCreateDTO) => Promise<void>
}

const AlbumsContext = createContext<AlbumsContextType | undefined>(undefined)

export const AlbumsProvider = ({ children }: { children: React.ReactNode }) => {
    const [albums, setAlbums] = useState<Album[]>([])

    const { token } = useAuth()

    if (!token) {
        throw new Error('No token provided')
    }

    // do not repetively instatiate the same class on every rerrender
    const albumService = useMemo(() => new AlbumService(token), [token])

    useEffect(() => {
        const loadAlbums = async () => {
            const albums = await albumService.getAlbums()
            setAlbums(albums)
        }
        loadAlbums()
    }, [albumService])

    const createAlbum = async (albumDto: AlbumCreateDTO) => {
        const { name, description, coverImage } = albumDto
        const formData = new FormData()

        formData.append('name', name.trim())
        if (description) {
            formData.append('description', description.trim())
        }
        if (coverImage) {
            formData.append('coverImage', coverImage)
        }

        const album = await albumService.createAlbum(formData)

        // update shared local albums state array to not make extra fetch
        setAlbums((prevAlbums) => {
            return [...prevAlbums, album]
        })
    }

    return (
        <AlbumsContext.Provider
            value={{
                albums,
                createAlbum,
            }}
        >
            {children}
        </AlbumsContext.Provider>
    )
}

export const useAlbums = () => {
    const context = useContext(AlbumsContext)

    if (!context)
        throw new Error('useAlbums must be used within AlbumsProvider')

    return context
}
