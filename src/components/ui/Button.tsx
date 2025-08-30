import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

import googleLogo from '@/assets/google-logo.svg'
import { Typography } from '@/components/ui/Typography'
import { useTranslation } from 'react-i18next'

type ButtonProps = {
    variant?: 'primary' | 'transparent' | 'danger'
    children?: React.ReactNode
    className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className,
    ...rest
}) => {
    return (
        <button
            className={twMerge(
                clsx(
                    'flex w-fit items-center justify-center rounded-[1.25rem] px-6 py-3.5 text-center shadow-md',
                    {
                        'bg-primary disabled:bg-blue-300':
                            variant === 'primary',
                        'border border-primary bg-transparent':
                            variant === 'transparent',
                        'bg-red-500 disabled:bg-red-300': variant === 'danger',
                    },
                    className
                )
            )}
            {...rest}
        >
            {children}
        </button>
    )
}

type IntegrationButtonProps = {
    integration: 'Google' // TODO: add more
    className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const IntegrationButton: React.FC<IntegrationButtonProps> = ({
    integration,
    className,
    ...rest
}) => {
    const { t } = useTranslation()

    const integrationLogo = (() => {
        switch (integration) {
            case 'Google':
                return googleLogo
            default:
                return null
        }
    })()

    return (
        <button
            className={twMerge(
                clsx(
                    'flex px-6 py-3 w-fit items-center justify-between rounded-[1.25rem] border border-primary bg-transparent text-center',
                    className
                )
            )}
            {...rest}
        >
            {integrationLogo && (
                <img className="h-[1.375rem]" src={integrationLogo} />
            )}
            <Typography className='text-white' variant="buttonText">
                {t('auth.continueWithIntegration', {
                    integration,
                })}
            </Typography>
            <span></span>
        </button>
    )
}

export default Button
