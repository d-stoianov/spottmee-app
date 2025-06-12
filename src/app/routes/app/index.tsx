import PageLayout from '@/layout/PageLayout'
import eventifyService from '@/services/EventService'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomeRoute: React.FC = () => {
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const isButtonDisabled = files.length === 0 || isLoading

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (e.dataTransfer.files) {
            setFiles(Array.from(e.dataTransfer.files))
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()

        files.forEach((file) => {
            formData.append('photos', file)
        })

        try {
            setIsLoading(true)
            const response = await eventifyService.createEvent(formData)
            navigate(`event/${response.eventId}`)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    return (
        <PageLayout>
            <form
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative flex h-[10rem] w-full flex-col items-center gap-[0.75rem] border-2 border-black bg-white md:w-[32rem] lg:h-[12rem]"
            >
                {files.length > 0 ? (
                    <div className="h-[6.5rem] w-full overflow-y-auto border-gray-300 lg:h-[8.5rem]">
                        {files.map((f, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border-b-2 border-gray-100 p-2"
                            >
                                <span>{f.name}</span>
                                <span className="text-sm text-gray-500">
                                    {Math.round(f.size / 1024)} KB
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <img
                        className="mt-[3rem] w-[4rem] lg:mt-[5rem]"
                        src="upload.png"
                        alt="upload"
                    />
                )}

                <label
                    htmlFor="file-input"
                    className="cursor-pointer text-center font-comfortaa text-sm text-black"
                >
                    Drop files here or click to upload
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    onChange={handleFileChange}
                    className={`absolute left-0 top-0 h-full w-full cursor-pointer opacity-0 ${files.length > 0 ? 'z-[-1]' : 'z-[100]'}`}
                />
            </form>
            <button
                className={`rounded-lg border-2 border-black px-4 py-2 ${isButtonDisabled && 'cursor-not-allowed'}`}
                disabled={isButtonDisabled}
                onClick={handleSubmit}
            >
                Create event link
            </button>
        </PageLayout>
    )
}

export default HomeRoute
