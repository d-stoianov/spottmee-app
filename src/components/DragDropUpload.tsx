import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

type DragDropUploadProps = {
    onFilesSelected?: (files: File[]) => void
    allowMultiple?: boolean
}

const DragDropUpload: React.FC<DragDropUploadProps> = ({
    onFilesSelected,
    allowMultiple = true,
}) => {
    const { t } = useTranslation()

    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        onFilesSelected?.(files)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : []
        onFilesSelected?.(files)
    }

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <div
                className={`w-full max-w-md rounded-lg border-2 border-dashed p-8 transition-colors ${
                    isDragging
                        ? 'border-primary bg-blue-50'
                        : 'border-secondary bg-white'
                } cursor-pointer`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple={allowMultiple}
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="text-center">
                    <p className="text-secondary">
                        {isDragging
                            ? t('albums.dropPhotosHere')
                            : t('albums.dragDropPhotos')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DragDropUpload
