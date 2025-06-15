import { useAuth } from '@/providers/AuthProvider'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignInRoute: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    const { signIn } = useAuth()

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await signIn(email, password)
        navigate('/')
    }

    return (
        <main className="flex h-screen w-full justify-center bg-gray-100">
            <form className="mt-14 flex h-fit w-fit flex-col items-center justify-center rounded-xl bg-white p-8 shadow-md">
                <div className="mb-4 flex w-[450px] flex-col items-center">
                    <h1 className="font-comfortaa text-xl font-bold">
                        Sign in to Spottmee
                    </h1>
                </div>
                <div className="mb-6 flex w-full flex-col items-center justify-center gap-2">
                    <input
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border bg-gray-100 px-1.5 py-1"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border bg-gray-100 px-1.5 py-1"
                    />
                </div>
                <button
                    onClick={onSubmit}
                    className="mb-2 w-full rounded-xl bg-blue-600 py-2.5 text-white"
                >
                    Continue
                </button>
                <div>
                    <p className="inline-block">Don't have an account ?</p>{' '}
                    <Link to={'/sign-up'} className="text-blue-600">
                        Create one
                    </Link>
                </div>
            </form>
        </main>
    )
}

export default SignInRoute
