import { cloneElement } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

type IconPosition = 'left' | 'right'

type InputProps = {
    variant?: 'primary' | 'white'
    icon?: {
        icon: React.ReactElement
        position?: IconPosition
        onClick?: () => any
    }
    className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({
    variant = 'primary',
    icon,
    className,
    ...rest
}) => {
    return (
        <div
            className={twMerge(
                clsx(
                    'flex h-[3rem] w-full items-center gap-2 rounded-[1.25rem] border px-[1rem]',
                    {
                        'border-primary': variant === 'primary',
                        'border-white': variant === 'white',
                    },
                    className
                )
            )}
        >
            {icon && icon.position === 'left' && (
                <button onClick={icon.onClick}>
                    {cloneElement(icon.icon, {
                        className: clsx('', {
                            'text-secondary': variant === 'primary',
                            'text-white': variant === 'white',
                        }),
                        size: '1.375rem',
                    })}
                </button>
            )}

            <input
                className={clsx(
                    'w-full bg-transparent font-plusJakarta text-[1rem] font-[300] leading-[150%] outline-none',
                    {
                        'text-secondary placeholder-secondary':
                            variant === 'primary',
                        'text-white placeholder-white': variant === 'white',
                    }
                )}
                {...rest}
            />

            {icon && icon.position === 'right' && (
                <button onClick={icon.onClick}>
                    {cloneElement(icon.icon, {
                        className: clsx('', {
                            'text-secondary': variant === 'primary',
                            'text-white': variant === 'white',
                        }),
                        size: '1.375rem',
                    })}
                </button>
            )}
        </div>
    )
}

export default Input
