import PageLayout from '@/layout/PageLayout'
import { EventifyService } from '@/service'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const service = new EventifyService()

const EventPage = () => {
    const { id: eventId } = useParams()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imagesPath, setImagesPath] = useState<string[]>([])

    useEffect(() => {
        async function getImages() {
            if (!eventId) {
                navigate("/")
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

    return (
        <PageLayout>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <section className="grid grid-cols-4 gap-4">
                    {imagesPath.map((img, idx) => (
                        <div
                            className="flex flex-col items-center justify-end gap-2"
                            key={idx}
                        >
                            <img className="w-[20rem] rounded-lg" src={img} alt="image" />
                            <span>{EventifyService.getHostedImageFileName(img)}</span>
                        </div>
                    ))}
                </section>
            )}
        </PageLayout>
    )
}

export default EventPage
