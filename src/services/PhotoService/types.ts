export type PhotoStatus =
    | 'UPLOADED'
    | 'PROCESSING'
    | 'NO_FACES_FOUND'
    | 'FAILED'
    | 'READY'

export type PhotoDTO = {
    id: string
    originalName: string
    url: string
    size: number
    createdAt: string // timestamp string from the API
    status: PhotoStatus
}

// photo with parsed JS Date object
export type Photo = Omit<PhotoDTO, 'createdAt'> & {
    createdAt: Date
}

export type PhotosResponseDTO = {
    photos: PhotoDTO[]
    total: number
}

export type PhotosResponse = Omit<PhotosResponseDTO, 'photos'> & {
    photos: Photo[]
}
