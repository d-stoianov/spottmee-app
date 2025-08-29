import i18next from 'i18next'

 type AuthFormValidationResponse = {
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
            response.messages.push(i18next.t('auth.validation.nameIsEmpty'))
            return response
        }

        if (name.length < MIN_NAME_LENGTH) {
            response.isValid = false
            response.messages.push(i18next.t('auth.validation.nameIsTooShort'))
        }

        if (name.length > MAX_NAME_LENGTH) {
            response.isValid = false
            response.messages.push(i18next.t('auth.validation.nameIsTooLong'))
        }

        if (name.split(' ').length > 1) {
            response.isValid = false
            response.messages.push(i18next.t('auth.validation.nameShouldBeOneWord'))
        }

        return response
    }

    public validateEmail(email: string): AuthFormValidationResponse {
        const EMAIL_REGEX = new RegExp('^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$')

        const response: AuthFormValidationResponse = {
            isValid: true,
            messages: [],
        }

        if (email.length === 0) {
            response.isValid = false
            response.messages.push(i18next.t('auth.validation.emailIsEmpty'))
            return response
        }

        if (!EMAIL_REGEX.test(email)) {
            response.isValid = false
            response.messages.push(i18next.t('auth.validation.incorrectEmailFormat'))
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
            response.messages.push(i18next.t('auth.validation.passwordIsEmpty'))
            return response
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            response.isValid = false
            response.messages.push(i18next.t('auth.validation.passwordShoulBe8Chars'))
        }

        if (password.length > MAX_PASSWORD_LENGTH) {
            response.isValid = false
            response.messages.push(i18next.t('auth.validation.passwordIsTooLong'))
        }

        if (!/[a-zA-Z]/.test(password)) {
            response.isValid = false
            response.messages.push(i18next.t('auth.validation.passwordMustContainLetter'))
        }

        if (!/\d/.test(password)) {
            response.isValid = false
            response.messages.push(i18next.t('auth.validation.passwordMustContainDigit'))
        }

        return response
    }
}
