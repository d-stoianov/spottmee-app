import React, { useState, useRef, useEffect } from 'react'
import { Typography } from '@/components/ui/Typography.tsx'

type InlineInputProps = {
    initialValue?: string
    onSave: (value: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

const InlineEdit: React.FC<InlineInputProps> = ({
    initialValue = '',
    onSave,
    ...rest
}) => {
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(initialValue)
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current?.focus()
        }
    }, [editing])

    const save = () => {
        setEditing(false)
        onSave(value)
    }

    return (
        <span>
            {editing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={save}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') save()
                        if (e.key === 'Escape') setEditing(false)
                    }}
                    className="m-0 w-auto border-none bg-transparent p-0 text-center font-plusJakarta text-[1.25rem] font-[400] leading-[150%] text-white outline-none"
                    {...rest}
                />
            ) : (
                <span
                    onClick={() => setEditing(true)}
                    className={'cursor-text'}
                >
                    <Typography className={'text-white'} variant={'bodyLarge'}>
                        {value || initialValue}
                    </Typography>
                </span>
            )}
        </span>
    )
}

export default InlineEdit
