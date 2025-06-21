import AuthForm, { AuthFormData } from '@/features/auth/AuthForm'
import { useAuth } from '@/providers/AuthProvider'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const SignInRoute: React.FC = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const { signIn } = useAuth()

    const onSubmit = async (formData: AuthFormData) => {
        const { email, password } = formData
        await signIn(email, password)
        navigate('/')
    }

    return (
        <main className="flex h-screen w-full justify-center bg-gray-100 px-6 py-8">
            <div className="flex h-fit w-full flex-col items-center justify-center rounded-xl bg-white p-8 shadow-md sm:w-[450px] sm:mt-14">
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
            </div>
        </main>
    )
}

export default SignInRoute
