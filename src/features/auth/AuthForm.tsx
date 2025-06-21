import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthFormValidationService } from './AuthFormValidationService'

type AuthFormType = 'SIGN_IN' | 'SIGN_UP'

export type AuthFormData = {
    name: string
    email: string
    password: string
}

interface AuthFormProps {
    formType: AuthFormType
    onSubmit: (formData: AuthFormData) => Promise<void>
}

const authFormValidationService = new AuthFormValidationService()

const AuthForm: React.FC<AuthFormProps> = ({ formType, onSubmit }) => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [nameValidationMessages, setNameValidationMessages] = useState<
        string[]
    >([])
    const [emailValidationMessages, setEmailValidationMessages] = useState<
        string[]
    >([])
    const [passwordValidationMessages, setPasswordValidationMessages] =
        useState<string[]>([])

    const { t } = useTranslation()

    const validateFormData = (): boolean => {
        // validate each field
        const { validateName, validateEmail, validatePassword } =
            authFormValidationService

        const nameResponse = validateName(name)
        const emailResponse = validateEmail(email)
        const passwordResponse = validatePassword(password)

        setNameValidationMessages(nameResponse.messages)
        setEmailValidationMessages(emailResponse.messages)
        setPasswordValidationMessages(passwordResponse.messages)

        // check if all fields are valid
        // if form type is sign up - check additional name field
        if (formType === 'SIGN_IN') {
            return emailResponse.isValid && passwordResponse.isValid
        }
        return (
            nameResponse.isValid &&
            emailResponse.isValid &&
            passwordResponse.isValid
        )
    }

    return (
        <form className="flex w-full flex-col">
            <div className="mb-6 flex w-full flex-col items-center justify-center gap-2">
                {formType === 'SIGN_UP' && (
                    <div className="flex w-full flex-col gap-2">
                        <input
                            type="text"
                            placeholder={t('auth.name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-md border bg-gray-100 px-1.5 py-1"
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
                )}
                <div className="flex w-full flex-col gap-2">
                    <input
                        type="text"
                        placeholder={t('auth.email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border bg-gray-100 px-1.5 py-1"
                    />
                    {emailValidationMessages.map((m, idx) => (
                        <p
                            key={idx}
                            className="font-comfortaa text-xs text-red-500"
                        >
                            {m}
                        </p>
                    ))}
                </div>
                <div className="flex w-full flex-col gap-2">
                    <input
                        type="password"
                        placeholder={t('auth.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border bg-gray-100 px-1.5 py-1"
                    />
                    {passwordValidationMessages.map((m, idx) => (
                        <p
                            key={idx}
                            className="font-comfortaa text-xs text-red-500"
                        >
                            {m}
                        </p>
                    ))}
                </div>
            </div>
            <button
                onClick={async (e) => {
                    e.preventDefault()

                    if (validateFormData()) {
                        await onSubmit({ name, email, password })
                    }
                }}
                className="mb-2 w-full rounded-xl bg-blue-600 py-2.5 text-white"
            >
                {formType === 'SIGN_IN' ? t('auth.continue') : t('auth.signUp')}
            </button>
        </form>
    )
}

export default AuthForm
