import PageLayout from '@/layout/PageLayout'
import { EventifyService } from '@/service'
import JSZip from 'jszip'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const service = new EventifyService()
const zip = new JSZip()

const EventPage = () => {
    const { id: eventId } = useParams()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imagesPath, setImagesPath] = useState<string[]>([])

    useEffect(() => {
        async function getImages() {
            if (!eventId) {
                navigate('/')
                return
            }

            try {
                setIsLoading(true)
                const response = await service.getImagesForEvent(eventId)
                setImagesPath(response.images)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }

        getImages()
    }, [])

    const downloadAllImages = async () => {
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
                    <section className="grid grid-cols-4 gap-4">
                        {imagesPath.map((img, idx) => (
                            <div
                                className="flex flex-col items-center justify-end gap-2"
                                key={idx}
                            >
                                <img
                                    className="w-[20rem] rounded-lg"
                                    src={img}
                                    alt="image"
                                />
                                <span>
                                    {EventifyService.getHostedImageFileName(
                                        img
                                    )}
                                </span>
                            </div>
                        ))}
                    </section>
                    <button
                        className="rounded-lg border-2 px-4 py-2"
                        onClick={downloadAllImages}
                    >
                        Download all
                    </button>
                </>
            )}
        </PageLayout>
    )
}

export default EventPage
