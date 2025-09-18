import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import logo from '@/assets/logo.svg'
import { useAuth } from '@/providers/AuthProvider'
import { useNavigate } from 'react-router-dom'
import Avatar from '@/features/profile/Avatar.tsx'

type HeaderProps = React.HTMLAttributes<HTMLElement>

const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
    const { user } = useAuth()

    const navigate = useNavigate()

    return (
        <header
            className={twMerge(
                clsx(
                    'fixed left-0 top-0 z-50 flex h-[4rem] w-full items-center justify-between bg-base px-[2rem] lg:px-[5rem]',
                    className
                )
            )}
            {...props}
        >
            <button onClick={() => navigate('/')}>
                <img className="mt-[0.5rem] h-[2.5rem]" src={logo} />
            </button>

            {user && (
                <Avatar
                    user={user}
                    onClick={() => navigate('/profile')}
                    size={36}
                />
            )}
        </header>
    )
}

export default Header
