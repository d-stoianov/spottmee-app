export type AlbumDTO = {
    id: string
    name: string
    createdAt: string // timestamp string from the API
    description?: string
    coverImageUrl?: string
}

// album with parsed JS Date object
export type Album = Omit<AlbumDTO, 'createdAt'> & {
    createdAt: Date
}

export type AlbumCreateDTO = Omit<
    AlbumDTO,
    'id' | 'createdAt' | 'coverImageUrl'
> & {
    coverImage?: File
}
