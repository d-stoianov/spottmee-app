import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type MainProps = React.HTMLAttributes<HTMLElement> & {
    children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ className, children, ...props }) => {
    return (
        <main className={twMerge(clsx('p-4 md:p-8 flex-1', className))} {...props}>
            {children}
        </main>
    )
}

export default Main
