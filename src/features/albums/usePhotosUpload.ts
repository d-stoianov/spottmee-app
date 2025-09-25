import { useAuth } from '@/providers/AuthProvider'
import { PhotoService } from '@/services/PhotoService'
import { PhotosResponse } from '@/services/PhotoService/types'
import { useMemo, useState } from 'react'

type UploadProgress = { [batchIndex: number]: number } // progress is 0 - 100

const usePhotos = (albumId: string) => {
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})
    const [isUploading, setIsUploading] = useState(false)

    const { token } = useAuth()

    if (!token) {
        throw new Error('No token')
    }

    const photoService = useMemo(
        () => new PhotoService(token, albumId),
        [token, albumId]
    )

    // batch size splits photos into groups of uploads making upload faster
    // if batch is 10 - then 10 photos in a batch share the same progress
    const uploadPhotosInBatches = async (
        files: File[],
        batchSize = 10
    ): Promise<PhotosResponse> => {
        setIsUploading(true)

        const batches = chunkArray(files, batchSize)

        const photosResponse: PhotosResponse = {
            photos: [],
            total: 0,
            readyCount: 0,
        }

        try {
            for (let i = 0; i < batches.length; i++) {
                const batch = batches[i]
                const formData = new FormData()

                batch.forEach((file) => formData.append('photos', file))

                const { photos, readyCount, total } =
                    await photoService.uploadPhotos(formData, (percent) => {
                        // update progress for this batch
                        setUploadProgress((prev) => ({ ...prev, [i]: percent }))
                    })

                photosResponse.photos.push(...photos)
                photosResponse.total += total
                photosResponse.readyCount += readyCount
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsUploading(false)
        }

        return photosResponse
    }

    const getPhotos = async (
        offset?: number,
        size?: number
    ): Promise<PhotosResponse> => {
        return await photoService.getPhotos(offset, size)
    }

    const deletePhoto = async (photoId: string) => {
        await photoService.deletePhoto(photoId)
    }

    return {
        getPhotos,
        uploadPhotosInBatches,
        uploadProgress,
        deletePhoto,
        isUploading,
    }
}

// helper function to create batches
const chunkArray = (arr: File[], size: number): File[][] => {
    const chunks: File[][] = []
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size))
    }
    return chunks
}

export default usePhotos
