import { Typography } from '@/components/ui/Typography.tsx'
import React, { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PhotoCardProps } from '@/features/photos/PhotoCard.tsx'

type PhotosTableProps = {
    photosCards: ReactElement<PhotoCardProps>[]
    uploadingPhotosCards?: ReactElement<PhotoCardProps>[]
    totalPhotos?: number
    onLoadMorePhotos?: () => Promise<void>
}

const PhotosTable: React.FC<PhotosTableProps> = ({
    photosCards,
    uploadingPhotosCards,
    totalPhotos,
    onLoadMorePhotos,
}) => {
    const { t } = useTranslation()

    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)

    return (
        <div className={'flex w-full flex-col gap-4'}>
            {/* grid with existing and photos that are currently uploading */}
            <div
                className="mt-8 grid w-full justify-center gap-6"
                style={{
                    gridTemplateColumns:
                        'repeat(auto-fit, minmax(25rem, max-content))',
                }}
            >
                {uploadingPhotosCards}
                {photosCards}
            </div>

            {/* button to load more photos */}
            {(totalPhotos ?? 0) > photosCards.length && (
                <>
                    {/* TODO: replace with a spinner */}
                    {isLoadingMore ? (
                        <Typography
                            className="text-secondary"
                            variant="bodyLarge"
                        >
                            {t('general.loading')}
                        </Typography>
                    ) : (
                        <button
                            onClick={async () => {
                                setIsLoadingMore(true)
                                if (onLoadMorePhotos) {
                                    await onLoadMorePhotos()
                                }
                                setIsLoadingMore(false)
                            }}
                        >
                            <Typography
                                className="text-secondary"
                                variant="buttonText"
                            >
                                {t('albums.seeMore')}
                            </Typography>
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export default PhotosTable
