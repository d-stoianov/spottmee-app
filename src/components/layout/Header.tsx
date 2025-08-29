import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import logo from '@/assets/logo.svg'
import { useAuth } from '@/providers/AuthProvider'
import { Typography } from '@/components/ui/Typography'

type HeaderProps = React.HTMLAttributes<HTMLElement>

const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
    const { user, signOut } = useAuth()

    return (
        <header
            className={twMerge(
                clsx(
                    'fixed left-0 top-0 z-50 flex h-[4rem] w-full items-center justify-between bg-base px-[4rem]',
                    className
                )
            )}
            {...props}
        >
            <img className="mt-[0.5rem] h-[2.5rem]" src={logo} />

            {user && (
                <div className="flex items-center gap-2">
                    <Typography className="text-white" variant="bodyDefault">
                        {user?.email}
                    </Typography>
                    <button className="w-fit" onClick={() => signOut()}>
                        <Typography
                            className="text-white"
                            variant="bodyDefault"
                        >
                            logout
                        </Typography>
                    </button>
                </div>
            )}
        </header>
    )
}

export default Header
