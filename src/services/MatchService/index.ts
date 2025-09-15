import { MatchAlbumDTO } from '@/services/MatchService/types'

export class MatchService {
    private MATCH_ALBUMS_URL = `${import.meta.env.VITE_API_URL}/match-albums`

    public async getAlbum(id: string): Promise<MatchAlbumDTO> {
        const response = await fetch(`${this.MATCH_ALBUMS_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status === 404) {
            throw new Error("Album not found")
        }

        const albumDTO: MatchAlbumDTO = await response.json()

        return albumDTO
    }
}
