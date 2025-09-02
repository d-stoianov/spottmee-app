import PageLayout from '@/components/layout/PageLayout'
import Main from '@/components/layout/Main'
import { useTranslation } from 'react-i18next'
import { Typography } from '@/components/ui/Typography'

const LoadingPage = () => {
    const { t } = useTranslation()

    return (
        <PageLayout>
            <Main className="flex items-center justify-center">
                <Typography className="text-secondary" variant="bodyLarge">
                    {t('general.loading')}
                </Typography>
            </Main>
        </PageLayout>
    )
}

export default LoadingPage
