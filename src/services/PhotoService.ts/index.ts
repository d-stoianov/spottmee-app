import { Photo, PhotoDTO } from '@/services/PhotoService.ts/types'

export class PhotoService {
    private PHOTO_URL: string
    private jwt: string
    private albumId: string

    constructor(jwt: string, albumId: string) {
        this.jwt = jwt
        this.albumId = albumId

        this.PHOTO_URL = `${import.meta.env.VITE_API_URL}/albums/${this.albumId}/photos`
    }

    public async getPhotos(): Promise<Photo[]> {
        const response = await fetch(this.PHOTO_URL, {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
                'Content-Type': 'application/json',
            },
        })

        const photoDTOs: PhotoDTO[] = await response.json()
        const photos = photoDTOs.map((al) => this.photoDTOtoPhoto(al))

        return photos
    }

    // instead of using fetch API, using XHR to track progress
    public uploadPhotos(
        formData: FormData,
        onProgress?: (percent: number) => void
    ): Promise<Photo[]> {
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
                        const photoDTOs: PhotoDTO[] = JSON.parse(
                            xhr.responseText
                        )
                        const photos = photoDTOs.map((al) =>
                            this.photoDTOtoPhoto(al)
                        )
                        resolve(photos)
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

    public async deletePhoto(photoId: string): Promise<void> {
        await fetch(`${this.PHOTO_URL}/${photoId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        })
    }

    private photoDTOtoPhoto(photoDTO: PhotoDTO): Photo {
        return {
            ...photoDTO,
            createdAt: new Date(photoDTO.createdAt),
        }
    }
}
