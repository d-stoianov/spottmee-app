import { createContext, useContext } from 'react'

interface AppProviderProps {
    children: React.ReactNode
}

type AppContext = {}

const AppContext = createContext<AppContext | undefined>(undefined)

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export const useApp = () => {
    const context = useContext(AppContext)

    if (!context) {
        throw new Error('useApp cannot be called outside AppContext')
    }

    return context
}
