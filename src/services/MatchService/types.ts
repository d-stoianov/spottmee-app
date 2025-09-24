import { Photo, PhotoDTO } from '@/services/PhotoService/types.ts'

export type MatchAlbumDTO = {
    id: string
    name: string
    description?: string
    creator: string
    totalPhotosCount: number
    coverImageUrl?: string
    previewPhotos?: string[]
}

type MatchResultStatus = 'PROCESSING' | 'READY'

export type MatchResultDTO = {
    id: string
    status: MatchResultStatus
    matches: PhotoDTO[]
}

export type MatchResult = Omit<MatchResultDTO, 'matches'> & {
    matches: Photo[]
}
