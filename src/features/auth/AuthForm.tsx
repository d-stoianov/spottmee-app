import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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

const AuthForm: React.FC<AuthFormProps> = ({ formType, onSubmit }) => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { t } = useTranslation()

    return (
        <form className="flex w-full flex-col">
            <div className="mb-6 flex w-full flex-col items-center justify-center gap-2">
                {formType === 'SIGN_UP' && (
                    <input
                        type="text"
                        placeholder={t('auth.name')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border bg-gray-100 px-1.5 py-1"
                    />
                )}
                <input
                    type="text"
                    placeholder={t('auth.email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border bg-gray-100 px-1.5 py-1"
                />
                <input
                    type="password"
                    placeholder={t('auth.password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border bg-gray-100 px-1.5 py-1"
                />
            </div>
            <button
                onClick={async (e) => {
                    e.preventDefault()
                    await onSubmit({ name, email, password })
                }}
                className="mb-2 w-full rounded-xl bg-blue-600 py-2.5 text-white"
            >
                {formType === 'SIGN_IN' ? t('auth.continue') : t('auth.signUp')}
            </button>
        </form>
    )
}

export default AuthForm
