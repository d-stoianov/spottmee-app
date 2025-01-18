import { Route, Routes } from 'react-router'

import Home from '@/pages/Home'
import EventPage from '@/pages/Event'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/event/:id" index element={<EventPage />} />
        </Routes>
    )
}

export default AppRoutes
