import AuthForm, { AuthFormData } from '@/features/auth/AuthForm'
import { useAuth } from '@/providers/AuthProvider'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const SignUpRoute: React.FC = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const { signUp } = useAuth()

    const onSubmit = async (formData: AuthFormData) => {
        const { name, email, password } = formData

        await signUp(name, email, password)
        navigate('/')
    }

    return (
        <main className="flex h-screen w-full justify-center bg-gray-100 px-6 py-8">
            <div className="flex h-fit w-full flex-col items-center justify-center rounded-xl bg-white p-8 shadow-md sm:mt-14 sm:w-[450px]">
                {/* header */}
                <div className="mb-4 flex w-full flex-col items-center">
                    <h1 className="font-comfortaa text-xl font-bold">
                        {t('auth.signUp')}
                    </h1>
                </div>

                <AuthForm formType="SIGN_UP" onSubmit={onSubmit} />

                {/* subtext */}
                <div>
                    <p className="inline-block">
                        {t('auth.alreadyHaveAnAccount')}
                    </p>{' '}
                    <Link to={'/sign-in'} className="text-blue-600">
                        {t('auth.signIn')}
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default SignUpRoute
