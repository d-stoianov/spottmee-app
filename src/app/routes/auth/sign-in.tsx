import AuthForm, { AuthFormData } from '@/features/auth/AuthForm'
import { useAuth } from '@/providers/AuthProvider'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const SignInRoute: React.FC = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const { signIn } = useAuth()

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
        <main className="flex h-screen w-full justify-center bg-gray-100 px-6 py-8">
            <div className="flex h-fit w-full flex-col items-center justify-center rounded-xl bg-white p-8 shadow-md sm:mt-14 sm:w-[450px]">
                {/* header */}
                <div className="mb-4 flex w-full flex-col items-center">
                    <h1 className="font-comfortaa text-xl font-bold">
                        {t('auth.signIn')}
                    </h1>
                </div>

                <AuthForm formType="SIGN_IN" onSubmit={onSubmit} />

                {/* subtext */}
                <div>
                    <p className="inline-block">
                        {t('auth.dontHaveAnAccount')}
                    </p>{' '}
                    <Link to={'/sign-up'} className="text-blue-600">
                        {t('auth.createOne')}
                    </Link>
                </div>

                {/* error message */}
                <p className="mt-1 h-4 font-comfortaa text-sm text-red-500">
                    {signInErrorMessage}
                </p>
            </div>
        </main>
    )
}

export default SignInRoute
