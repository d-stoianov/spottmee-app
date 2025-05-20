import { Route, Routes } from 'react-router'

import Home from '@/pages/Home'
import EventPage from '@/pages/Event'
import CompareResultPage from '@/pages/CompareResult'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/event" index element={<EventPage />} />
            <Route path="/event/:id" index element={<EventPage />} />
            <Route
                path="/event/:id/:compareKey"
                index
                element={<CompareResultPage />}
            />
        </Routes>
    )
}

export default AppRoutes
