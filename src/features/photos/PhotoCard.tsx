import { Photo, PhotoStatus } from '@/services/PhotoService/types'
import { formatFileSize } from '@/utils/formatting'
import { Download, Trash } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type PhotoCardProps = {
    photo: File | Photo
    uploadProgress?: number
    onDownload?: () => Promise<void>
    onDelete?: () => Promise<void>
    showStatusExplanation?: boolean
}

const PhotoCard: React.FC<PhotoCardProps> = ({
    photo,
    uploadProgress,
    onDownload,
    onDelete,
    showStatusExplanation = true,
}) => {
    const { t } = useTranslation()

    const isFile = photo instanceof File

    const name = isFile ? photo.name : photo.originalName

    const status: PhotoStatus | 'UPLOADING' = isFile
        ? 'UPLOADING'
        : photo.status

    const src = isFile ? URL.createObjectURL(photo) : photo.url

    return (
        <div className="flex w-[25rem] items-center justify-between rounded-lg p-4 shadow-sm">
            <div className="relative flex items-center gap-4">
                <div className="relative h-24 w-32 overflow-hidden rounded-lg">
                    {/* uploading progress overlay */}
                    <div
                        className="absolute left-0 top-0 h-full bg-purple-600 opacity-50"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>

                    <img
                        src={src}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* file info */}
                <div>
                    <p className="max-w-[10rem] truncate text-lg font-medium text-white">
                        {name}
                    </p>
                    <p className="text-sm text-gray-400">
                        {formatFileSize(photo.size)}
                    </p>
                    {showStatusExplanation && (
                        <p className="text-sm text-gray-400">
                            {t(`albums.photoStatusExplanation.${status}`)}
                        </p>
                    )}
                </div>
            </div>

            {!isFile && (onDownload || onDelete) && (
                <div className="flex items-center gap-2">
                    {onDownload && (
                        <button
                            onClick={onDownload}
                            className="text-gray-400 hover:text-white"
                            aria-label="Download file"
                        >
                            <Download size={24} />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={onDelete}
                            className="text-gray-400 hover:text-white"
                            aria-label="Delete file"
                        >
                            <Trash size={24} />
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default PhotoCard
