import { EventService } from '@/services/EventService'
import { createContext, useContext } from 'react'

interface AppProviderProps {
    children: React.ReactNode
}

type AppContext = {
    eventService: EventService
}

const AppContext = createContext<AppContext | undefined>(undefined)

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const eventService = new EventService()

    return (
        <AppContext.Provider
            value={{
                eventService,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error('useApp cannot be called outside AppContext')
    }

    return context
}
