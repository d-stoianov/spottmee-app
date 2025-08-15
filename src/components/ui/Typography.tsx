import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type TypographyVariant =
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'bodyLarge'
    | 'bodyDefault'
    | 'buttonText'
    | 'smallText'

type TypographyProps = {
    children: React.ReactNode
    variant?: TypographyVariant
    className?: string
}

const variantClasses: Record<TypographyVariant, string> = {
    heading1: 'font-plusJakartaSans text-[48px] leading-[100%]',
    heading2: 'font-plusJakartaSans text-[36px] leading-[100%]',
    heading3: 'font-plusJakartaSans text-[28px] leading-[100%]',
    bodyLarge: 'font-plusJakartaSans text-[20px] leading-[100%]',
    bodyDefault: 'font-plusJakartaSans text-[16px] leading-[100%]',
    buttonText: 'font-plusJakartaSans text-[20px] leading-[100%]',
    smallText: 'font-plusJakartaSans text-[12px] leading-[100%]',
}

const variantTag: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
    heading1: 'h1',
    heading2: 'h2',
    heading3: 'h3',
    bodyLarge: 'p',
    bodyDefault: 'p',
    buttonText: 'span',
    smallText: 'span',
}

export const Typography: React.FC<TypographyProps> = ({
    children,
    variant = 'bodyDefault',
    className,
}) => {
    const Component = variantTag[variant]
    return (
        <Component
            className={twMerge(clsx(variantClasses[variant], className))}
        >
            {children}
        </Component>
    )
}
