import i18next from 'i18next'

type AlbumFormValidationResponse = {
    isValid: boolean
    messages: string[]
}

export class AlbumFormValidationService {
    public validateCoverFile(coverFile?: File): AlbumFormValidationResponse {
        const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5 MB

        const response: AlbumFormValidationResponse = {
            isValid: true,
            messages: [],
        }

        if (!coverFile) return response

        if (coverFile.size > MAX_IMAGE_SIZE) {
            response.isValid = false
            response.messages.push(i18next.t('albums.validation.imageIsTooBig'))
        }

        return response
    }

    public validateName(name: string): AlbumFormValidationResponse {
        const MIN_NAME_LENGTH = 2
        const MAX_NAME_LENGTH = 32

        const response: AlbumFormValidationResponse = {
            isValid: true,
            messages: [],
        }

        if (name.length === 0) {
            response.isValid = false
            response.messages.push(i18next.t('albums.validation.nameIsEmpty'))
            return response
        }

        if (name.length < MIN_NAME_LENGTH) {
            response.isValid = false
            response.messages.push(
                i18next.t('albums.validation.nameIsTooShort')
            )
        }

        if (name.length > MAX_NAME_LENGTH) {
            response.isValid = false
            response.messages.push(i18next.t('albums.validation.nameIsTooLong'))
        }

        return response
    }

    public validateDescription(
        description: string
    ): AlbumFormValidationResponse {
        const MIN_NAME_LENGTH = 2
        const MAX_NAME_LENGTH = 32

        const response: AlbumFormValidationResponse = {
            isValid: true,
            messages: [],
        }

        if (description.length === 0) return response // valid

        if (description.length < MIN_NAME_LENGTH) {
            response.isValid = false
            response.messages.push(
                i18next.t('albums.validation.descriptionIsTooShort')
            )
        }

        if (description.length > MAX_NAME_LENGTH) {
            response.isValid = false
            response.messages.push(
                i18next.t('albums.validation.descriptionIsTooLong')
            )
        }

        return response
    }
}
