import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import { usePublicAlbumProvider } from '@/features/match/PublicAlbumProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'

const SpotAlbumRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const { album } = usePublicAlbumProvider()

    if (!album) return

    return (
        <Main className="flex w-full flex-col lg:px-[8rem] lg:py-[3rem]">
            <Typography
                className="mb-[3rem] text-start text-white"
                variant={isMobile ? 'heading3' : 'heading1'}
                dangerouslySetInnerHTML={{ __html: t('spot.albumTitle') }}
            />

            <div>
                {/* cards mosaic */}
                <div></div>

                {/*album info */}
                <div>
                    <Typography variant={'bodyLarge'}>
                        {t('spot.countPhotosUploaded', {
                            count: album.totalPhotosCount,
                        })}
                    </Typography>
                    <div className="flex items-center gap-2">
                        <Typography variant={'bodyLarge'}>
                            {t('spot.album')}:
                        </Typography>
                        <Typography variant={'bodyLarge'}>
                            {album.name}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                        <Typography variant={'bodyLarge'}>
                            {t('spot.sharedBy')}:
                        </Typography>
                        <Typography variant={'bodyLarge'}>
                            {album.creator}
                        </Typography>
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default SpotAlbumRoute
