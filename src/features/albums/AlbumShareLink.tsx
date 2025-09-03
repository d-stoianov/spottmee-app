import Input from '@/components/ui/Input'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

type AlbumShareLinkProps = {
    albumId: string
}

const AlbumShareLink: React.FC<AlbumShareLinkProps> = ({ albumId }) => {
    const [showCopiedIcon, setShowCopiedIcon] = useState<boolean>(false)

    const albumUrl = `${window.origin}/spot/${albumId}`

    return (
        <Input
            value={albumUrl}
            variant="white"
            disabled
            icon={{
                icon: showCopiedIcon ? <Check /> : <Copy />,
                position: 'right',
                onClick: async () => {
                    await window.navigator.clipboard.writeText(albumUrl)
                    setShowCopiedIcon(true)
                    setTimeout(() => setShowCopiedIcon(false), 1500)
                },
            }}
        />
    )
}

export default AlbumShareLink
