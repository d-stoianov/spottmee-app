import { User } from '@/services/AuthService/types.ts'
import defaultUserPicture from '@/assets/defaul-user-picture.jpg'

type AvatarProps = {
    user: User
    size?: number
    onClick?: () => void
    disabled?: boolean
}

const Avatar: React.FC<AvatarProps> = ({
    user,
    size = 36,
    onClick,
    disabled = false,
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                cursor: disabled
                    ? 'default'
                    : onClick !== undefined
                      ? 'pointer'
                      : 'default',
            }}
            disabled={disabled}
        >
            <img
                src={user?.picture ? user.picture : defaultUserPicture}
                className={'rounded-full object-cover'}
                style={{ height: `${size}px`, width: `${size}px` }}
                alt={user?.name}
            />
        </button>
    )
}

export default Avatar
