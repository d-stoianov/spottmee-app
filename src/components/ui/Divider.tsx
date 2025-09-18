import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

type DividerProps = {
    className?: string
}

const Divider: React.FC<DividerProps> = ({ className }) => {
    return (
        <div
            className={twMerge(
                clsx('h-[0.0625rem] w-full bg-highLight opacity-20', className)
            )}
        ></div>
    )
}

export default Divider
