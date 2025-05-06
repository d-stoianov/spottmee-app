import ImageSection from '@/components/ImageSection'
import PageLayout from '@/layout/PageLayout'
import eventifyService from '@/service'
import JSZip from 'jszip'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const zip = new JSZip()

const CompareResultPage = () => {
    const { id: eventId, compareKey } = useParams()
    const navigate = useNavigate()

    const [matches, setMatches] = useState<string[] | null>(null)

    // poll compare result
    useEffect(() => {
        if (!eventId || !compareKey) return

        let intervalId

        const fetchMatches = async () => {
            try {
                const { matches } = await eventifyService.getCompareResult(
                    eventId,
                    compareKey
                )
                setMatches(matches)
            } catch (error) {
                console.error('Failed to fetch matches', error)
            }
        }

        fetchMatches() // initial fetch
        intervalId = setInterval(fetchMatches, 5000) // poll every 5 seconds

        return () => {
            clearInterval(intervalId)
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
            {matches === null ? (
                <span>Loading...</span>
            ) : (
                <>
                    <span>{`Found ${matches.length} match${matches.length === 1 ? '' : 'es'}`}</span>
                    <ImageSection imagesPath={matches} />

                    <div className="flex flex-col gap-4 lg:flex-row">
                        {matches.length > 0 && (
                            <button
                                className="rounded-lg border-2 px-4 py-2"
                                onClick={() => downloadAllImages(matches)}
                            >
                                Download all
                            </button>
                        )}
                        <button
                            className="rounded-lg border-2 px-4 py-2"
                            onClick={() => navigate(0)}
                        >
                            Try again
                        </button>
                    </div>
                </>
            )}
        </PageLayout>
    )
}

export default CompareResultPage
