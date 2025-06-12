import { useApp } from '@/app/provider'
import ImageSection from '@/components/ImageSection'
import PageLayout from '@/components/layout/PageLayout'
import { EventPhoto } from '@/services/EventService/types'
import JSZip from 'jszip'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const zip = new JSZip()

const CompareRoute: React.FC = () => {
    const { id: eventId, compareKey } = useParams()
    const navigate = useNavigate()

    const { eventService } = useApp()

    const invervalIdRef = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    )

    const [matches, setMatches] = useState<EventPhoto[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // poll compare result
    useEffect(() => {
        if (!eventId || !compareKey) return

        const fetchMatches = async () => {
            try {
                const result = await eventService.getCompareResult(
                    eventId,
                    compareKey
                )
                setMatches(result.matches)
                // stop polling if status is present
                if (result.status) {
                    clearInterval(invervalIdRef.current)
                    setIsLoading(false)
                }
            } catch (error) {
                console.error('Failed to fetch matches', error)
            }
        }

        fetchMatches() // initial fetch
        invervalIdRef.current = setInterval(fetchMatches, 5000) // poll every 5 seconds

        if (matches && matches.length > 0) {
            clearInterval(invervalIdRef.current)
        }

        return () => {
            clearInterval(invervalIdRef.current)
        }
    }, [eventId, compareKey])

    const downloadAllImages = async (imagesPath: string[]) => {
        try {
            const promises = imagesPath.map(async (img) => {
                const response = await fetch(img)
                const blob = await response.blob()

                const fileName = img.split('/').pop()
                if (fileName) {
                    zip.file(fileName, blob)
                }
            })

            await Promise.all(promises)

            const zipData = await zip.generateAsync({
                type: 'blob',
                streamFiles: true,
            })
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(zipData)
            link.download = `eventify-ai-${eventId}.zip`
            link.click()
        } catch (error) {
            console.error('error while downloading images:', error)
        }
    }

    return (
        <PageLayout>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <>
                    <span>{`Found ${matches.length} match${matches.length === 1 ? '' : 'es'}`}</span>
                    <ImageSection images={matches} />

                    <div className="flex flex-col gap-4 lg:flex-row">
                        {matches.length > 0 && (
                            <button
                                className="rounded-lg border-2 px-4 py-2"
                                onClick={() =>
                                    downloadAllImages(
                                        matches.map((m) => m.photoUrl)
                                    )
                                }
                            >
                                Download all
                            </button>
                        )}
                        <button
                            className="rounded-lg border-2 px-4 py-2"
                            onClick={() => navigate(-1)}
                        >
                            Try again
                        </button>
                    </div>
                </>
            )}
        </PageLayout>
    )
}

export default CompareRoute
