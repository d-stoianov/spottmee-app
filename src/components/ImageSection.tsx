import { EventifyService } from '@/service'

interface ImageSectionProps {
    imagesPath: string[]
}

const ImageSection = ({ imagesPath }: ImageSectionProps) => {
    return (
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
                    <span>{EventifyService.getHostedImageFileName(img)}</span>
                </div>
            ))}
        </section>
    )
}

export default ImageSection
