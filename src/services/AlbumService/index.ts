import { Album, AlbumDTO } from '@/services/AlbumService/types'
import { downloadFileFromURL } from '@/utils/file.ts'

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

    public async createAlbum(formData: FormData): Promise<Album> {
        const response = await fetch(this.ALBUM_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: formData,
        })

        const albumDTO: AlbumDTO = await response.json()
        return this.albumDTOtoAlbum(albumDTO)
    }

    public async updateAlbum(
        albumId: string,
        formData: FormData
    ): Promise<Album> {
        const response = await fetch(`${this.ALBUM_URL}/${albumId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
            body: formData,
        })

        const albumDTO: AlbumDTO = await response.json()
        return this.albumDTOtoAlbum(albumDTO)
    }

    public async deleteAlbum(albumId: string): Promise<void> {
        await fetch(`${this.ALBUM_URL}/${albumId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        })
    }

    public async downloadAlbumPhotos(album: Album): Promise<void> {
        await downloadFileFromURL(
            `${this.ALBUM_URL}/${album.id}/photos/download`,
            `spottmee-album-${album.name}`,
            {
                Authorization: `Bearer ${this.jwt}`,
            }
        )
    }

    private albumDTOtoAlbum(albumDTO: AlbumDTO): Album {
        return {
            ...albumDTO,
            createdAt: new Date(albumDTO.createdAt),
        }
    }
}
