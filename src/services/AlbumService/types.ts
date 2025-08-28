export type AlbumDTO = {
    id: string
    name: string
    createdAt: string // timestamp string from the API
    description?: string
}

// album with parsed JS Date object
export type Album = Omit<AlbumDTO, 'createdAt'> & {
    createdAt: Date
}
