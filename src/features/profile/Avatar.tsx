import { User } from '@/services/AuthService/types.ts'
import defaultUserPicture from '@/assets/defaul-user-picture.jpg'

type AvatarProps = {
    user: User
    size?: number
    onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 36, onClick }) => {
    return (
        <button onClick={onClick}>
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
