// Initialize all breakout sessions in Firebase
// Run this script once to set up all the session documents

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'

// Firebase config (replace with your actual config)
const firebaseConfig = {
  // Add your Firebase config here
  // You can get this from your Firebase console
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

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

async function initializeSessions() {
  console.log('Starting session initialization...')
  
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
        console.log(`✅ Initialized session ${session.id}: ${session.title}`)
      } else {
        console.log(`⏭️  Session ${session.id} already exists, skipping`)
      }
    }
    
    console.log('🎉 Session initialization complete!')
  } catch (error) {
    console.error('❌ Error initializing sessions:', error)
  }
}

initializeSessions()