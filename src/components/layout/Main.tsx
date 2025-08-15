import clsx from 'clsx'

type MainProps = React.HTMLAttributes<HTMLElement> & {
    children: React.ReactNode
}

const Main: React.FC<MainProps> = ({ className, children, ...props }) => {
    return (
        <main className={clsx('p-4 md:p-8', className)} {...props}>
            {children}
        </main>
    )
}

export default Main
