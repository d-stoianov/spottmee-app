const PHOTO_STATUS = ['UPLOADED', 'PROCESSING', 'READY', 'FAILED'] as const

export type PhotoStatus = (typeof PHOTO_STATUS)[number]

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
