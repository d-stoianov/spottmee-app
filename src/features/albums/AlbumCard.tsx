import { Typography } from '@/components/ui/Typography'
import { Album } from '@/services/AlbumService/types'
import { CalendarDays, Users } from 'lucide-react'
import defaultAlbumCover from '@/assets/default-album-cover.jpg'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

type AlbumCardProps = {
    album: Album
    onClick?: () => any
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick }) => {
    const { t } = useTranslation()

    const { createdAt, name, coverImageUrl } = album

    const formattedDate = createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div
            className={clsx(
                'relative h-[20rem] w-[20rem] overflow-hidden rounded-[1.25rem]',
                { 'cursor-pointer': onClick }
            )}
            onClick={onClick}
        >
            {/* overlay */}
            <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-t from-black/60 to-transparent" />

            <img
                src={coverImageUrl ? coverImageUrl : defaultAlbumCover}
                className="h-full w-full object-cover"
                alt={`${name} album cover`}
            />

            <div className="absolute left-1/2 top-2/3 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center p-[1rem]">
                <Typography className="text-white" variant="heading3">
                    {name}
                </Typography>
                {/* created on and matches */}
                <div className="mt-[2rem] grid w-full grid-rows-2 justify-center">
                    <div className="flex w-full items-center gap-3">
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
                <div className="mt-[1rem] flex w-full justify-around">
                    <Typography className="text-white" variant="bodyDefault">
                        {t('albums.countPhotos', { count: 241 })}
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
