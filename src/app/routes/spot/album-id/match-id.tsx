import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import { usePublicAlbumProvider } from '@/features/match/PublicAlbumProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MatchResult } from '@/services/MatchService/types.ts'
import LoadingPage from '@/app/loading.tsx'
import PhotoCard from '@/features/photos/PhotoCard.tsx'
import PhotosTable from '@/features/photos/PhotosTable.tsx'
import { downloadFileFromURL, downloadFilesIntoZip } from '@/utils/file.ts'
import Button from '@/components/ui/Button.tsx'
import { RotateCcw } from 'lucide-react'

const POLLING_INTERVAL = 5000

const SpotMatchRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    const { matchId } = useParams()

    const { album, getMatchResult } = usePublicAlbumProvider()
    const [matchResult, setMatchResult] = useState<null | MatchResult>(null)

    useEffect(() => {
        if (!album || !matchId) return

        let intervalId: NodeJS.Timeout

        const fetchMatchResult = async () => {
            try {
                const result = await getMatchResult(matchId)
                setMatchResult(result)

                // if still processing, keep polling
                if (result.status === 'PROCESSING') {
                    if (!intervalId) {
                        intervalId = setInterval(
                            fetchMatchResult,
                            POLLING_INTERVAL
                        )
                    }
                } else {
                    // stop polling once done
                    if (intervalId) clearInterval(intervalId)
                }
            } catch (err) {
                console.error(err)
                if (intervalId) clearInterval(intervalId)
            }
        }

        fetchMatchResult()

        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [album, matchId, getMatchResult])

    if (!album) return

    if (!matchResult) return <LoadingPage />

    return (
        <Main className="flex w-full flex-col lg:px-[8rem] lg:py-[3rem]">
            <Typography
                className="mb-[3rem] text-center text-white"
                variant={isMobile ? 'heading3' : 'heading1'}
            >
                {matchResult.status === 'PROCESSING'
                    ? t('spot.comparingSelfiesWithOtherPhotos')
                    : matchResult.matches.length > 0
                      ? t('spot.weFoundYourCountPhotos', {
                            count: matchResult.matches.length,
                        })
                      : t('spot.noMatchesFound')}
            </Typography>
            <PhotosTable
                photosCards={matchResult.matches
                    .sort(
                        (a, b) => b.createdAt.getTime() - a.createdAt.getTime() // sort by recents first
                    )
                    .map((photo) => {
                        return (
                            <PhotoCard
                                key={photo.id}
                                photo={photo}
                                onDownload={async () => {
                                    await downloadFileFromURL(
                                        photo.url,
                                        photo.originalName
                                    )
                                }}
                            />
                        )
                    })}
                totalPhotos={matchResult.matches.length}
            />
            {matchResult && matchResult.status === 'READY' && (
                <div className={'mt-[5rem] flex flex-col items-center gap-6'}>
                    <Button
                        variant={'primary'}
                        className={'h-[3.5rem] w-[19.25rem]'}
                        onClick={async () => {
                            if (!matchResult) return

                            await downloadFilesIntoZip(
                                matchResult.matches.map((p) => {
                                    return { url: p.url, name: p.originalName }
                                })
                            )
                        }}
                    >
                        <Typography className="text-white" variant="buttonText">
                            {t('spot.downloadAll')}
                        </Typography>
                    </Button>{' '}
                    <button
                        className={'flex items-center gap-2'}
                        onClick={() => navigate(`/spot/${album.id}`)}
                    >
                        <Typography
                            className="text-secondary"
                            variant="buttonText"
                        >
                            {t('spot.reupload')}
                        </Typography>
                        <RotateCcw className={'text-secondary'} />
                    </button>
                </div>
            )}
        </Main>
    )
}

export default SpotMatchRoute
