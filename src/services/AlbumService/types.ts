export type AlbumDTO = {
    id: string
    name: string
    createdAt: string // timestamp string from the API
    description?: string
    coverImageUrl?: string
    matchesCount: number
    totalPhotosCount?: number
    size?: number // size of the album (in bytes)
}

// album with parsed JS Date object
export type Album = Omit<AlbumDTO, 'createdAt'> & {
    createdAt: Date
}

export type AlbumCreateDTO = Omit<
    AlbumDTO,
    'id' | 'createdAt' | 'coverImageUrl' | 'matchesCount' | 'totalPhotosCount'
> & {
    coverImage?: File
}
