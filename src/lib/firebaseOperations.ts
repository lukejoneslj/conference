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
    // Monday Sessions #4A-D (10:15 AM - 11:15 AM)
    {
      id: '14',
      title: 'Session #4A: Finding Common Threads: Using Experiential Mind/Body Approaches to Address Sexual Challenges',
      capacity: 50,
      registered: 0,
      registrations: {}
    },
    {
      id: '15',
      title: 'Session #4B: Fundamentals of Neuroplastic Pain Syndrome',
      capacity: 40,
      registered: 0,
      registrations: {}
    },
    {
      id: '16',
      title: 'Session #4C: Embody Your Message',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    {
      id: '17',
      title: 'Session #4D: Practical Somatics',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    // Monday Sessions #5A-D (11:30 AM - 12:30 PM)
    {
      id: '19',
      title: 'Session #5A: Does Postural Tachycardia Syndrome (POTS) reflect an error in our survival circuits?',
      capacity: 50,
      registered: 0,
      registrations: {}
    },
    {
      id: '20',
      title: 'Session #5B: Integrating Neuroplastic Principles and Treatment into Frontline Healthcare',
      capacity: 40,
      registered: 0,
      registrations: {}
    },
    {
      id: '21',
      title: 'Session #5C: Cultivating a Felt-Sense of Internal and External Safety to Heal Neuroplastic Symptoms',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    {
      id: '22',
      title: 'Session #5D: Brain-Mind-Body (BMB) Takeaways from 25 years of the Lightning Process (LP)',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    // Monday Sessions #6A-D (1:45 PM - 2:45 PM)
    {
      id: '24',
      title: 'Session #6A: Difficult Cases Seminar For Therapists',
      capacity: 50,
      registered: 0,
      registrations: {}
    },
    {
      id: '25',
      title: 'Session #6B: Targeting the Root Causes of Chronic Pain in Emotional Awareness and Expression Therapy',
      capacity: 40,
      registered: 0,
      registrations: {}
    },
    {
      id: '26',
      title: 'Session #6C: Science and Stories to Decode Chronic Fatigue',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    {
      id: '27',
      title: 'Session #6D: Practical Somatics',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    // Monday Sessions #7A-D (3:00 PM - 4:00 PM)
    {
      id: '29',
      title: 'Session #7A: Building a movement for change: What (Recovered) patients and professionals can achieve together',
      capacity: 50,
      registered: 0,
      registrations: {}
    },
    {
      id: '30',
      title: 'Session #7B: Introduction to EMDR therapy, Is it really that good?',
      capacity: 40,
      registered: 0,
      registrations: {}
    },
    {
      id: '31',
      title: 'Session #7C: How to Help Men with Pelvic & Sexual Issues (even the hard cases)',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    {
      id: '32',
      title: 'Session #7D: From Fear to Freedom: Teaching Patients to Trust Their Bodies Again',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    // Tuesday Sessions #10A-D (10:15 AM - 11:15 AM)
    {
      id: '44',
      title: 'Session #10A: An Experiential Emotion-Focused Approach to Understanding and Treating Psychogenic Non-Epileptic Attacks (PNEA)',
      capacity: 50,
      registered: 0,
      registrations: {}
    },
    {
      id: '45',
      title: 'Session #10B: Targeting the Root Causes of Chronic Pain in Emotional Awareness and Expression Therapy',
      capacity: 40,
      registered: 0,
      registrations: {}
    },
    {
      id: '46',
      title: 'Session #10C: Introduction to EMDR therapy, Is it really that good?',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    {
      id: '47',
      title: 'Session #10D: Brain-Mind-Body (BMB) Takeaways from 25 years of the Lightning Process (LP)',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    // Tuesday Sessions #11A-D (11:30 AM - 12:30 PM)
    {
      id: '49',
      title: 'Session #11A: Psychedelic Medicine: from Neuroplasticity to Transcendance - An Overview',
      capacity: 50,
      registered: 0,
      registrations: {}
    },
    {
      id: '50',
      title: 'Session #11B: Treating the Trauma Caused by Chronic Pain & Symptoms',
      capacity: 40,
      registered: 0,
      registrations: {}
    },
    {
      id: '51',
      title: 'Session #11C: Embody Your Message',
      capacity: 30,
      registered: 0,
      registrations: {}
    },
    {
      id: '52',
      title: 'Session #11D: From Fear to Freedom: Teaching Patients to Trust Their Bodies Again',
      capacity: 30,
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