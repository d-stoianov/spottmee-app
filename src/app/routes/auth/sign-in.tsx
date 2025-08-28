import Main from '@/components/layout/Main'
import { IntegrationButton } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'
import AuthForm, { AuthFormData } from '@/features/auth/AuthForm'
import useIsMobile from '@/hooks/useIsMobile'
import { useAuth } from '@/providers/AuthProvider'
import { SignInProvider } from '@/services/AuthService/types'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const SignInRoute: React.FC = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()
    const isMobile = useIsMobile()

    const { signIn, signInWithProvider } = useAuth()

    const [signInErrorMessage, setSignInErrorMessage] = useState<string>('')

    const onSubmit = async (formData: AuthFormData) => {
        const { email, password } = formData
        setSignInErrorMessage('')

        try {
            await signIn(email, password)
            navigate('/')
        } catch (error) {
            let translationKey = 'auth.unexpectedError'

            if (error instanceof FirebaseError) {
                translationKey = `auth.errors.${error.code}`
            }

            const translated = t(translationKey)
            const isTranslationMissing = translated === translationKey

            setSignInErrorMessage(
                isTranslationMissing
                    ? `${t('auth.unexpectedError')} (${translationKey})`
                    : translated
            )
        }
    }

    return (
        <Main className="flex w-full justify-center px-6 py-8">
            <div className="mt-[6rem] w-[30rem]">
                {/* header */}
                <div className="mb-[5rem] flex w-full flex-col items-center">
                    <Typography variant={isMobile ? "heading2" : "heading1"}>
                        {t('auth.login')}
                    </Typography>
                </div>

                {/* error message */}
                <div className="mb-[1rem] h-4">
                    <p className="text-sm text-red-500">{signInErrorMessage}</p>
                </div>

                <AuthForm formType="SIGN_IN" onSubmit={onSubmit} />

                {/* sign in providers */}
                <div className="mt-[1rem]">
                    <IntegrationButton
                        onClick={async () => {
                            await signInWithProvider(SignInProvider.Google)
                        }}
                        className="w-full"
                        integration="Google"
                    />
                </div>

                {/* subtext */}
                <div className="mt-[1rem] text-center">
                    <Typography
                        className="inline-block text-secondary"
                        variant="bodyDefault"
                    >
                        {t('auth.newOnSpottmee')}
                    </Typography>{' '}
                    <Link to={'/sign-up'}>
                        <Typography
                            className="inline-block text-accent"
                            variant="bodyDefault"
                        >
                            {t('auth.createAccount')}
                        </Typography>
                    </Link>
                </div>
            </div>
        </Main>
    )
}

export default SignInRoute
