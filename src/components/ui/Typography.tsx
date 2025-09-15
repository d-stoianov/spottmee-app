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
    children?: React.ReactNode
    variant?: TypographyVariant
    className?: string
    dangerouslySetInnerHTML?: { __html: string }
}

const variantClasses: Record<TypographyVariant, string> = {
    heading1: 'font-plusJakarta font-[700] text-[3rem] leading-[100%]',
    heading2: 'font-plusJakarta font-[600] text-[2.25rem] leading-[100%]',
    heading3: 'font-plusJakarta font-[500] text-[1.75rem] leading-[100%]',
    bodyLarge: 'font-plusJakarta font-[400] text-[1.25rem] leading-[150%]',
    bodyDefault: 'font-plusJakarta font-[400] text-[1rem] leading-[150%]',
    buttonText: 'font-plusJakarta font-[500] text-[1.25rem] leading-[100%]',
    smallText: 'font-plusJakarta font-[300] text-[0.75rem] leading-[150%]',
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
    dangerouslySetInnerHTML
}) => {
    const Component = variantTag[variant]
    return (
        <Component
            className={twMerge(clsx(variantClasses[variant], className))}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        >
            {children}
        </Component>
    )
}
