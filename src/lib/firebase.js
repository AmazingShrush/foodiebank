// src/lib/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { initializeFirestore, setLogLevel } from 'firebase/firestore'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

// ✅ force long-polling (fixes 400s on some networks)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
})

export const auth = getAuth(app)

// quiet logs now that things work (set to 'debug' if you need)
setLogLevel('error')

export async function ensureAnonAuth() {
  if (!auth.currentUser) await signInAnonymously(auth)
}
