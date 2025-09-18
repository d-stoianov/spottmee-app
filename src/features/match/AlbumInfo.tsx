import { MatchAlbumDTO } from '@/services/MatchService/types.ts'
import { Typography } from '@/components/ui/Typography.tsx'
import { useTranslation } from 'react-i18next'

const AlbumInfo: React.FC<MatchAlbumDTO> = ({
    name,
    description,
    creator,
    totalPhotosCount,
}) => {
    const { t } = useTranslation()

    return (
        <div
            className={
                'flex w-fit flex-col justify-center gap-6 rounded-[1.25rem] border border-[#DCB7FF] border-opacity-50 px-8 pb-14 pt-4'
            }
        >
            <div className={'flex w-full items-center justify-center'}>
                <Typography variant="bodyDefault" className="inline-block">
                    <span className="text-white">
                        {t('spot.countPhotosUploaded', {
                            count: totalPhotosCount,
                        })}
                    </span>
                </Typography>
            </div>

            <div className={'flex flex-col gap-2'}>
                <Typography variant="bodyDefault" className="inline-block">
                    <span className="text-white">{t('spot.album')}:</span>{' '}
                    <span className="text-secondary">{name}</span>
                </Typography>

                <Typography variant="bodyDefault" className="inline-block">
                    <span className="text-white">{t('spot.sharedBy')}:</span>{' '}
                    <span className="text-secondary">{creator}</span>
                </Typography>

                <Typography variant="bodyDefault" className="inline-block">
                    <span className="text-white">{t('spot.description')}:</span>{' '}
                    <span className="text-secondary">
                        {description
                            ? description
                            : t('spot.descriptionPlaceholder')}
                    </span>
                </Typography>
            </div>
        </div>
    )
}

export default AlbumInfo
