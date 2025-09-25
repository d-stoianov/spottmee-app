import {
    MatchAlbumDTO,
    MatchResult,
    MatchResultDTO,
} from '@/services/MatchService/types'
import { PhotoService } from '@/services/PhotoService'

export class MatchService {
    private readonly MATCH_ALBUMS_URL = `${import.meta.env.VITE_API_URL}/match-albums`
    private readonly albumId: string

    constructor(albumId: string) {
        this.albumId = albumId
    }

    public async getAlbum(): Promise<MatchAlbumDTO> {
        const response = await fetch(
            `${this.MATCH_ALBUMS_URL}/${this.albumId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        if (response.status === 404) {
            throw new Error('Album not found')
        }

        return await response.json()
    }

    public async startMatching(formData: FormData): Promise<string> {
        const response = await fetch(
            `${this.MATCH_ALBUMS_URL}/${this.albumId}`,
            {
                method: 'POST',
                body: formData,
            }
        )

        if (response.status === 404) {
            throw new Error('Album not found')
        }

        return await response.text()
    }

    public async getMatchResult(
        matchId: string,
        offset?: number,
        size?: number
    ): Promise<MatchResult> {
        const params = new URLSearchParams()

        if (offset !== undefined) params.append('offset', offset.toString())
        if (size !== undefined) params.append('size', size.toString())

        const url = `${this.MATCH_ALBUMS_URL}/${this.albumId}/${matchId}?${params.toString()}`

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status === 404) {
            throw new Error('Album not found')
        }

        const matchResult: MatchResultDTO = await response.json()

        return {
            id: matchResult.id,
            status: matchResult.status,
            matches: matchResult.matches.map((p) =>
                PhotoService.photoDTOtoPhoto(p)
            ),
            total: matchResult.total,
        }
    }
}
