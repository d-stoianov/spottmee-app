import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthFormValidationService } from './AuthFormValidationService'
import Input from '@/components/ui/Input'
import { Key, Mail, Pencil } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'

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

    const [submitDisabled, setSubmitDisabled] = useState<boolean>(false)

    const { t } = useTranslation()

    const validateFormData = (): boolean => {
        // validate each field
        const { validateName, validateEmail, validatePassword } =
            authFormValidationService

        const nameResponse = validateName(name.trim())
        const emailResponse = validateEmail(email.trim())
        const passwordResponse = validatePassword(password.trim())

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
        <form className="flex w-full flex-col gap-[1rem]">
            <div className="mb-6 flex w-full flex-col items-center justify-center gap-4">
                {formType === 'SIGN_UP' && (
                    <div className="flex w-full flex-col gap-2">
                        <Input
                            type="text"
                            placeholder={t('auth.name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={{
                                icon: <Pencil />,
                                position: 'left',
                            }}
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
                    <Input
                        type="text"
                        placeholder={t('auth.email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={{
                            icon: <Mail />,
                            position: 'left',
                        }}
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
                    <Input
                        type="password"
                        placeholder={t('auth.password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={{
                            icon: <Key />,
                            position: 'left',
                        }}
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
            <Button
                onClick={async (e) => {
                    e.preventDefault()

                    if (validateFormData()) {
                        setSubmitDisabled(true)
                        await onSubmit({ name, email, password })
                        setSubmitDisabled(false)
                    }
                }}
                disabled={submitDisabled}
                className="w-full"
            >
                <Typography variant="buttonText" className="text-white">
                    {formType === 'SIGN_IN'
                        ? t('auth.login')
                        : t('auth.createAccount')}
                </Typography>
            </Button>
        </form>
    )
}

export default AuthForm
