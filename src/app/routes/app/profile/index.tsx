import Main from '@/components/layout/Main'
import { Typography } from '@/components/ui/Typography'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/providers/AuthProvider.tsx'
import Avatar from '@/features/profile/Avatar.tsx'
import { LucideKey, LucideLogOut, LucideMail } from 'lucide-react'
import LabelInput from '@/components/ui/LabelInput.tsx'
import { useState } from 'react'

const ProfileRoute: React.FC = () => {
    const { user, signOut, deleteAccount } = useAuth()

    const [isDeleting, setIsDeleting] = useState(false)

    const { t } = useTranslation()

    const handleDeleting = async () => {
        try {
            setIsDeleting(true)
            await deleteAccount()
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    if (!user) return null

    return (
        <Main className="flex w-full flex-col items-center py-[2rem] md:px-[8rem] md:py-[4rem]">
            <div className={'flex w-full flex-col items-center lg:w-fit'}>
                <div
                    className={
                        'mb-[4rem] flex flex-col items-center justify-center gap-4'
                    }
                >
                    <Avatar user={user} size={100} />
                    <Typography className={'text-white'} variant={'bodyLarge'}>
                        {user?.name}
                    </Typography>
                </div>
                <div
                    className={
                        'mb-[2rem] flex w-full flex-col items-center justify-center gap-4 lg:w-[32rem]'
                    }
                >
                    <LabelInput
                        icon={<LucideMail />}
                        label={t('profile.email')}
                        value={user?.email}
                    />
                    <LabelInput
                        icon={<LucideKey />}
                        label={t('profile.password')}
                        value={'****************'}
                        onClick={() => {}}
                    />
                </div>

                {/*<Divider className={'mb-[2rem]'} />*/}
                <button
                    className={
                        'mb-[4rem] flex items-center justify-center gap-2'
                    }
                    onClick={signOut}
                >
                    <Typography className={'text-white'} variant={'bodyLarge'}>
                        {t('profile.logout')}
                    </Typography>
                    <LucideLogOut className={'text-white'} size={20} />
                </button>
                <button onClick={handleDeleting} disabled={isDeleting}>
                    <Typography
                        className={'text-[#E06459]'}
                        variant={'bodyDefault'}
                    >
                        {t('profile.deleteYourAccount')}
                    </Typography>
                </button>
            </div>
        </Main>
    )
}

export default ProfileRoute
