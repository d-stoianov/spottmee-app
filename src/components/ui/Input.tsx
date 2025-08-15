import { cloneElement } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

type InputProps = {
    variant?: 'light' | 'dark'
    icon?: React.ReactElement
    className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({
    variant = 'dark',
    icon,
    className,
    ...rest
}) => {
    return (
        <div
            className={twMerge(
                clsx(
                    'flex h-[3rem] w-full items-center gap-2 rounded-[1.25rem] border border-primary px-[1rem]',
                    className
                )
            )}
        >
            {icon &&
                cloneElement(icon, {
                    className: 'text-secondary',
                    size: '1.375rem',
                })}
            <input
                className="w-full bg-transparent font-plusJakartaSans text-[1rem] font-[300] leading-[150%] text-secondary placeholder-secondary outline-none"
                {...rest}
            />
        </div>
    )
}

export default Input
