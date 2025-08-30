import { useAuth } from '@/providers/AuthProvider'
import { PhotoService } from '@/services/PhotoService.ts'
import { Photo } from '@/services/PhotoService.ts/types'
import { useMemo, useState } from 'react'

type UploadProgress = { [batchIndex: number]: number } // progress is 0 - 100

// batch size splits photos into groups of uploads making upload faster
// if batch is 10 - then 10 photos in a batch share the same progress

const usePhotosUpload = (albumId: string, batchSize = 10) => {
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

    // helper function to create batches
    const chunkArray = (arr: File[], size: number): File[][] => {
        const chunks: File[][] = []
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size))
        }
        return chunks
    }

    const uploadPhotosInBatches = async (files: File[]) => {
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

    return {
        uploadPhotosInBatches,
        uploadProgress,
        isUploading,
        error,
    }
}

export default usePhotosUpload
