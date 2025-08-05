import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  onSnapshot, 
  runTransaction,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'

export interface BreakoutSession {
  id: string
  title: string
  capacity: number
  registered: number
  registrations: { [userId: string]: { name: string, email: string, timestamp: Timestamp } }
}

export interface UserProfile {
  uid: string
  name: string
  badgeName: string
  email?: string
  dietary?: string
  registeredSessions: string[]
  lunchTableTopic?: string
  notifications: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Initialize breakout sessions in Firebase
export const initializeBreakoutSessions = async () => {
  const sessions = [
    {
      id: '11',
      title: 'Breakout #1: Finding Common Threads: Using Experiential Mind/Body Approaches to Address Sexual Challenges',
      capacity: 50,
      registered: 0,
      registrations: {}
    },
    {
      id: '12',
      title: 'Breakout #2: Fundamentals of Neuroplastic Pain Syndrome',
      capacity: 50,
      registered: 0,
      registrations: {}
    },
    {
      id: '13',
      title: 'Breakout #3: Embody Your Message',
      capacity: 50,
      registered: 0,
      registrations: {}
    }
  ]

  try {
    for (const session of sessions) {
      const sessionRef = doc(db, 'breakoutSessions', session.id)
      const sessionDoc = await getDoc(sessionRef)
      
      // Only initialize if the session doesn't exist
      if (!sessionDoc.exists()) {
        await setDoc(sessionRef, {
          ...session,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        })
        console.log(`Initialized session ${session.id}`)
      }
    }
  } catch (error) {
    console.error('Error initializing sessions:', error)
    throw error
  }
}

// Register user for a breakout session
export const registerForBreakoutSession = async (userId: string, sessionId: string, userInfo: { name: string, email: string }) => {
  console.log('Attempting to register user:', userId, 'for session:', sessionId, 'with info:', userInfo)
  try {
    const result = await runTransaction(db, async (transaction) => {
      const sessionRef = doc(db, 'breakoutSessions', sessionId)
      const userRef = doc(db, 'users', userId)
      
      const sessionDoc = await transaction.get(sessionRef)
      const userDoc = await transaction.get(userRef)
      
      if (!sessionDoc.exists()) {
        throw new Error('Session not found')
      }
      
      let userData: UserProfile
      
      if (!userDoc.exists()) {
        // Create user if they don't exist in Firebase yet
        console.log('User does not exist in Firebase, creating new user:', userId)
        userData = {
          uid: userId,
          name: userInfo.name,
          badgeName: userInfo.name,
          email: userInfo.email,
          registeredSessions: [],
          notifications: false,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        }
        transaction.set(userRef, userData)
      } else {
        console.log('User exists in Firebase:', userId)
        userData = userDoc.data() as UserProfile
      }
      
      const sessionData = sessionDoc.data() as BreakoutSession
      
      // Check if session is full
      if (sessionData.registered >= sessionData.capacity) {
        throw new Error('Session is full')
      }
      
      // Check if user is already registered
      if (sessionData.registrations[userId]) {
        throw new Error('User already registered for this session')
      }
      
      // Check if user has reached max registrations (3)
      if (userData.registeredSessions.length >= 3) {
        throw new Error('User has reached maximum registrations (3)')
      }
      
      // Update session
      const newRegistrations = {
        ...sessionData.registrations,
        [userId]: {
          name: userInfo.name,
          email: userInfo.email,
          timestamp: Timestamp.now()
        }
      }
      
      transaction.update(sessionRef, {
        registered: increment(1),
        registrations: newRegistrations,
        updatedAt: Timestamp.now()
      })
      
      // Update user
      transaction.update(userRef, {
        registeredSessions: [...userData.registeredSessions, sessionId],
        updatedAt: Timestamp.now()
      })
      
      return { success: true }
    })
    
    return result
  } catch (error) {
    console.error('Error registering for session:', error)
    throw error
  }
}

// Unregister user from a breakout session
export const unregisterFromBreakoutSession = async (userId: string, sessionId: string) => {
  try {
    const result = await runTransaction(db, async (transaction) => {
      const sessionRef = doc(db, 'breakoutSessions', sessionId)
      const userRef = doc(db, 'users', userId)
      
      const sessionDoc = await transaction.get(sessionRef)
      const userDoc = await transaction.get(userRef)
      
      if (!sessionDoc.exists()) {
        throw new Error('Session not found')
      }
      
      if (!userDoc.exists()) {
        throw new Error('User not found - cannot unregister')
      }
      
      const sessionData = sessionDoc.data() as BreakoutSession
      const userData = userDoc.data() as UserProfile
      
      // Check if user is registered for this session
      if (!sessionData.registrations[userId]) {
        throw new Error('User not registered for this session')
      }
      
      // Update session
      const newRegistrations = { ...sessionData.registrations }
      delete newRegistrations[userId]
      
      transaction.update(sessionRef, {
        registered: increment(-1),
        registrations: newRegistrations,
        updatedAt: Timestamp.now()
      })
      
      // Update user
      transaction.update(userRef, {
        registeredSessions: userData.registeredSessions.filter(id => id !== sessionId),
        updatedAt: Timestamp.now()
      })
      
      return { success: true }
    })
    
    return result
  } catch (error) {
    console.error('Error unregistering from session:', error)
    throw error
  }
}

// Get real-time session data
export const subscribeToSessionData = (callback: (sessions: { [key: string]: BreakoutSession }) => void) => {
  const sessionsRef = collection(db, 'breakoutSessions')
  
  return onSnapshot(sessionsRef, (snapshot) => {
    const sessions: { [key: string]: BreakoutSession } = {}
    
    snapshot.forEach((doc) => {
      sessions[doc.id] = { id: doc.id, ...doc.data() } as BreakoutSession
    })
    
    callback(sessions)
  }, (error) => {
    console.error('Error listening to session updates:', error)
  })
}

// Create or update user profile
export const createOrUpdateUserProfile = async (userId: string, profileData: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (userDoc.exists()) {
      // Update existing user
      await updateDoc(userRef, {
        ...profileData,
        updatedAt: Timestamp.now()
      })
    } else {
      // Create new user
      await setDoc(userRef, {
        uid: userId,
        registeredSessions: [],
        notifications: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        ...profileData
      })
    }
  } catch (error) {
    console.error('Error creating/updating user profile:', error)
    throw error
  }
}

// Get user profile
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (userDoc.exists()) {
      return { uid: userId, ...userDoc.data() } as UserProfile
    }
    
    return null
  } catch (error) {
    console.error('Error getting user profile:', error)
    throw error
  }
}