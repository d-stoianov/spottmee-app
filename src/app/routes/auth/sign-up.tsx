import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import AuthForm, { AuthFormData } from '@/features/auth/AuthForm'
import { useAuth } from '@/providers/AuthProvider'
import { AuthErrorResponse } from '@/services/AuthService/types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const SignUpRoute: React.FC = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const { signUp } = useAuth()

    const [signUpErrorMessage, setSignUpErrorMessage] = useState<string>('')

    const onSubmit = async (formData: AuthFormData) => {
        const { name, email, password } = formData
        setSignUpErrorMessage('')

        try {
            await signUp(name, email, password)
            navigate('/')
        } catch (error: unknown) {
            const authErrorResponse = error as AuthErrorResponse
            const translationKey = `auth.errors.${authErrorResponse.code}`
            const translated = t(translationKey)

            const isTranslationMissing = translated === translationKey

            setSignUpErrorMessage(
                isTranslationMissing
                    ? `${t('auth.unexpectedSignUpError')}`
                    : translated
            )
        }
    }

    return (
        <Main className="flex w-full justify-center px-6 py-8">
            <div className="mt-[6rem] w-[30rem]">
                {/* header */}
                <div className="mb-[5rem] flex w-full flex-col items-center">
                    <Typography variant="heading1">
                        {t('auth.createAccount')}
                    </Typography>
                </div>

                {/* error message */}
                <div className="mb-[1rem] h-4">
                    <p className="text-sm text-red-500">{signUpErrorMessage}</p>
                </div>

                <AuthForm formType="SIGN_UP" onSubmit={onSubmit} />

                {/* subtext */}
                <div className="mt-[1rem] text-center">
                    <Typography
                        className="inline-block text-secondary"
                        variant="bodyDefault"
                    >
                        {t('auth.alreadyHaveAnAccount')}
                    </Typography>{' '}
                    <Link to={'/sign-in'}>
                        <Typography
                            className="inline-block text-accent"
                            variant="bodyDefault"
                        >
                            {t('auth.login')}
                        </Typography>
                    </Link>
                </div>
            </div>
        </Main>
    )
}

export default SignUpRoute
