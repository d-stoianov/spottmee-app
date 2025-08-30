import Input from '@/components/ui/Input'
import { Typography } from '@/components/ui/Typography'
import { Info, PencilLine } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import uploadCover from '@/assets/upload-cover.svg'
import { useRef, useState } from 'react'
import { Album, AlbumCreateDTO } from '@/services/AlbumService/types'
import Button from '@/components/ui/Button'
import { AlbumFormValidationService } from '@/features/albums/AlbumFormValidationService'
import clsx from 'clsx'

type AlbumFormProps = {
    onSubmit: (albumCreateDTO: AlbumCreateDTO) => Promise<void>
    onDelete?: () => Promise<void>
    album?: Album // existing album object
}

const albumFormValidationService = new AlbumFormValidationService()

const AlbumForm: React.FC<AlbumFormProps> = ({ onSubmit, onDelete, album }) => {
    const { t } = useTranslation()

    const [coverImage, setCoverImage] = useState<string>(
        album?.coverImageUrl || uploadCover
    ) // preview image for the album cover
    const [coverFile, setCoverFile] = useState<File | undefined>(undefined) // file that goes to submit

    const [name, setName] = useState<string>(album?.name || '')
    const [description, setDescription] = useState<string>(
        album?.description || ''
    )

    const [coverFileValidationMessages, setCoverFileValidationMessages] =
        useState<string[]>([])
    const [nameValidationMessages, setNameValidationMessage] = useState<
        string[]
    >([])
    const [descriptionValidationMessages, setDescriptionValidationMessages] =
        useState<string[]>([])

    const [actionButtonsDisabled, setActionButtonsDisabled] = useState<boolean>(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    // if values didn't change from their original - disable button
    const isUnchanged =
        name.trim() === (album?.name || '') &&
        description.trim() === (album?.description || '') &&
        !coverFile

    const onAlbumCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setCoverFile(file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setCoverImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const validateFormData = (): boolean => {
        // validate each field
        const coverFileResponse =
            albumFormValidationService.validateCoverFile(coverFile)
        const nameResponse = albumFormValidationService.validateName(
            name.trim()
        )
        const descriptionResponse =
            albumFormValidationService.validateDescription(description.trim())

        console.log('coverFileResponse', coverFile)

        setCoverFileValidationMessages(coverFileResponse.messages)
        setNameValidationMessage(nameResponse.messages)
        setDescriptionValidationMessages(descriptionResponse.messages)

        return (
            coverFileResponse.isValid &&
            nameResponse.isValid &&
            descriptionResponse.isValid
        )
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        const isValid = validateFormData()

        if (!isValid) return

        try {
            setActionButtonsDisabled(true)
            await onSubmit({
                name: name.trim(),
                description: description.trim(),
                coverImage: coverFile,
            })
        } catch (error) {
        } finally {
            setActionButtonsDisabled(false)
        }
    }

    const onUploadPhotosClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="flex w-full flex-col items-center justify-center gap-[3rem] lg:flex-row lg:gap-[7.5rem]">
            {/* banner */}
            <div className="flex flex-col items-center gap-[1rem]">
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={onAlbumCoverChange}
                    className="hidden"
                    ref={fileInputRef}
                />
                <div className="flex w-full flex-col items-center gap-2 lg:w-[34rem]">
                    <img
                        src={coverImage}
                        className={clsx(
                            'h-[10rem] w-[10rem] lg:h-[22rem] lg:w-[22rem]',
                            {
                                'rounded-lg object-cover':
                                    coverImage !== uploadCover,
                            }
                        )}
                        onClick={onUploadPhotosClick}
                    />
                    {coverFileValidationMessages.map((m, idx) => (
                        <p
                            key={idx}
                            className="font-comfortaa text-xs text-red-500"
                        >
                            {m}
                        </p>
                    ))}
                </div>
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
                className="flex w-full flex-col items-start gap-[2rem] lg:w-auto"
            >
                <div className="flex w-full flex-col gap-[1rem]">
                    <div className="flex w-full flex-col gap-2 lg:w-[34rem]">
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            icon={<PencilLine />}
                            placeholder={t('albums.nameField')}
                        />
                        {nameValidationMessages.map((m, idx) => (
                            <p
                                key={idx}
                                className="font-comfortaa text-xs text-red-500"
                            >
                                {m}
                            </p>
                        ))}
                    </div>
                    <div className="flex w-full flex-col gap-2 lg:w-[34rem]">
                        <Input
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            icon={<PencilLine />}
                            placeholder={t('albums.descriptionField')}
                        />
                        {descriptionValidationMessages.map((m, idx) => (
                            <p
                                key={idx}
                                className="font-comfortaa text-xs text-red-500"
                            >
                                {m}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex w-full gap-2">
                    <Button
                        className="w-full self-start text-nowrap px-14"
                        variant="primary"
                        type="submit"
                        disabled={actionButtonsDisabled || isUnchanged}
                    >
                        <Typography className="text-white" variant="buttonText">
                            {album
                                ? t('albums.save')
                                : t('albums.uploadPhotos')}
                        </Typography>
                    </Button>
                    {onDelete && (
                        <Button
                            className="w-full self-start text-nowrap px-10"
                            variant="danger"
                            onClick={async () => {
                                setActionButtonsDisabled(true)
                                await onDelete()
                            setActionButtonsDisabled(false)

                            }}
                            disabled={actionButtonsDisabled}
                        >
                            <Typography
                                className="text-white"
                                variant="buttonText"
                            >
                                {t('albums.delete')}
                            </Typography>
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default AlbumForm
