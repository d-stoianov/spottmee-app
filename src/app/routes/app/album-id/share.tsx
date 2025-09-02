import Main from '@/components/layout/Main'
import Input from '@/components/ui/Input'
import { Typography } from '@/components/ui/Typography'
import AlbumCard from '@/features/albums/AlbumCard'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

const AlbumShareRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const { getAlbumById } = useAlbums()

    const { albumId } = useParams()

    const [showCopiedIcon, setShowCopiedIcon] = useState<boolean>(false)

    const album = albumId ? getAlbumById(albumId) : undefined

    const albumUrl = `${window.origin}/spot/${album?.id}`

    if (!album) {
        return
    }

    return (
        <Main className="flex w-full flex-col items-center lg:px-[8rem] lg:py-[3rem]">
            <Typography
                className="mb-[3rem] text-center text-white"
                variant={isMobile ? 'heading3' : 'heading1'}
            >
                {t('albums.yourAlbumIsReady')}
            </Typography>

            <AlbumCard showDetails={false} album={album} />

            <div className="mt-[2rem] flex w-full flex-col items-center gap-4 lg:w-[34rem]">
                <Input
                    value={albumUrl}
                    variant="white"
                    disabled
                    icon={{
                        icon: showCopiedIcon ? <Check /> : <Copy />,
                        position: 'right',
                        onClick: async () => {
                            await window.navigator.clipboard.writeText(albumUrl)
                            setShowCopiedIcon(true)
                            setTimeout(() => setShowCopiedIcon(false), 1500)
                        },
                    }}
                />
                <Link to={'/'}>
                    <Typography
                        className="text-secondary underline"
                        variant="bodyDefault"
                    >
                        {t('general.backToHome')}
                    </Typography>
                </Link>
            </div>
        </Main>
    )
}

export default AlbumShareRoute
