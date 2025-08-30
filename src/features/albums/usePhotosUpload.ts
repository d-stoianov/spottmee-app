import { useAuth } from '@/providers/AuthProvider'
import { PhotoService } from '@/services/PhotoService'
import { Photo } from '@/services/PhotoService/types'
import { useMemo, useState } from 'react'

type UploadProgress = { [batchIndex: number]: number } // progress is 0 - 100

const usePhotos = (albumId: string) => {
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

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
    const uploadPhotosInBatches = async (files: File[], batchSize = 10) => {
        setIsUploading(true)
        setError(null)

        const batches = chunkArray(files, batchSize)

        const allPhotos: Photo[] = []

        try {
            for (let i = 0; i < batches.length; i++) {
                const batch = batches[i]
                const formData = new FormData()

                batch.forEach((file) => formData.append('photos', file))

                const photos = await photoService.uploadPhotos(
                    formData,
                    (percent) => {
                        // update progress for this batch
                        setUploadProgress((prev) => ({ ...prev, [i]: percent }))
                    }
                )

                allPhotos.push(...photos)
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsUploading(false)
        }

        return allPhotos
    }

    const getPhotos = async (offset?: number, size?: number): Promise<Photo[]> => {
        return await photoService.getPhotos(offset, size)
    }

    return {
        getPhotos,
        uploadPhotosInBatches,
        uploadProgress,
        isUploading,
        error,
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
