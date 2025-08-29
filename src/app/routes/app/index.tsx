import Main from '@/components/layout/Main'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Typography } from '@/components/ui/Typography'
import AlbumCard from '@/features/albums/AlbumCard'
import { useAlbums } from '@/features/albums/AlbumsProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { Album } from '@/services/AlbumService/types'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const HomeRoute: React.FC = () => {
    const { albums } = useAlbums()

    const [filteredAlbums, setFilteredAlbums] = useState<Album[]>(albums)

    const { t } = useTranslation()
    const isMobile = useIsMobile()

    const navigate = useNavigate()

    useEffect(() => {
        setFilteredAlbums(albums)
    }, [albums])

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        const filtered = albums.filter((al) =>
            al.name.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredAlbums(filtered)
    }

    return (
        <Main className="flex w-full flex-col items-center md:items-start md:px-[8rem] md:py-[3rem]">
            <Typography
                className="mb-[2rem]"
                variant={isMobile ? 'heading2' : 'heading1'}
            >
                {t('albums.yourAlbums')}
            </Typography>

            {/* input + button */}
            <div className="mb-[2rem] flex w-full gap-[5rem]">
                <Input
                    onChange={onSearch}
                    className="border-secondary"
                    placeholder={t('albums.searchForAlbums')}
                    icon={<Search />}
                />
                {!isMobile && (
                    <Button
                        onClick={() => navigate('/create')}
                        variant="primary"
                        className="px-8 py-2"
                    >
                        <Typography
                            variant="buttonText"
                            className="text-nowrap text-white"
                        >
                            + {t('albums.createNewAlbum')}
                        </Typography>
                    </Button>
                )}
            </div>

            {/* album cards grid */}
            <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-10 md:justify-between">
                {filteredAlbums.map((al) => (
                    <AlbumCard {...al} />
                ))}
            </div>

            {/* button footer mobile */}
            {isMobile && (
                <div className='fixed bottom-0 mb-[2.5rem]'>
                    <Button
                        onClick={() => navigate('/create')}
                        variant="primary"
                        className="px-8 py-2"
                    >
                        <Typography
                            variant="buttonText"
                            className="text-nowrap text-white"
                        >
                            + {t('albums.createNewAlbum')}
                        </Typography>
                    </Button>
                </div>
            )}
        </Main>
    )
}

export default HomeRoute
