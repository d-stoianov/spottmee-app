import i18next from 'i18next'

export type AuthFormValidationResponse = {
    isValid: boolean
    messages: string[]
}

export class AuthFormValidationService {
    public validateName(name: string): AuthFormValidationResponse {
        const MIN_NAME_LENGTH = 2
        const MAX_NAME_LENGTH = 32

        const response: AuthFormValidationResponse = {
            isValid: true,
            messages: [],
        }

        if (name.length === 0) {
            response.isValid = false
            response.messages.push(i18next.t('auth.nameIsEmpty'))
            return response
        }

        if (name.length < MIN_NAME_LENGTH) {
            response.isValid = false
            response.messages.push(i18next.t('auth.nameIsTooShort'))
        }

        if (name.length > MAX_NAME_LENGTH) {
            response.isValid = false
            response.messages.push(i18next.t('auth.nameIsTooLong'))
        }

        if (name.split(' ').length > 1) {
            response.isValid = false
            response.messages.push(i18next.t('auth.nameShouldBeOneWord'))
        }

        return response
    }

    public validateEmail(email: string): AuthFormValidationResponse {
        // TODO: put email regex
        const EMAIL_REGEX = new RegExp('')

        const response: AuthFormValidationResponse = {
            isValid: true,
            messages: [],
        }

        if (email.length === 0) {
            response.isValid = false
            response.messages.push(i18next.t('auth.emailIsEmpty'))
            return response
        }

        if (!EMAIL_REGEX.test(email)) {
            response.isValid = false
            response.messages.push(i18next.t('auth.incorrectEmailFormat'))
        }

        return response
    }

    public validatePassword(password: string): AuthFormValidationResponse {
        const MIN_PASSWORD_LENGTH = 8
        const MAX_PASSWORD_LENGTH = 64

        const response: AuthFormValidationResponse = {
            isValid: true,
            messages: [],
        }

        if (password.length === 0) {
            response.isValid = false
            response.messages.push(i18next.t('auth.passwordIsEmpty'))
            return response
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            response.isValid = false
            response.messages.push(i18next.t('auth.passwordShoulBe8Chars'))
        }

        if (password.length > MAX_PASSWORD_LENGTH) {
            response.isValid = false
            response.messages.push(i18next.t('auth.passwordIsTooLong'))
        }

        return response
    }
}
