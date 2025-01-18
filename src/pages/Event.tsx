import PageLayout from '@/layout/PageLayout'
import { useParams } from 'react-router-dom'

const EventPage = () => {
    const { id: eventId } = useParams()

    return <PageLayout>{eventId}</PageLayout>
}

export default EventPage
