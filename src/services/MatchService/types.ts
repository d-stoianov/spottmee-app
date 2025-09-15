export type MatchAlbumDTO = {
    id: string
    name: string
    description?: string
    creator: string
    totalPhotosCount: number
    coverImageUrl?: string
    previewPhotos?: string[]
}
