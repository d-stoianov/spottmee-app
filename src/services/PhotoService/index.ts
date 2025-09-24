import {
    Photo,
    PhotoDTO,
    PhotosResponse,
    PhotosResponseDTO,
} from '@/services/PhotoService/types'

export class PhotoService {
    private readonly PHOTO_URL: string
    private readonly jwt: string
    private readonly albumId: string

    constructor(jwt: string, albumId: string) {
        this.jwt = jwt
        this.albumId = albumId

        this.PHOTO_URL = `${import.meta.env.VITE_API_URL}/albums/${this.albumId}/photos`
    }

    public async getPhotos(
        offset?: number,
        size?: number
    ): Promise<PhotosResponse> {
        const params = new URLSearchParams()

        if (offset !== undefined) params.append('offset', offset.toString())
        if (size !== undefined) params.append('size', size.toString())

        const url = `${this.PHOTO_URL}?${params.toString()}`

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
                'Content-Type': 'application/json',
            },
        })

        const photosResponseDTO: PhotosResponseDTO = await response.json()

        const photos = photosResponseDTO.photos.map((al) =>
            PhotoService.photoDTOtoPhoto(al)
        )

        return {
            photos,
            total: photosResponseDTO.total,
        }
    }

    // instead of using fetch API, using XHR to track progress
    public uploadPhotos(
        formData: FormData,
        onProgress?: (percent: number) => void
    ): Promise<PhotosResponse> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable && onProgress) {
                    const percentCompleted = Math.round(
                        (event.loaded * 100) / event.total
                    )
                    onProgress(percentCompleted)
                }
            }

            xhr.onload = async () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const photosResponseDTO: PhotosResponseDTO = JSON.parse(
                            xhr.responseText
                        )

                        const photos = photosResponseDTO.photos.map((al) =>
                            PhotoService.photoDTOtoPhoto(al)
                        )

                        resolve({
                            photos: photos,
                            total: photosResponseDTO.total,
                        })
                    } catch (err) {
                        reject(err)
                    }
                } else {
                    reject(xhr.statusText)
                }
            }

            xhr.onerror = () => reject(xhr.statusText)

            xhr.open('POST', this.PHOTO_URL)
            xhr.setRequestHeader('Authorization', `Bearer ${this.jwt}`)
            xhr.send(formData)
        })
    }

    public async getPhotoById(photoId: string): Promise<void> {
        await fetch(`${this.PHOTO_URL}/${photoId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        })
    }

    public async deletePhoto(photoId: string): Promise<void> {
        await fetch(`${this.PHOTO_URL}/${photoId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        })
    }

    public static photoDTOtoPhoto(photoDTO: PhotoDTO): Photo {
        return {
            ...photoDTO,
            createdAt: new Date(photoDTO.createdAt),
        }
    }
}
