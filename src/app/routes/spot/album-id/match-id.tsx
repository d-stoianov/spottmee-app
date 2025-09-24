import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import { usePublicAlbumProvider } from '@/features/match/PublicAlbumProvider'
import useIsMobile from '@/hooks/useIsMobile'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MatchResult } from '@/services/MatchService/types.ts'
import LoadingPage from '@/app/loading.tsx'
import PhotoCard from '@/features/photos/PhotoCard.tsx'
import PhotosTable from '@/features/photos/PhotosTable.tsx'
import { downloadFileFromURL } from '@/utils/file.ts'

const POLLING_INTERVAL = 5000

const SpotMatchRoute: React.FC = () => {
    const { t } = useTranslation()
    const isMobile = useIsMobile()

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
        </Main>
    )
}

export default SpotMatchRoute
