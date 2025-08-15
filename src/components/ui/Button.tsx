import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

import googleLogo from '@/assets/google-logo.svg'
import { Typography } from '@/components/ui/Typography'
import { useTranslation } from 'react-i18next'

type ButtonProps = {
    variant?: 'primary' | 'transparent'
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
                    'flex h-[3.5rem] w-fit items-center justify-center rounded-[1.25rem] text-center shadow-[inset_0_4px_4px_0_rgba(255,255,255,0.35)]',
                    {
                        'bg-primary disabled:bg-blue-300':
                            variant === 'primary',
                        'border border-primary bg-transparent':
                            variant === 'transparent',
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
                    'flex h-[3.5rem] w-fit items-center justify-between rounded-[1.25rem] border border-primary bg-transparent px-[1.75rem] text-center shadow-[inset_0_4px_4px_0_rgba(255,255,255,0.35)]',
                    className
                )
            )}
            {...rest}
        >
            {integrationLogo && (
                <img className="h-[1.375rem]" src={integrationLogo} />
            )}
            <Typography className="text-[#0E0E10]" variant="buttonText">
                {t('auth.continueWithIntegration', {
                    integration,
                })}
            </Typography>
            <span></span>
        </button>
    )
}

export default Button
