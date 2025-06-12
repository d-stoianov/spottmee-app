import { AppProvider } from './provider'
import AppRouter from './router'

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}

export default App
