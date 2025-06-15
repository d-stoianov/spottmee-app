import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfigStr = import.meta.env.VITE_FIREBASE_CONFIG_STR

if (!firebaseConfigStr) {
    throw new Error('No firebase config string provided')
}

const firebaseConfig = JSON.parse(firebaseConfigStr)

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
