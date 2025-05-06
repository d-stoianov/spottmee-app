import { EventPhoto } from '@/service/types'

interface ImageSectionProps {
    images: EventPhoto[]
}

const ImageSection = ({ images }: ImageSectionProps) => {
    return (
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {images.map((img, idx) => (
                <div
                    className="flex flex-col items-center justify-end gap-2"
                    key={idx}
                >
                    <img
                        className="w-[20rem] rounded-lg"
                        src={img.photoUrl}
                        alt="image"
                    />
                    <span>{img.fileName}</span>
                </div>
            ))}
        </section>
    )
}

export default ImageSection
