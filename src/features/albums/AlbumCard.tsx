import { Typography } from '@/components/ui/Typography'
import { Album } from '@/services/AlbumService/types'
import { CalendarDays, Users } from 'lucide-react'
import defaultAlbumCover from '@/assets/album-cover.jpg'
import { useTranslation } from 'react-i18next'

type AlbumCardProps = Album & {
    // later add more
}

const AlbumCard: React.FC<AlbumCardProps> = ({
    name,
    description,
    createdAt,
}) => {
    const { t } = useTranslation()

    const formattedDate = createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className="relative h-[20rem] w-[20rem] overflow-hidden rounded-[1.25rem]">
            {/* overlay */}
            <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-t from-black/60 to-transparent" />

            <img
                src={defaultAlbumCover}
                className="h-full w-full object-cover"
                alt={`${name} album cover`}
            />

            <div className="absolute left-1/2 top-2/3 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center p-[1rem]">
                <Typography className="text-white" variant="heading3">
                    {name}
                </Typography>
                {/* created on and matches */}
                <div className="mt-[2rem] grid grid-rows-2 w-full justify-center">
                    <div className="flex items-center gap-3 w-full">
                        <CalendarDays className="text-secondary" size={20} />
                        <Typography
                            className="w-[6rem] text-secondary"
                            variant="bodyDefault"
                        >
                            {t('albums.createdOn')}:
                        </Typography>
                        <Typography
                            className="text-white"
                            variant="bodyDefault"
                        >
                            {formattedDate}
                        </Typography>
                    </div>
                    <div className="flex items-center gap-3">
                        <Users className="text-secondary" size={20} />
                        <Typography
                            className="w-[6rem] text-secondary"
                            variant="bodyDefault"
                        >
                            {t('albums.matches')}:
                        </Typography>
                        <Typography
                            className="text-white"
                            variant="bodyDefault"
                        >
                            {t('albums.countGuestMatched', { count: 37 })}
                        </Typography>
                    </div>
                </div>
                {/* photos and size */}
                <div className="flex w-full justify-around mt-[1rem]">
                    <Typography className="text-white" variant="bodyDefault">
                        {t('albums.countPhotos', {count: 241})}
                    </Typography>
                    <Typography className="text-white" variant="bodyDefault">
                        {2.1}mb
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default AlbumCard
