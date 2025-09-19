import { useAuth } from '@/providers/AuthProvider'
import { AlbumService } from '@/services/AlbumService'
import { Album, AlbumCreateDTO } from '@/services/AlbumService/types'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface AlbumsContextType {
    albums: Album[]
    createAlbum: (albumDto: AlbumCreateDTO) => Promise<Album>
    getAlbumById: (albumId: string) => Album | undefined
    updateAlbum: (
        albumId: string,
        albumCreateDTO: AlbumCreateDTO
    ) => Promise<Album | undefined>
    deleteAlbum: (albumId: string) => Promise<void>
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

    const createAlbum = async (albumDto: AlbumCreateDTO): Promise<Album> => {
        const { name, description, coverImage } = albumDto
        const formData = new FormData()

        formData.append('name', name)
        if (description !== undefined) {
            formData.append('description', description)
        }
        if (coverImage !== undefined) {
            formData.append('coverImage', coverImage)
        }

        const album = await albumService.createAlbum(formData)

        // update shared local albums state array to not make extra fetch
        setAlbums((prevAlbums) => {
            return [...prevAlbums, album]
        })

        return album
    }

    const updateAlbum = async (
        albumId: string,
        albumDto: AlbumCreateDTO
    ): Promise<Album | undefined> => {
        const { name, description, coverImage } = albumDto
        const formData = new FormData()

        // check if prev album values are not the same as new ones
        // to avoid extra requests
        const prevAlbum = getAlbumById(albumId)

        if (prevAlbum?.name !== name) {
            formData.append('name', name)
        }

        if (
            description !== undefined &&
            prevAlbum?.description !== description
        ) {
            formData.append('description', description)
        }
        if (coverImage !== undefined) {
            formData.append('coverImage', coverImage)
        }

        // don't make empty fetch
        if ([...formData.keys()].length === 0) return

        const album = await albumService.updateAlbum(albumId, formData)

        // update shared local albums state array to not make extra fetch
        setAlbums((prevAlbums) => {
            // replace prev album with new one
            return prevAlbums.map((al) => (al.id === album.id ? album : al))
        })

        return album
    }

    const deleteAlbum = async (albumId: string) => {
        await albumService.deleteAlbum(albumId)

        // update shared local albums state array to not make extra fetch
        setAlbums((prevAlbums) => {
            // remove element

            return prevAlbums.filter((al) => al.id !== albumId)
        })
    }

    const getAlbumById = (albumId: string): Album | undefined => {
        return albums.find((al) => al.id === albumId)
    }

    return (
        <AlbumsContext.Provider
            value={{
                albums,
                createAlbum,
                getAlbumById,
                updateAlbum,
                deleteAlbum,
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
