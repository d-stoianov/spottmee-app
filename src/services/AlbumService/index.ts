import { Album, AlbumDTO } from '@/services/AlbumService/types'

export class AlbumService {
    private ALBUM_URL = `${import.meta.env.VITE_API_URL}/albums`
    private jwt: string

    constructor(jwt: string) {
        this.jwt = jwt
    }

    public async getAlbums(): Promise<Album[]> {
        const response = await fetch(this.ALBUM_URL, {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
                'Content-Type': 'application/json',
            },
        })

        const albumDTOs: AlbumDTO[] = await response.json()
        const albums = albumDTOs.map((al) => this.albumDTOtoAlbum(al))

        return albums
    }

    private albumDTOtoAlbum(albumDTO: AlbumDTO): Album {
        return {
            ...albumDTO,
            createdAt: new Date(albumDTO.createdAt),
        }
    }
}
