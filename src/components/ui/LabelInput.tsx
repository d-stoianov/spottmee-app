import { cloneElement } from 'react'
import { LucidePencil } from 'lucide-react'
import { Typography } from '@/components/ui/Typography.tsx'

type LabelInputProps = {
    label?: string
    icon?: React.ReactElement
    value?: string
    onClick?: () => void
}

const LabelInput: React.FC<LabelInputProps> = ({
    label,
    icon,
    value,
    onClick,
}) => {
    return (
        <div
            className={
                'flex w-full items-start justify-between border-b-2 border-highLight border-opacity-15 pb-3'
            }
            onClick={onClick}
        >
            <div className={'flex flex-col gap-1'}>
                <div className="flex items-center gap-2">
                    {icon &&
                        cloneElement(icon, {
                            className: 'text-secondary',
                            size: 20,
                        })}
                    {label && (
                        <Typography
                            variant={'bodyDefault'}
                            className="text-secondary"
                        >
                            {label}
                        </Typography>
                    )}
                </div>

                <Typography variant={'bodyDefault'} className="text-white">
                    {value}
                </Typography>
            </div>

            {onClick && (
                <button className={'relative top-2'}>
                    <LucidePencil className={'text-secondary'} size={20} />
                </button>
            )}
        </div>
    )
}

export default LabelInput
