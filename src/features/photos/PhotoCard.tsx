import { Photo } from '@/services/PhotoService/types'
import { formatFileSize } from '@/utils/formatting'
import { Download, Trash } from 'lucide-react'
import React from 'react'

type PhotoCardProps = {
    photo: File | Photo
    uploadProgress?: number
    onDownload?: () => Promise<void>
    onDelete?: () => Promise<void>
}

const PhotoCard: React.FC<PhotoCardProps> = (props) => {
    const isFile = (p: Photo | File): p is File => p instanceof File

    const name = isFile(props.photo)
        ? props.photo.name
        : props.photo.originalName

    const size = isFile(props.photo) ? props.photo.size : props.photo.size

    const src = isFile(props.photo)
        ? URL.createObjectURL(props.photo)
        : props.photo.url

    const progress = isFile(props.photo)
        ? props.uploadProgress
        : (props.uploadProgress ?? 0)

    return (
        <div className="flex w-[25rem] items-center justify-between rounded-lg p-4 shadow-sm">
            <div className="relative flex items-center gap-4">
                <div className="relative h-24 w-32 overflow-hidden rounded-lg">
                    {/* uploading progress overlay */}
                    <div
                        className="absolute left-0 top-0 h-full bg-purple-600 opacity-50"
                        style={{ width: `${progress}%` }}
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
                        {formatFileSize(size)}
                    </p>
                </div>
            </div>

            {!isFile(props.photo) && (props.onDownload || props.onDelete) && (
                <div className="flex items-center gap-2">
                    {props.onDownload && (
                        <button
                            onClick={props.onDownload}
                            className="text-gray-400 hover:text-white"
                            aria-label="Download file"
                        >
                            <Download size={24} />
                        </button>
                    )}
                    {props.onDelete && (
                        <button
                            onClick={props.onDelete}
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
