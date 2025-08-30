import { formatFileSize } from '@/utils/formatting'
import { Download, Trash } from 'lucide-react'
import React from 'react'

type PhotoCardProps = {
    file: File
    uploadProgress?: number
    onDownload?: (file: File) => void
    onDelete?: (file: File) => void
}

const PhotoCard: React.FC<PhotoCardProps> = ({
    file,
    uploadProgress,
    onDownload,
    onDelete,
}) => {
    const imageUrl = URL.createObjectURL(file)

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
                        src={imageUrl}
                        alt={file.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* file info */}
                <div>
                    <p className="max-w-[10rem] truncate text-lg font-medium text-white">
                        {file.name}
                    </p>
                    <p className="text-sm text-gray-400">
                        {formatFileSize(file.size)}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {onDownload && (
                    <button
                        onClick={() => onDownload(file)}
                        className="text-gray-400 hover:text-white"
                        aria-label="Download file"
                    >
                        <Download size={24} /> {/* Download icon */}
                    </button>
                )}
                {onDelete && (
                    <button
                        onClick={() => onDelete(file)}
                        className="text-gray-400 hover:text-white"
                        aria-label="Delete file"
                    >
                        <Trash size={24} /> {/* Trash icon */}
                    </button>
                )}
            </div>
        </div>
    )
}

export default PhotoCard
