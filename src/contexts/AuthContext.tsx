'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { registeredAttendees } from '@/data/attendees'
import { 
  initializeBreakoutSessions,
  registerForBreakoutSession,
  unregisterFromBreakoutSession,
  subscribeToSessionData,
  createOrUpdateUserProfile,
  getUserProfile,
  type BreakoutSession
} from '@/lib/firebaseOperations'

interface UserProfile {
  uid: string
  name: string
  badgeName: string
  email?: string
  dietary?: string
  registeredSessions: string[]
  lunchTableTopic?: string
  notifications: boolean
  createdAt: Date
}

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  registeredAttendees: typeof registeredAttendees
  sessionData: { [key: string]: BreakoutSession }
  signIn: (attendeeId: string) => Promise<void>
  signOut: () => void
  registerForSession: (sessionId: string) => Promise<boolean>
  unregisterFromSession: (sessionId: string) => Promise<void>
  registerForLunchTable: (topic: string) => Promise<void>
  toggleNotifications: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionData, setSessionData] = useState<{ [key: string]: BreakoutSession }>({})

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize Firebase breakout sessions
        await initializeBreakoutSessions()
        
        // Set up real-time session data listener
        const unsubscribe = subscribeToSessionData(setSessionData)
        
        // Check for existing user in localStorage
        const savedUser = localStorage.getItem('atns-user')
        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser)
            // Try to get updated user data from Firebase
            const firebaseUser = await getUserProfile(userData.uid)
            if (firebaseUser) {
              setUser({
                ...firebaseUser,
                createdAt: firebaseUser.createdAt && typeof firebaseUser.createdAt.toDate === 'function' ? firebaseUser.createdAt.toDate() : new Date()
              })
            } else {
              setUser(userData)
            }
          } catch (error) {
            console.error('Error parsing saved user data:', error)
            localStorage.removeItem('atns-user')
          }
        }
        
        setLoading(false)
        
        // Return cleanup function
        return unsubscribe
      } catch (error) {
        console.error('Error initializing app:', error)
        setLoading(false)
      }
    }
    
    initializeApp()
  }, [])

  const signIn = async (attendeeId: string) => {
    try {
      // Find the attendee in the registration list
      const attendee = registeredAttendees.find(a => a.id === attendeeId)
      if (!attendee) {
        throw new Error('Attendee not found in registration list')
      }
      
      const userProfile: UserProfile = {
        uid: attendee.id,
        name: attendee.fullName,
        badgeName: attendee.badgeName,
        email: attendee.email,
        dietary: attendee.dietary,
        registeredSessions: [],
        notifications: false,
        createdAt: new Date()
      }

      // Save to Firebase and localStorage
      await createOrUpdateUserProfile(attendee.id, {
        name: userProfile.name,
        badgeName: userProfile.badgeName,
        email: userProfile.email,
        dietary: userProfile.dietary,
        registeredSessions: [],
        notifications: false
      })
      localStorage.setItem('atns-user', JSON.stringify(userProfile))
      setUser(userProfile)
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const signOut = () => {
    localStorage.removeItem('atns-user')
    setUser(null)
  }

  const registerForSession = async (sessionId: string): Promise<boolean> => {
    if (!user) return false

    try {
      // Use Firebase transaction to register
      await registerForBreakoutSession(user.uid, sessionId, {
        name: user.badgeName,
        email: user.email || ''
      })

      // Update local user state
      const updatedUser = {
        ...user,
        registeredSessions: [...user.registeredSessions, sessionId]
      }

      localStorage.setItem('atns-user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      return true
    } catch (error) {
      console.error('Error registering for session:', error)
      throw error
    }
  }

  const unregisterFromSession = async (sessionId: string) => {
    if (!user) return

    try {
      // Use Firebase transaction to unregister
      await unregisterFromBreakoutSession(user.uid, sessionId)

      // Update local user state
      const updatedUser = {
        ...user,
        registeredSessions: user.registeredSessions.filter(id => id !== sessionId)
      }

      localStorage.setItem('atns-user', JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      console.error('Error unregistering from session:', error)
      throw error
    }
  }

  const registerForLunchTable = async (topic: string) => {
    if (!user) return

    try {
      const updatedUser = {
        ...user,
        lunchTableTopic: topic
      }

      // Update localStorage (Firebase will be added later)
      localStorage.setItem('atns-user', JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      console.error('Error registering for lunch table:', error)
      throw error
    }
  }

  const toggleNotifications = async () => {
    if (!user) return

    try {
      const updatedUser = {
        ...user,
        notifications: !user.notifications
      }

      // Update localStorage (Firebase will be added later)
      localStorage.setItem('atns-user', JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      console.error('Error toggling notifications:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    registeredAttendees,
    sessionData,
    signIn,
    signOut,
    registerForSession,
    unregisterFromSession,
    registerForLunchTable,
    toggleNotifications
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}