import Modal from '@/components/Modal'
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

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openFindMeModal = () => setIsModalOpen(true)
    const closeFindMeModal = () => setIsModalOpen(false)

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
                    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <button
                            className="rounded-lg border-2 px-4 py-2"
                            onClick={downloadAllImages}
                        >
                            Download all
                        </button>
                        <button
                            className="rounded-lg border-2 px-4 py-2"
                            onClick={openFindMeModal}
                        >
                            Find me on the photos
                        </button>
                    </div>

                    <Modal isOpen={isModalOpen} onClose={closeFindMeModal}>
                        <h1 className="mb-4 text-center text-xl font-bold">
                            Find me on the photos
                        </h1>
                        <form className="flex flex-col items-center justify-center gap-4">
                            <div className="mb-4">
                                <label
                                    htmlFor="photoInput"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Please choose a selfie from your device
                                </label>
                                <input
                                    id="photoInput"
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    multiple
                                    className="w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </form>
                    </Modal>
                </>
            )}
        </PageLayout>
    )
}

export default EventPage
