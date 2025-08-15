import clsx from 'clsx'

type HeaderProps = React.HTMLAttributes<HTMLElement>

const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
    return (
        <header
            className={clsx('h-[4rem] w-full bg-base', className)}
            {...props}
        />
    )
}

export default Header
