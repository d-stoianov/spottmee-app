import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import { useAuth } from '@/providers/AuthProvider'

const HomeRoute: React.FC = () => {
    const { user, signOut } = useAuth()

    return (
        <Main>
            <Typography variant="heading2">Home</Typography>
            <Typography variant="bodyDefault">{user?.email}</Typography>

            <button onClick={() => signOut()}>logout</button>
        </Main>
    )
}

export default HomeRoute
