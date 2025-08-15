import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type HeaderProps = React.HTMLAttributes<HTMLElement>

const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
    return (
        <header
            className={twMerge(clsx('h-[4rem] w-full bg-base', className))}
            {...props}
        />
    )
}

export default Header
