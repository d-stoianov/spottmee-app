import Input from '@/components/ui/Input'
import { Typography } from '@/components/ui/Typography'
import { Info, PencilLine } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import uploadCover from '@/assets/upload-cover.svg'
import { useRef, useState } from 'react'
import { AlbumCreateDTO } from '@/services/AlbumService/types'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'

type AlbumCreateFormProps = {
    onAlbumCreate: (albumCreateDTO: AlbumCreateDTO) => Promise<void>
}

const AlbumCreateForm: React.FC<AlbumCreateFormProps> = ({ onAlbumCreate }) => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const [albumCoverImage, setAlbumCoverImage] = useState<string>(uploadCover) // preview image
    const [albumCoverFile, setAlbumCoverFile] = useState<File | undefined>(
        undefined
    ) // file that goes to submit

    const [albumName, setAlbumName] = useState<string>('')
    const [albumDescription, setAlbumDescription] = useState<string>('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    const onAlbumCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAlbumCoverFile(file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setAlbumCoverImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        await onAlbumCreate({
            name: albumName,
            description: albumDescription,
            coverImage: albumCoverFile,
        })
        navigate('/')
    }

    const onUploadPhotosClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="flex w-full flex-col items-center justify-center gap-[3rem] lg:flex-row lg:gap-[7.5rem]">
            {/* banner */}
            <div className="flex flex-col items-center gap-[1.5rem]">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onAlbumCoverChange}
                    className="hidden"
                    ref={fileInputRef}
                />
                <img
                    src={albumCoverImage}
                    className="h-[10rem] w-[10rem] rounded-lg lg:h-[22rem] lg:w-[22rem]"
                    onClick={onUploadPhotosClick}
                />
                <Typography className="text-white" variant="bodyLarge">
                    {t('albums.uploadAlbumCover')}
                </Typography>
                <div className="flex items-center gap-4">
                    <Info className="text-secondary" size={'1.25rem'} />
                    <Typography
                        className="text-secondary"
                        variant="bodyDefault"
                    >
                        {t('albums.uploadAlbumCoverSubtext')}
                    </Typography>
                </div>
            </div>

            {/* inputs */}
            <form
                onSubmit={onFormSubmit}
                className="flex w-full flex-col items-center gap-[2.5rem] lg:w-auto"
            >
                <Input
                    onChange={(e) => setAlbumName(e.target.value)}
                    value={albumName}
                    icon={<PencilLine />}
                    placeholder={t('albums.nameField')}
                    className="w-full lg:w-[34rem]"
                />
                <Input
                    onChange={(e) => setAlbumDescription(e.target.value)}
                    value={albumDescription}
                    icon={<PencilLine />}
                    placeholder={t('albums.descriptionField')}
                    className="w-full lg:w-[34rem]"
                />
                <Button
                    className="w-full self-start text-nowrap px-10 lg:w-[20rem]"
                    variant="primary"
                    type="submit"
                >
                    <Typography className="text-white" variant="buttonText">
                        {t('albums.uploadPhotos')}
                    </Typography>
                </Button>
            </form>
        </div>
    )
}

export default AlbumCreateForm
