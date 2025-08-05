'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Combobox } from '@/components/ui/combobox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar, MapPin, Clock, Users, Search, 
  Heart, Share2, ChevronRight, 
  Bookmark, Mic, FileText,
  UserPlus, LogOut, Bell, BellOff, MessageSquare,
  Map, Utensils, CheckCircle, XCircle,
  AlertCircle, User
} from 'lucide-react'
import Link from 'next/link'
import speakersData from '../../public/speakers.json'
import { useAuth } from '@/contexts/AuthContext'

// Speaker interface
interface Speaker {
  id?: number
  name: string
  title: string
  subtitle: string
  image_url: string
  bio: string
  local_image_path: string
  initials?: string
  specialty?: string
  sessions?: number
  topics?: string[]
}

// Session type definition
interface SessionType {
  id: number
  time: string
  title: string
  type: string
  room: string
  speaker: string | null
  description: string
  favorite: boolean
  isBreakout: boolean
  capacity?: number
  registered?: number
}

// Complete 3-day conference schedule
const scheduleData = {
  'day1': {
    date: 'Sunday, September 28, 2025',
    sessions: [
      {
        id: 1,
        time: '12:30 PM',
        title: 'Conference Check-In Opens',
        type: 'registration',
        room: 'JCC Lobby',
        speaker: null,
        description: 'Registration and badge pickup',
        favorite: false,
        isBreakout: false
      },
      {
        id: 2,
        time: '1:50 PM',
        title: 'Welcome Announcement',
        type: 'announcement',
        room: 'Levin Hall',
        speaker: null,
        description: 'Official conference welcome',
        favorite: false,
        isBreakout: false
      },
      {
        id: 3,
        time: '2:00 PM - 3:00 PM',
        title: 'Session #1: Hand to Heart: An Opportunity for Healing with Neuroplastic Symptoms',
        type: 'session',
        room: 'Levin Hall',
        speaker: 'Monica Fitzgerald, PhD + Rita Gupta, DO MPA',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: false
      },
      {
        id: 4,
        time: '3:00 PM - 3:15 PM',
        title: 'Break',
        type: 'break',
        room: '',
        speaker: null,
        description: '15 minute break',
        favorite: false,
        isBreakout: false
      },
      {
        id: 5,
        time: '3:15 PM - 4:15 PM',
        title: 'Session #2: New research in neuroplastic symptoms',
        type: 'session',
        room: 'Levin Hall',
        speaker: 'Howard Schubiner, MD + Dan Kaufmann, PHD + Paul Hansma, PHD + Marjorie Heule, MS + Lisa E. Baranik, PhD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: false
      },
      {
        id: 6,
        time: '4:15 PM',
        title: 'Closing Remarks',
        type: 'announcement',
        room: 'Levin Hall',
        speaker: null,
        description: 'Day 1 closing remarks',
        favorite: false,
        isBreakout: false
      },
      {
        id: 7,
        time: '4:30 PM - 6:00 PM',
        title: 'Welcome Reception',
        type: 'social',
        room: 'JCC Lobby',
        speaker: null,
        description: 'Welcome reception and networking',
        favorite: false,
        isBreakout: false
      }
    ]
  },
  'day2': {
    date: 'Monday, September 29, 2025',
    sessions: [
      {
        id: 11,
        time: '8:00 AM',
        title: 'Breakfast & Interest Group Session',
        type: 'social',
        room: 'Gym',
        speaker: null,
        description: 'Breakfast and networking',
        favorite: false,
        isBreakout: false
      },
      {
        id: 12,
        time: '9:00 AM - 10:00 AM',
        title: 'Session #3: Pain Reprocessing Therapy, Advanced Skills: Working With Emotions and the Self',
        type: 'session',
        room: 'Levin Hall',
        speaker: 'Christie Uipi, LCSW + Vanessa Blackstone, MSW, ACSW',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: false
      },
      {
        id: 13,
        time: '10:00 AM - 10:15 AM',
        title: 'Break',
        type: 'break',
        room: '',
        speaker: null,
        description: '15 minute break',
        favorite: false,
        isBreakout: false
      },
      {
        id: 14,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #4A: Finding Common Threads: Using Experiential Mind/Body Approaches to Address Sexual Challenges',
        type: 'concurrent',
        room: 'Levin Hall',
        speaker: 'Lillian Bailey, MS, LMFT, CST',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 50,
        registered: 0
      },
      {
        id: 15,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #4B: Fundamentals of Neuroplastic Pain Syndrome',
        type: 'concurrent',
        room: 'L130',
        speaker: 'David Schechter, MD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 40,
        registered: 0
      },
      {
        id: 16,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #4C: Embody Your Message',
        type: 'concurrent',
        room: 'F168',
        speaker: 'Camille Thoman',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 17,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #4D: Practical Somatics',
        type: 'concurrent',
        room: 'F169',
        speaker: 'Karden Rabin + Alexander Rosan',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 18,
        time: '11:15 AM - 11:30 AM',
        title: 'Break',
        type: 'break',
        room: '',
        speaker: null,
        description: '15 minute break',
        favorite: false,
        isBreakout: false
      },
      {
        id: 19,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #5A: Does Postural Tachycardia Syndrome (POTS) reflect an error in our survival circuits?',
        type: 'concurrent',
        room: 'Levin Hall',
        speaker: 'Thomas Chelimsky, MD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 50,
        registered: 0
      },
      {
        id: 20,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #5B: Integrating Neuroplastic Principles and Treatment into Frontline Healthcare',
        type: 'concurrent',
        room: 'L130',
        speaker: 'Geoff Keenan, MD + Jonathan Takahashi, MD, MPH',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 40,
        registered: 0
      },
      {
        id: 21,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #5C: Cultivating a Felt-Sense of Internal and External Safety to Heal Neuroplastic Symptoms',
        type: 'concurrent',
        room: 'F168',
        speaker: 'Mags Clark-Smith, MA and Jennifer Franklin, PhD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 22,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #5D: Brain-Mind-Body (BMB) Takeaways from 25 years of the Lightning Process (LP)',
        type: 'concurrent',
        room: 'F169',
        speaker: 'Phil Parker, PhD, DO, Dip E Hyp Psych',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 23,
        time: '12:30 PM - 1:45 PM',
        title: 'Lunch with Table Discussions',
        type: 'social',
        room: 'Gym',
        speaker: null,
        description: 'Lunch and table discussions',
        favorite: false,
        isBreakout: false
      },
      {
        id: 24,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #6A: Difficult Cases Seminar For Therapists',
        type: 'concurrent',
        room: 'Levin Hall',
        speaker: 'Jeffrey H. Axelbank, Psy.D. & David Clarke, MD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 50,
        registered: 0
      },
      {
        id: 25,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #6B: Targeting the Root Causes of Chronic Pain in Emotional Awareness and Expression Therapy',
        type: 'concurrent',
        room: 'L130',
        speaker: 'Shoshana Krohner, PhD + Mark Lumley, PhD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 40,
        registered: 0
      },
      {
        id: 26,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #6C: Science and Stories to Decode Chronic Fatigue',
        type: 'concurrent',
        room: 'F168',
        speaker: 'Rebecca Kennedy, MD & Rebecca Tolin',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 27,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #6D: Practical Somatics',
        type: 'concurrent',
        room: 'F169',
        speaker: 'Karden Rabin + Alexander Rosan',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 28,
        time: '2:45 PM - 3:00 PM',
        title: 'Break',
        type: 'break',
        room: '',
        speaker: null,
        description: '15 minute break',
        favorite: false,
        isBreakout: false
      },
      {
        id: 29,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #7A: Building a movement for change: What (Recovered) patients and professionals can achieve together',
        type: 'concurrent',
        room: 'Levin Hall',
        speaker: 'Marjon Oomens, MsC',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 50,
        registered: 0
      },
      {
        id: 30,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #7B: Introduction to EMDR therapy, Is it really that good?',
        type: 'concurrent',
        room: 'L130',
        speaker: 'Michelle Gottlieb, Psy.D., MFT, LPCC',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 40,
        registered: 0
      },
      {
        id: 31,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #7C: How to Help Men with Pelvic & Sexual Issues (even the hard cases)',
        type: 'concurrent',
        room: 'F168',
        speaker: 'Michael Hodge',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 32,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #7D: From Fear to Freedom: Teaching Patients to Trust Their Bodies Again',
        type: 'concurrent',
        room: 'F169',
        speaker: 'Leonida Tansinsin, MPT',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 33,
        time: '4:00 PM - 4:15 PM',
        title: 'Break',
        type: 'break',
        room: '',
        speaker: null,
        description: '15 minute break',
        favorite: false,
        isBreakout: false
      },
      {
        id: 34,
        time: '4:15 PM - 5:15 PM',
        title: 'Session #8: Exploring the State of the Science of Chronic Lyme and Mold',
        type: 'session',
        room: 'Levin Hall',
        speaker: 'Kate Smith, N.D. Naturopathic Doctor',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: false
      },
      {
        id: 35,
        time: '5:15 PM - 5:20 PM',
        title: 'Closing Remarks',
        type: 'announcement',
        room: 'Levin Hall',
        speaker: null,
        description: 'Day 2 closing remarks',
        favorite: false,
        isBreakout: false
      },
      {
        id: 36,
        time: '5:45 PM - 7:00 PM',
        title: 'Happy Hour Gathering',
        type: 'social',
        room: 'Offsite',
        speaker: null,
        description: 'Happy hour gathering',
        favorite: false,
        isBreakout: false
      }
    ]
  },
  'day3': {
    date: 'Tuesday, September 30, 2025',
    sessions: [
      {
        id: 41,
        time: '8:00 AM',
        title: 'Breakfast & Interest Group Session',
        type: 'social',
        room: 'JCC',
        speaker: null,
        description: 'Breakfast and networking',
        favorite: false,
        isBreakout: false
      },
      {
        id: 42,
        time: '9:00 AM - 10:00 AM',
        title: 'Session #9: Feeling Safe Enough to Heal: Treating Trauma, Addiction and Chronic Pain',
        type: 'session',
        room: 'Levin Hall',
        speaker: 'Les Aria, PhD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: false
      },
      {
        id: 43,
        time: '10:00 AM - 10:15 AM',
        title: 'Break',
        type: 'break',
        room: '',
        speaker: null,
        description: '15 minute break',
        favorite: false,
        isBreakout: false
      },
      {
        id: 44,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #10A: An Experiential Emotion-Focused Approach to Understanding and Treating Psychogenic Non-Epileptic Attacks (PNEA)',
        type: 'concurrent',
        room: 'Levin Hall',
        speaker: 'William H. Watson, PhD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 50,
        registered: 0
      },
      {
        id: 45,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #10B: Targeting the Root Causes of Chronic Pain in Emotional Awareness and Expression Therapy',
        type: 'concurrent',
        room: 'L130',
        speaker: 'Shoshana Krohner, PhD + Mark Lumley, PhD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 40,
        registered: 0
      },
      {
        id: 46,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #10C: Introduction to EMDR therapy, Is it really that good?',
        type: 'concurrent',
        room: 'F168',
        speaker: 'Michelle Gottlieb, Psy.D., MFT, LPCC',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 47,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #10D: Brain-Mind-Body (BMB) Takeaways from 25 years of the Lightning Process (LP)',
        type: 'concurrent',
        room: 'F169',
        speaker: 'Phil Parker, PhD, DO, Dip E Hyp Psych',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 48,
        time: '11:15 AM - 11:30 AM',
        title: 'Break',
        type: 'break',
        room: '',
        speaker: null,
        description: '15 minute break',
        favorite: false,
        isBreakout: false
      },
      {
        id: 49,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #11A: Psychedelic Medicine: from Neuroplasticity to Transcendance - An Overview',
        type: 'concurrent',
        room: 'Levin Hall',
        speaker: 'Matt McClanahan, DO, MA',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 50,
        registered: 0
      },
      {
        id: 50,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #11B: Treating the Trauma Caused by Chronic Pain & Symptoms',
        type: 'concurrent',
        room: 'L130',
        speaker: 'Alex Klassen, MSW, RSW + Tanner Murtagh MSW, RSW',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 40,
        registered: 0
      },
      {
        id: 51,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #11C: Embody Your Message',
        type: 'concurrent',
        room: 'F168',
        speaker: 'Camille Thoman',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 52,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #11D: From Fear to Freedom: Teaching Patients to Trust Their Bodies Again',
        type: 'concurrent',
        room: 'F169',
        speaker: 'Leonida Tansinsin, MPT',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: true,
        capacity: 30,
        registered: 0
      },
      {
        id: 53,
        time: '12:30 PM - 1:45 PM',
        title: 'Lunch Break with Table Discussions',
        type: 'social',
        room: 'Gym',
        speaker: null,
        description: 'Lunch and table discussions',
        favorite: false,
        isBreakout: false
      },
      {
        id: 54,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #12: Stigma as a Stressor: How Anti-Fat Bias Influences Neuroplastic Symptoms',
        type: 'session',
        room: 'Levin Hall',
        speaker: 'Deb Malkin, Amy Schere, MSW, LCSWA, PT, DPT, Rachel Gofman, PT, DPT',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: false
      },
      {
        id: 55,
        time: '2:45 PM - 3:00 PM',
        title: 'Break',
        type: 'break',
        room: '',
        speaker: null,
        description: '15 minute break',
        favorite: false,
        isBreakout: false
      },
      {
        id: 56,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #13: Neuroplastic Symptoms of the Ear: Tinnitus, Sound Sensitivity and Dizziness',
        type: 'session',
        room: 'Levin Hall',
        speaker: 'Yonit Arthur, AuD, & Marcia Dewey, AuD',
        description: '50 minutes presentation + 10 minute Q&A',
        favorite: false,
        isBreakout: false
      },
      {
        id: 57,
        time: '4:00 PM',
        title: 'David Clarke Wrap up, presidential address',
        type: 'keynote',
        room: 'Levin Hall',
        speaker: 'David Clarke',
        description: 'Presidential address and conference wrap-up',
        favorite: false,
        isBreakout: false
      },
      {
        id: 58,
        time: '4:30 PM',
        title: 'Closing Remarks + Zumba',
        type: 'social',
        room: 'Levin Hall',
        speaker: null,
        description: 'Final closing remarks and Zumba session',
        favorite: false,
        isBreakout: false
      },
      {
        id: 59,
        time: '5:00 PM - 6:30 PM',
        title: 'Happy Hour Gathering',
        type: 'social',
        room: 'Offsite',
        speaker: null,
        description: 'Final happy hour gathering - End of Conference',
        favorite: false,
        isBreakout: false
      }
    ]
  }
}

// Enhanced speakers data from JSON
const speakers: Speaker[] = speakersData.map((speaker, index) => ({
  ...speaker,
  id: index + 1,
  initials: speaker.name.split(' ').map(n => n[0]).join('').slice(0, 2),
  specialty: speaker.subtitle || speaker.title,
  sessions: 1, // We'll calculate this dynamically later if needed
  topics: [speaker.title, speaker.subtitle].filter(Boolean)
}))

// Sign in modal component
function SignInModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [selectedAttendeeId, setSelectedAttendeeId] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, registeredAttendees } = useAuth()

  const attendeeOptions = registeredAttendees.map(attendee => ({
    value: attendee.id,
    label: `${attendee.badgeName} - ${attendee.email}`
  })).sort((a, b) => a.label.localeCompare(b.label))

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAttendeeId) return

    setLoading(true)
    try {
      await signIn(selectedAttendeeId)
      onOpenChange(false)
      setSelectedAttendeeId('')
    } catch (error) {
      console.error('Sign in error:', error)
      alert('Error signing in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedAttendee = registeredAttendees.find(a => a.id === selectedAttendeeId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to ATNS 2025</DialogTitle>
          <DialogDescription>
            Please select your name from the registered attendees list to sign in.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Your Name</label>
            <Combobox
              options={attendeeOptions}
              value={selectedAttendeeId}
              onValueChange={setSelectedAttendeeId}
              placeholder="Click to search for your name..."
              searchPlaceholder="Type your name or email..."
              emptyText="No attendee found. Try a different search term."
            />
          </div>
          
          {selectedAttendee && (
            <div className="p-3 bg-blue-50 rounded-lg border">
              <h4 className="font-medium text-blue-900">Confirm this is you:</h4>
              <p className="text-sm text-blue-800">{selectedAttendee.badgeName}</p>
              <p className="text-xs text-blue-600">{selectedAttendee.email}</p>
              {selectedAttendee.dietary && selectedAttendee.dietary !== 'None' && (
                <p className="text-xs text-blue-600">Dietary: {selectedAttendee.dietary}</p>
              )}
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={loading || !selectedAttendeeId}>
            {loading ? 'Signing in...' : 'Confirm & Sign In'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Speaker detail modal
function SpeakerModal({ speaker, open, onOpenChange }: { 
  speaker: Speaker | null, 
  open: boolean, 
  onOpenChange: (open: boolean) => void 
}) {
  if (!speaker) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-16 h-16">
              <AvatarImage 
                src={`/${speaker.local_image_path}`} 
                alt={speaker.name}
                className="object-cover"
              />
              <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                {speaker.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-bold">{speaker.name}</div>
              <div className="text-sm text-gray-600 font-normal">{speaker.title}</div>
              {speaker.subtitle && (
                <div className="text-sm text-blue-600 font-normal">{speaker.subtitle}</div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Biography</h4>
            <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {speaker.bio}
            </div>
          </div>
          {speaker.topics && speaker.topics.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-1">
                {speaker.topics.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  )
}



// Presentation details and learning objectives
const presentationDetails: { [key: string]: { summary: string; learningObjectives: string; speakerBio?: string } } = {
  '3': {
    summary: `Hand to Heart: An Opportunity for Healing with Neuroplastic Symptoms - This session provides an opportunity for healing and connection within the neuroplastic symptoms community, offering practical approaches and emotional support for both practitioners and patients dealing with neuroplastic conditions.`,
    learningObjectives: `• Learn practical approaches for supporting healing in neuroplastic symptoms
• Develop skills for creating therapeutic connections with patients
• Understand the role of compassion and emotional support in recovery
• Explore evidence-based techniques for neuroplastic symptom management`
  },
  '5': {
    summary: `These four presentations will describe new research findings given by:

Dr. Lisa Baranick: Correlates of chronic pain worldwide 
Dr. Dan Kaufmann: EAET for migraine headaches in group settings 
Marjorie Heule: ACEs and other factors in chronic pelvic pain 
Dr. Paul Hansma: Activity of human brain organoids`,
    learningObjectives: 'Participants will be able to describe research findings on worldwide chronic pain, migraine headaches, pelvic pain and human brain organoids.'
  },
  '12': {
    summary: `This advanced Pain Reprocessing Therapy (PRT) presentation focuses on integrating emotional processing and self-compassion into clinical work. Moving beyond foundational skills like somatic tracking, the session explores how unresolved emotions and patterns of self-criticism can amplify symptoms and hinder recovery. Through case examples, experiential techniques, and applied strategies, presenters will demonstrate how to support clients in relating differently to their emotional experiences and fostering a more compassionate relationship with the self to facilitate lasting neuroplastic change.`,
    learningObjectives: 'Participants will learn advanced PRT techniques for integrating emotional processing and self-compassion into clinical practice.'
  },
  '14': {
    summary: `Our brain is our biggest sexual organ! Therefore, as a mindbody/neuroplasticity-oriented provider you are uniquely poised to help people experiencing sexual dysfunction. In this talk, you will learn to apply our existing ways of thinking about neuroplastic symptoms to sexual challenges. You will also gain knowledge about the neuroscience of sex and pleasure. Then, we will explore a cross disciplinary, transdiagnostic framework for understanding and treating sexual issues using Memory Reconsolidation neuroscience research as our compass. With this framework, you will be able to experience the confidence that comes with having a universal road map, along with the freedom and autonomy to use your preferred techniques and even your creativity (!) - having fun when working with people experiencing sexual challenges.`,
    learningObjectives: 'Participants will learn to apply neuroplastic symptom frameworks to sexual challenges and gain knowledge about the neuroscience of sex and pleasure.'
  },
  '15': {
    summary: `The goal of this presentation is to break down the increasingly complex area of Neuroplastic Syndrome to its core elements. The Fundamentals which I first learned over forty years ago and continue to practice today. By focusing on the Basics, I hope to offer both the novice and experienced practitioner new insights into the treatment of this condition.`,
    learningObjectives: `• Understand the Core Principles of Neuroplastic Pain
• Simplify the Approach to Treatment of Neuroplastic Symptoms  
• Integrate Fundamentals and Newer Approaches for Successful Outcomes`
  },
  '16': {
    summary: `In this experiential session, you'll be invited to move, breathe, and feel—to reconnect with your body as a source of clarity, resilience, and insight. At a conference full of such powerful information and ideas, this is a chance to integrate.`,
    learningObjectives: `Through guided movement and introductory partner exercises, you will be introduced to the power of:
• Embodied confidence
• Using breath to metabolize your feeling, not bypass it
• Accessing intuition as a valid source of clinical insight
• Communication with patients from embodied presence

This session is a chance to explore how bringing more body awareness, breath and presence can make your care even more effective and sustainable. No dance or movement experience necessary—just curiosity and a willingness to show up as you are.`
  },
  '19': {
    summary: `Surprisingly, the underlying autonomic circuit changes that underlie POTS have not been examined. Instead, studies in the last 30 years have explored cardio- and cerebro-vascular, immunologic, mast cell activation and connective tissue mechanisms. This talk will present a hypothesis with supportive data for a specific central nervous system pathophysiology.`,
    learningObjectives: `Participants will be able to:
• Differentiate Functional and Structural Autonomic Disorders
• Explain the features of POTS that suggest a CNS etiology
• Describe the functions of the peri-aqueductal gray region (PAG)
• Expound a novel theory on the role of the PAG in POTS
• Review data on a novel treatment based on this perspective`
  },
  '20': {
    summary: `Healing neuroplastic pain and symptoms involves "buy-in" on the part of the patient regarding the nature of the diagnosis and origin of symptoms. In a healthcare system and culture largely focused on a reductionist, structural, tissue-based diagnostic framework, it can be difficult for frontline health care providers to broach these concepts with patients who are not initially expecting it. These presentations will discuss an "in the trenches" clinicians' evolution of how they have learned to work with patients to introduce the concepts integral to a neuroplastic pain and symptom diagnosis and treatment approach from their clinical positions within their respective health systems. We will discuss practical approaches to assessing readiness for change and engaging with patients on a path of healing and recovery from neuroplastic pain and symptoms.`,
    learningObjectives: `• Understand the role of patient attribution and expectation in neuroplastic pain and symptom presentations
• Explore techniques that can help illuminate patients' beliefs and readiness for change
• Learn strategies and practical tools for engaging with patients to build an understanding of the important neuroscience concepts, toward a more integrated, mind-body approach
• Examine potential opportunities and methods for introducing pain neuroscience education and a neuroplastic treatment approach in healthcare systems`
  },
  '21': {
    summary: `While initially the effectiveness of EMDR therapy was often questioned, after over 30 years of research including over 40 RCTs, EMDR therapy is now deemed evidence-based and recommended by many bodies such as WHO, DoD, NICE, Cochran, etc. EMDR therapy also has research to support its use with many populations and diagnoses (not just PTSD), including chronic pain and illness. This workshop will provide an introduction to this very effective therapy.`,
    learningObjectives: `• Participants will be able to name the 8 phases and three prongs of EMDR therapy
• Participants will be able to describe the breadth of research on this therapy
• Participants will be able to use at least one EMDR resource`
  },
  '22': {
    summary: `Michael will expose an area of neuroplastic symptoms which can be uncomfortable to talk about. He'll cover specifics of common pelvic conditions like premature ejaculation, erectile dysfunction, hard flaccid, and pelvic floor dysfunction; along with some useful pointers and experiential practices that help free up symptoms in the root region.`,
    learningObjectives: `• Learn about often ignored pelvic and sexual dysfunction conditions–and how to help men with them
• Helping your "hard cases" to uncover their root causes, even if they have seemingly tried everything to heal
• Experientially practice somatic techniques for hearing the "message" of our symptoms`
  },
  '24': {
    summary: `Traditional physical therapy often centers on diagnosis, biomechanics, and symptom management. But for the increasing number of patients with chronic pain, fatigue, long haul COVID, and other neuroplastic conditions, this externalized, symptom-focused approach can fall short—and sometimes do harm. This presentation reframes movement therapy through a mind-body neuroplastic lens, emphasizing the role of the nervous system, lived experience, and the impact of fear and safety on how people move. Attendees will learn how to assess and guide patients in a way that reduces guarding, bracing, and pain anticipation—helping them shift from fear-based movement into freedom and trust. Practical, accessible tools will be shared that clinicians can begin using immediately, no matter their discipline.`,
    learningObjectives: `• Understand the nocebo effect: Explore how language, imaging, and over-pathologizing can reinforce fear and inhibit healing—and how to give patients the "green light" to move
• Assess movement through a nervous system lens: Learn simple ways to recognize fear-based movement patterns (bracing, guarding, etc.) and guide patients without overcomplicating the process
• Apply the Twin Peaks Model: Understand how to dose movement intensity to desensitize the nervous system and recognize the difference between a therapeutic flare-up and harm
• Shift the energy of movement: Practice guiding patients into "light, loose, and easy" movement through visualization, cues of safety, and a focus on nervous system regulation rather than perfection. Incorporate activities that bring them joy`
  },
  '25': {
    summary: `Chronic Lyme disease and mold toxicity are increasingly common diagnoses for patients experiencing persistent, debilitating symptoms such as fatigue, brain fog, anxiety, pain, dizziness, headaches, and heightened chemical or environmental sensitivities. While these symptom patterns are very real, the underlying mechanisms behind them remain complex and often misunderstood. This presentation explores the current state of the science surrounding these conditions and highlights the growing evidence that many symptoms may be best understood through the lens of neuroplasticity — as brain- and nervous system-based processes rather than signs of ongoing infection or toxic exposure. Attendees will leave with tools to support patients in a compassionate and evidence-based way, grounded in neuroscience and the principles of neuroplastic healing.`,
    learningObjectives: `• Examine the current scientific literature on chronic Lyme disease and mold-related illness, including areas of consensus and controversy
• Explore how neuroplastic mechanisms may play a central role in chronic symptoms often attributed to infection or toxicity
• Identify symptom patterns and patient narratives that may suggest a neuroplastic rather than biomedical etiology
• Learn how to compassionately introduce a brain-based healing model to patients with longstanding illness narratives`
  },
  '34': {
    summary: `Chronic Lyme disease and mold toxicity are increasingly common diagnoses for patients experiencing persistent, debilitating symptoms such as fatigue, brain fog, anxiety, pain, dizziness, headaches, and heightened chemical or environmental sensitivities. While these symptom patterns are very real, the underlying mechanisms behind them remain complex and often misunderstood. This presentation explores the current state of the science surrounding these conditions and highlights the growing evidence that many symptoms may be best understood through the lens of neuroplasticity — as brain- and nervous system-based processes rather than signs of ongoing infection or toxic exposure. Attendees will leave with tools to support patients in a compassionate and evidence-based way, grounded in neuroscience and the principles of neuroplastic healing.`,
    learningObjectives: `• Examine the current scientific literature on chronic Lyme disease and mold-related illness, including areas of consensus and controversy
• Explore how neuroplastic mechanisms may play a central role in chronic symptoms often attributed to infection or toxicity
• Identify symptom patterns and patient narratives that may suggest a neuroplastic rather than biomedical etiology
• Learn how to compassionately introduce a brain-based healing model to patients with longstanding illness narratives`
  },
  '26': {
    summary: `In this workshop, we will teach how to conduct several key techniques of EAET for chronic pain and other somatic symptoms. Using videos, demonstrations, and/or experiential exercises, this workshop will help attendees learn how to link emotional patterns to pain symptoms, facilitate the experiencing and expression of adaptive feelings, and recognize and work with defenses.`,
    learningObjectives: `Attendees will learn to:
• Link emotional processes to somatic experiences, including pain
• Recognize and challenge defenses that block emotional experience
• Facilitate the activation and expression of avoided emotions`
  },
  '17': {
    summary: `The brain and nervous system is a phenomenon of the feeling body as much as it is the thinking mind. John Sarno observed that TMS frequently presented itself in individuals that repressed emotions (anger in particular) and that for patients where psychoeducation alone was ineffective, going deeper into feelings was required. In this workshop, we will guide participants into directly accessing their felt sense and the underlying sensations, emotions and energetic charge that often underlies symptoms. Merging methods from multiple lineages of bodywork as well as Peter Levine's Somatic Experiencing, participants will leave the workshop with a new dimension and depth of access to their nervous system through their body.`,
    learningObjectives: `• Develop rapid access to the felt sense
• Become aware of nervous system states through the body
• Identify symptom presentations with underlying emotional states`
  },
  '27': {
    summary: `The brain and nervous system is a phenomenon of the feeling body as much as it is the thinking mind. John Sarno observed that TMS frequently presented itself in individuals that repressed emotions (anger in particular) and that for patients where psychoeducation alone was ineffective, going deeper into feelings was required. In this workshop, we will guide participants into directly accessing their felt sense and the underlying sensations, emotions and energetic charge that often underlies symptoms. Merging methods from multiple lineages of bodywork as well as Peter Levine's Somatic Experiencing, participants will leave the workshop with a new dimension and depth of access to their nervous system through their body.`,
    learningObjectives: `• Develop rapid access to the felt sense
• Become aware of nervous system states through the body
• Identify symptom presentations with underlying emotional states`
  },
  '29': {
    summary: `This experiential presentation will introduce the concept of "internal and external safety" in the context of relationships. Using this to create a pathway out of the pattern of physiological and psychological symptoms in which patients get stuck. Participants will be invited to deepen their understanding of safety through the practice of some simple exercises that can be readily implemented in their work settings and personal lives. Jointly bringing 40 years of clinical experience in working with neuroplastic symptoms, Movement & Non-Verbal Communication Lecturer Mags Clark-Smith, M.A. and Psychologist Jennifer Franklin, PhD, have developed this new framework for understanding how to help patients to have felt-sense of safety.`,
    learningObjectives: `• Distinguish between internal and external safety
• Develop greater attunement to the relational dynamics between patient and practitioner
• Apply experiential methods to deepen connection with oneself and others by focusing on increasing a felt-sense of safety in the here and now
• Refine somatic, affective, attunement, compassion, presence, and relational skills`
  },
  '30': {
    summary: `This session is divided into two parts. First, you'll be guided through key studies on Brain-Mind-Body (BMB) interactions and self-compassion, helping you support patients in understanding how their physical symptoms can be influenced by these approaches. Then, in an interactive session, you'll learn and practice LP tools to develop self-compassion—skills that can benefit both your own well-being and your patients' healing.`,
    learningObjectives: `• Easily reference key research on how Brain-Mind-Body (BMB) interactions and self-compassion influence physical symptoms
• Enhance your ability to explain these concepts to patients in a way that fosters hope, understanding, and active participation in their care
• Apply practical LP tools to cultivate self-compassion, supporting both your own resilience and your patients' capacity to resolve chronic symptoms`
  },
  '31': {
    summary: `Many clients reach a point where their progress in treatment stalls. This highly interactive seminar is facilitated by a psychologist and a physician who have long experience with this situation. Cases submitted in advance by attendees will be discussed, and the issues that are common in these patients and how they can be successfully addressed will be highlighted.`,
    learningObjectives: `• Participants will be able to identify the psychosocial issues that are often unrecognized by the client that impair their progress in treatment
• Participants will be able to apply techniques to help the client recognize the problems that are impeding their progress
• Participants will be able to recognize techniques that can help client overcome the stresses, traumas, or emotions that lead to persistence of neuroplastic pain or illness`
  },
  '32': {
    summary: `Chronic fatigue can be as debilitating as chronic pain or any other neuroplastic symptom. We'll explore science and stories to decode fatigue, exhaustion, weakness, post-exertional malaise, brain fog and related symptom expressions. Becca Kennedy, MD will discuss scientific studies, her experience treating patients at the Long COVID clinic at Kaiser Permanente Northwest, and her own bout with fatigue. Rebecca Tolin will share her dramatic recovery from 13 years of ME/CFS, and stories from clients she's assisted as a mind-body coach. They'll discuss how to use neuroplastic recovery strategies with patients who haven't been able to work or exercise for years or decades.`,
    learningObjectives: `• Understand why it's important to correct unproven medical theories for this population of patients
• Explain how fatigue is a warning signal from the brain, and how post-exertional malaise becomes a conditioned response
• Help patients and clients discern when to challenge and when to soothe, especially when they fear PEM
• Hear case studies of patients who have gone from being bed bound or homebound to living full, active lives`
  },
  '44': {
    summary: `In her presentation, Marjon Oomens will share how the Emovere Foundation is building a grassroots movement in the Netherlands to contribute to a paradigm shift – both in healthcare and in how society views health and well-being, opportunities for recovery and for proactive health: applying mind body principles early on to prevent symptoms from becoming chronic conditions. She will share key success factors and valuable lessons learned along the way. After this introduction, an interactive discussion will follow to share experiences and best practices in different countries to stimulate ideas, learn from each other and explore how we can build the movement together internationally to shift the paradigm.`,
    learningObjectives: `• Understand key success factors and lessons learned from a Dutch example
• Learn from each other, share best practices and ideas from different viewpoints and countries
• Exchange ideas on proactive health: how can we inspire people to apply mind body principles early on to prevent symptoms from becoming chronic conditions
• Explore how can we strengthen each other and work together to shift the paradigm`
  },
  '42': {
    summary: `This presentation explores the shared neurobiological and psychological mechanisms underlying trauma, addiction, and chronic pain. Emphasizing the role of the autonomic nervous system, emotional suppression, and maladaptive neuroplasticity, it introduces a psychophysiologic model that reframes these conditions as interconnected expressions of dysregulation. Evidence-based interventions such as Pain Reprocessing Therapy, Acceptance and Commitment Therapy, and Internal Family System will be discussed to support nervous system regulation and emotional integration. Attendees will gain practical insights into treating complex pain through a trauma-informed lens.`,
    learningObjectives: `• Define the interrelated mechanisms of trauma, addiction, and chronic pain through the lens of psychophysiologic disorders, including the roles of dysregulated stress response systems and neuroplastic changes in the brain
• Explain the role of the autonomic nervous system (ANS)—particularly through the framework of Theory of Constructed Emotion (TCE)
• Demonstrate the 3Ns, a modified version of Somatic Tracking to instil physiological and psychological safety cues for complex clinical presentations in service of repairing the nervous system`
  },
  '45': {
    summary: `This presentation explores the shared neurobiological and psychological mechanisms underlying trauma, addiction, and chronic pain. Emphasizing the role of the autonomic nervous system, emotional suppression, and maladaptive neuroplasticity, it introduces a psychophysiologic model that reframes these conditions as interconnected expressions of dysregulation. Evidence-based interventions such as Pain Reprocessing Therapy, Acceptance and Commitment Therapy, and Internal Family System will be discussed to support nervous system regulation and emotional integration. Attendees will gain practical insights into treating complex pain through a trauma-informed lens.`,
    learningObjectives: `• Define the interrelated mechanisms of trauma, addiction, and chronic pain through the lens of psychophysiologic disorders, including the roles of dysregulated stress response systems and neuroplastic changes in the brain
• Explain the role of the autonomic nervous system (ANS)—particularly through the framework of Theory of Constructed Emotion (TCE)
• Demonstrate the 3Ns, a modified version of Somatic Tracking to instil physiological and psychological safety cues for complex clinical presentations in service of repairing the nervous system`
  },
  '46': {
    summary: `This presentation will review of the role of emotions in the etiology of PNEA, including the mechanisms through which activation of previously buried emotions can trigger PNEA. We will also show how experiential dynamic therapy (e.g., ISTDP) can help patients discover, face, and experientially process the push-pull of buried conflictual emotions that had previously been skated over, brushed aside, or otherwise defended against. As buried emotions are released and metabolized via the affective channel, they no longer get shunted to the somatic channel, enabling somatic symptoms such as PNEA to resolve.`,
    learningObjectives: `• Describe a key dynamic in the etiology of PNEA relating to the blockage of affective experience
• Describe the 3 key aspects of emotional experience
• Describe the 4 somatic pathways of anxiety and how they relate to somatic symptoms`
  },
  '47': {
    summary: `In this presentation, I'll introduce a framework for understanding how and why, to the best of our current knowledge, that psychedelic medicines may play a role in neuroplastic symptom recovery. In unpacking some of the foundational neuroscience principles that underpin the development of neuroplastic symptoms, I'll situate the psychedelic paradigm squarely within the purview of enhancing neuroplasticity, applications in autonomic neuroscience, and expanding the brain's predictive and inferential capacities to break away from old and construct new physical and emotional experiences. I will use both open source and clinical data review as well as collective and personal anecdotal experience to describe how 3 commonly used medicines - ketamine, MDMA, and psilocybin - may serve as leading candidates for further exploration. Finally, I'll relate all of this to a world in which deepening our personal and communal experience of connection, power, meaning, play, and rest can help us transcend our private and fixed states of threat and move us to an internalized, interdependent state of safety, thereby facilitating change and growth in our brains and beyond.`,
    learningObjectives: `• Understand why and how psychedelic medicines and experiences of non-ordinary states of consciousness can be useful tools within the domains of neuroplasticity. predictive processing, threat physiology, and emotion in fostering an effective & therapeutic path in the context of neuroplastic symptom recovery
• Be able to describe 3 of the most common medicines used in psychedelic assisted therapies for treating neuroplastic conditions
• Have a cursory understanding of the literature & data that exists on these medicines and know where to find more information
• Have a schema for situating the utility of psychedelic science and neuroplastic medicine within the larger framework of holistic and transcendental experience, theoretically, clinically, personally, and communally`
  },
  '49': {
    summary: `In this presentation, we will provide education on sensitization trauma and medical trauma. Sensitization trauma occurs when an individual experiences high, prolonged nervous system dysregulation during the onset or progression of chronic pain or symptom. Similarly, medical trauma can occur when individuals endure confusion, varied opinions, frightening procedures and/or messages of invalidation while accessing medical care. We will discuss the importance of recognizing and treating these particular forms of trauma, which can create barriers to recovery during the psychological treatment of neuroplastic pain and symptoms. Along with education, the presentation will outline a somatic process for treating these forms of trauma, including a live demonstration.`,
    learningObjectives: `• Understand the signs of sensitization and medical trauma
• Learn how sensitization and medical trauma can slow or limit recovery from chronic neuroplastic pain/symptoms
• Learn a process for somatically addressing sensitization and medical trauma`
  },
  '50': {
    summary: `Weight stigma/anti-fat bias is pervasive in modern society and exists within individuals, families, institutions and society, creating a significant impact on the health of people in larger bodies. Oftentimes, body size is identified as a cause of or contributor to chronic symptoms such as pain, when in reality these symptoms are neuroplastic. Weight stigma can itself be a significant factor in the development and maintenance of neuroplastic symptoms. Clients and patients being treated for neuroplastic symptoms will benefit from clinicians using a Health at Every Size, weight-inclusive framework to reduce stigma and improve outcomes.`,
    learningObjectives: `• Participants will increase awareness of the general role of weight stigma/bias on health and mental health
• Participants will learn about how weight stigma influences the development and maintenance of neuroplastic symptoms
• Participants will learn principles of Health at Every Size/weight-inclusive care and how to apply this framework to support patient/client recovery from neuroplastic symptoms`
  },
  '51': {
    summary: `Tinnitus and Sound Sensitivity (Hyperacusis and Misophonia): This presentation will discuss how to identify/rule out concerning medical issues that might be underlying tinnitus/sound sensitivity and how much of these conditions are neuroplastic. Will explain how tinnitus and pain are essentially the same thing, both are danger alarms (tinnitus is literally an alarm inside us). Review how to adapt current tools used for pain for tinnitus and sound sensitivity (PRT tools such as somatic tracking, avoidance, corrective experiences, etc).

Dizziness: In this section of the presentation, you will learn about common neuroplastic dizziness syndromes and how to educate patients with dizziness effectively. You will also learn the key points that make working with dizziness different from working with pain and how to modify your current repertoire of tools for dizziness.`,
    learningObjectives: `• Learners will be able to identify/rule out concerning medical issues that might be underlying tinnitus and sound sensitivity
• Learners will be familiarized with common dizziness syndromes that are neuroplastic
• Learners will be able to identify how working with dizziness, tinnitus and sound sensitivity differs from working with pain and other sensations
• Tips for diagnosis and treatment of neuroplastic dizziness & common characteristics`
  }
}

// Session details modal component
function SessionDetailsModal({ session, open, onOpenChange }: { 
  session: SessionType | null, 
  open: boolean, 
  onOpenChange: (open: boolean) => void 
}) {
  console.log('SessionDetailsModal rendered:', { session, open })
  if (!session) return null

  const details = presentationDetails[session.id.toString()]
  console.log('Session details found:', details)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 pr-8">
            {session.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Session details including presentation summary, learning objectives, and speaker information
          </DialogDescription>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {session.time}
            </span>
            {session.room && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {session.room}
              </span>
            )}
          </div>
          {session.speaker && (
            <p className="text-blue-600 font-medium mt-1">
              {session.speaker}
            </p>
          )}
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {details ? (
            <>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Presentation Summary</h3>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {details.summary}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Objectives</h3>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {details.learningObjectives}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Speaker Biography</h3>
                <div className="text-gray-500 italic">
                  {details.speakerBio || 'Speaker biography will be added soon.'}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Presentation Summary</h3>
                <div className="text-gray-700">
                  {session.description}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Objectives</h3>
                <div className="text-gray-500 italic">
                  Learning objectives will be added soon.
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Speaker Biography</h3>
                <div className="text-gray-500 italic">
                  Speaker biography will be added soon.
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Lunch table topics
const lunchTableTopics = [
  { id: 1, topic: "Starting a Mind-Body Practice", capacity: 8, registered: 0, host: "Dr. Sarah Johnson" },
  { id: 2, topic: "Patient Education Strategies", capacity: 10, registered: 0, host: "Dr. Mike Chen" },
  { id: 3, topic: "Treating Pediatric Cases", capacity: 6, registered: 0, host: "Dr. Jennifer Franklin" },
  { id: 4, topic: "Research Opportunities", capacity: 8, registered: 0, host: "Dr. Paul Hansma" },
  { id: 5, topic: "Technology in Treatment", capacity: 10, registered: 0, host: "Dr. Lisa Baranik" },
  { id: 6, topic: "Trauma-Informed Care", capacity: 8, registered: 0, host: "Dr. Mark Lumley" }
]

export default function ConferenceHub() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('schedule')
  const [showSignIn, setShowSignIn] = useState(false)
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)
  const [showSpeakerModal, setShowSpeakerModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string>('all')
  const [selectedSession, setSelectedSession] = useState<SessionType | null>(null)
  const [showSessionModal, setShowSessionModal] = useState(false)
  
  const { user, signOut, registerForSession, unregisterFromSession, registerForLunchTable, toggleNotifications, sessionData } = useAuth()

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (speaker.specialty && speaker.specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
    speaker.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (speaker.subtitle && speaker.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker)
    setShowSpeakerModal(true)
  }

  const handleSessionClick = (session: SessionType) => {
    console.log('Session clicked:', session)
    setSelectedSession(session)
    setShowSessionModal(true)
  }

  const handleBreakoutRegistration = async (sessionId: string) => {
    if (!user) {
      setShowSignIn(true)
      return
    }

    try {
      await registerForSession(sessionId.toString())
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      alert(errorMessage)
    }
  }

  const handleBreakoutUnregistration = async (sessionId: string) => {
    if (!user) return
    
    try {
      await unregisterFromSession(sessionId.toString())
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      alert(errorMessage)
    }
  }

  const handleLunchTableRegistration = async (topicId: number) => {
    if (!user) {
      setShowSignIn(true)
      return
    }

    try {
      await registerForLunchTable(topicId.toString())
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      alert(errorMessage)
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-900">ATNS 2025 Conference</h1>
              <Badge className="bg-green-100 text-green-800">LIVE</Badge>
            </div>
            <div className="flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Button size="sm" variant="outline" onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
              </Button>
                </div>
              ) : (
                <Button size="lg" onClick={() => setShowSignIn(true)}>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Sign In
              </Button>
              )}
              <Button size="lg" variant="outline" asChild>
                <Link href="/materials">
                  <FileText className="w-5 h-5 mr-2" />
                  Materials
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="schedule">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="breakouts">
              <Users className="w-4 h-4 mr-2" />
              Breakouts
            </TabsTrigger>
            <TabsTrigger value="speakers">
              <Mic className="w-4 h-4 mr-2" />
              Speakers
            </TabsTrigger>
            <TabsTrigger value="map">
              <Map className="w-4 h-4 mr-2" />
              Map
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="lunch">
              <Utensils className="w-4 h-4 mr-2" />
              Lunch Tables
            </TabsTrigger>
          </TabsList>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="mt-6">
            <Tabs defaultValue="day1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day1">Day 1 (Sunday)</TabsTrigger>
                <TabsTrigger value="day2">Day 2 (Monday)</TabsTrigger>
                <TabsTrigger value="day3">Day 3 (Tuesday)</TabsTrigger>
              </TabsList>

              {Object.entries(scheduleData).map(([day, data]) => (
                <TabsContent key={day} value={day} className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        {data.date}
                      </CardTitle>
                      <CardDescription>
                        {data.sessions.length} sessions scheduled
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {data.sessions.map((session) => (
                          <div key={session.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                            session.type === 'concurrent' ? 'ml-4 border-l-4 border-l-blue-200 bg-blue-50/30' : ''
                          }`} onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSessionClick(session)
                          }}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                  <span className="text-sm text-gray-600 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {session.time}
                                  </span>
                                  {session.room && (
                                  <span className="text-sm text-gray-600 flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {session.room}
                                  </span>
                                  )}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {session.title}
                                </h3>
                                {session.speaker && (
                                  <p className="text-sm text-blue-600 mb-2 flex items-center gap-1 cursor-pointer hover:underline"
                                     onClick={(e) => {
                                       e.preventDefault()
                                       e.stopPropagation()
                                       const foundSpeaker = speakers.find(s => session.speaker?.includes(s.name))
                                       if (foundSpeaker) handleSpeakerClick(foundSpeaker)
                                     }}>
                                    <Mic className="w-4 h-4" />
                                    {session.speaker}
                                  </p>
                                )}
                                <p className="text-sm text-gray-600">{session.description}</p>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                {session.favorite && (
                                  <Heart className="w-5 h-5 text-red-500 fill-current" />
                                )}
                                <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                                  <Bookmark className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          {/* Breakout Sessions Tab */}
          <TabsContent value="breakouts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Breakout Session Registration</CardTitle>
                <CardDescription>
                  Register for up to 3 breakout sessions per day. Limited capacity available.
                  {user && (
                    <div className="mt-2 space-y-1">
                      <div className="text-blue-600">
                        Monday: {user.registeredSessions.filter(id => {
                          const session = Object.values(scheduleData).flatMap(day => day.sessions).find(s => s.id.toString() === id);
                          return session && [14, 15, 16, 17, 19, 20, 21, 22, 24, 25, 26, 27, 29, 30, 31, 32].includes(session.id);
                        }).length}/3 sessions
          </div>
                      <div className="text-blue-600">
                        Tuesday: {user.registeredSessions.filter(id => {
                          const session = Object.values(scheduleData).flatMap(day => day.sessions).find(s => s.id.toString() === id);
                          return session && [44, 45, 46, 47, 49, 50, 51, 52].includes(session.id);
                        }).length}/3 sessions
                      </div>
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Filter by Day</label>
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Days</SelectItem>
                      <SelectItem value="monday">Monday, September 29</SelectItem>
                      <SelectItem value="tuesday">Tuesday, September 30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(scheduleData).flatMap(([dayKey, day]) => 
                    day.sessions
                      .filter(session => session.isBreakout)
                      .filter(() => {
                        if (selectedDay === 'all') return true;
                        if (selectedDay === 'monday') return dayKey === 'day2';
                        if (selectedDay === 'tuesday') return dayKey === 'day3';
                        return true;
                      })
                      .map(session => ({ ...session, dayKey, dayDate: day.date }))
                  ).map((session) => {
                    const isRegistered = user?.registeredSessions.includes(session.id.toString())
                    const firebaseSession = sessionData[session.id.toString()]
                    const currentCapacity = firebaseSession?.capacity || 50
                    const currentRegistered = firebaseSession?.registered || 0
                    const isFull = currentRegistered >= currentCapacity
                    
                    return (
                      <Card key={session.id} className="relative">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="text-sm text-blue-600 font-medium">
                              {session.dayDate}
                            </div>
                            <div className="text-right text-sm text-gray-600">
                              {currentRegistered}/{currentCapacity} registered
                            </div>
                          </div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {session.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {session.room}
                              </span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-sm text-blue-600 flex items-center gap-1">
                              <Mic className="w-4 h-4" />
                              {session.speaker}
                            </p>
                            <p className="text-sm text-gray-600">{session.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {isRegistered && (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                )}
                                {isFull && !isRegistered && (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
                                {!isFull && !isRegistered && (
                                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                                )}
                              </div>
                              
                              {isRegistered ? (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleBreakoutUnregistration(session.id.toString())}
                                >
                                  Unregister
                                </Button>
                              ) : (
                                <Button 
                                  size="sm"
                                  disabled={isFull || (user ? (() => {
                                    // Check per-day registration limits
                                    const mondaySessionIds = [14, 15, 16, 17, 19, 20, 21, 22, 24, 25, 26, 27, 29, 30, 31, 32];
                                    const tuesdaySessionIds = [44, 45, 46, 47, 49, 50, 51, 52];
                                    
                                    if (mondaySessionIds.includes(session.id)) {
                                      const mondayRegistrations = user.registeredSessions.filter(id => {
                                        const sessionObj = Object.values(scheduleData).flatMap(day => day.sessions).find(s => s.id.toString() === id);
                                        return sessionObj && mondaySessionIds.includes(sessionObj.id);
                                      });
                                      return mondayRegistrations.length >= 3;
                                    }
                                    
                                    if (tuesdaySessionIds.includes(session.id)) {
                                      const tuesdayRegistrations = user.registeredSessions.filter(id => {
                                        const sessionObj = Object.values(scheduleData).flatMap(day => day.sessions).find(s => s.id.toString() === id);
                                        return sessionObj && tuesdaySessionIds.includes(sessionObj.id);
                                      });
                                      return tuesdayRegistrations.length >= 3;
                                    }
                                    
                                    return false;
                                  })() : false)}
                                  onClick={() => handleBreakoutRegistration(session.id.toString())}
                                >
                                  {isFull ? 'Full' : 'Register'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                        {isRegistered && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-green-100 text-green-800">Registered</Badge>
                          </div>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Speakers Tab */}
          <TabsContent value="speakers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Conference Speakers
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search speakers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSpeakers.map((speaker) => (
                    <Card key={speaker.id} className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleSpeakerClick(speaker)}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-16 h-16">
                            <AvatarImage 
                              src={`/${speaker.local_image_path}`} 
                              alt={speaker.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                          {speaker.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{speaker.name}</h4>
                        <p className="text-sm text-gray-600">{speaker.title}</p>
                            {speaker.subtitle && (
                              <p className="text-xs text-blue-600">{speaker.subtitle}</p>
                            )}
                      </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Venue Map & Directions
                </CardTitle>
                <CardDescription>
                  Interactive map showing the Boulder Jewish Community Center and surrounding area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[600px] rounded-lg overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/d/u/0/embed?mid=1Fw6AJ1KfX6_3VAwll_j84-IGj2xT74s&ehbc=2E312F"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ATNS 2025 Conference Venue Map"
                  />
                        </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Boulder Jewish Community Center</h4>
                  <p className="text-sm text-blue-800">6007 Oreg Avenue, Boulder, CO 80303</p>
                  <p className="text-xs text-blue-600 mt-1">
                    Click and drag to explore the map. Use the fullscreen button for better navigation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Live Text Notifications
                </CardTitle>
                <CardDescription>
                  Stay updated with real-time conference announcements and session changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {user ? (
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">Notification Status</h3>
                        <p className="text-sm text-gray-600">
                          {user.notifications ? 'You will receive live updates' : 'Notifications are disabled'}
                        </p>
                </div>
                      <Button 
                        onClick={toggleNotifications}
                        variant={user.notifications ? "default" : "outline"}
                      >
                        {user.notifications ? (
                          <>
                            <BellOff className="w-4 h-4 mr-2" />
                            Disable
                          </>
                        ) : (
                          <>
                            <Bell className="w-4 h-4 mr-2" />
                            Enable
                          </>
                        )}
                </Button>
                  </div>
                  ) : (
                    <div className="text-center p-8 border rounded-lg">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">Sign In Required</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Please sign in to enable live text notifications
                      </p>
                      <Button onClick={() => setShowSignIn(true)}>
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                  </div>
                  )}
                  
                  <div>
                    <h3 className="font-semibold mb-3">What you'll receive:</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        Session start reminders
                  </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        Room changes and updates
                </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        Important announcements
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        Networking opportunities
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lunch Table Topics Tab */}
          <TabsContent value="lunch" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  Lunch Table Topics
                </CardTitle>
                <CardDescription>
                  Join a discussion table during lunch. Each table has limited seating.
                  {user?.lunchTableTopic && (
                    <span className="block mt-2 text-blue-600">
                      You're registered for table: {lunchTableTopics.find(t => t.id.toString() === user.lunchTableTopic)?.topic}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {lunchTableTopics.map((table) => {
                    const isRegistered = user?.lunchTableTopic === table.id.toString()
                    const isFull = table.registered >= table.capacity
                    
                    return (
                      <Card key={table.id} className="relative">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{table.topic}</h3>
                              <Badge variant="outline">
                                {table.registered}/{table.capacity}
                              </Badge>
          </div>
                            <p className="text-sm text-gray-600">
                              Host: {table.host}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {isRegistered && (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                )}
                                {isFull && !isRegistered && (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
        </div>
                              <Button 
                                size="sm"
                                disabled={isFull && !isRegistered}
                                onClick={() => handleLunchTableRegistration(table.id)}
                                variant={isRegistered ? "outline" : "default"}
                              >
                                {isRegistered ? 'Registered' : isFull ? 'Full' : 'Join Table'}
                              </Button>
      </div>
    </div>
                        </CardContent>
                        {isRegistered && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-green-100 text-green-800">Joined</Badge>
                          </div>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <SignInModal open={showSignIn} onOpenChange={setShowSignIn} />
      <SpeakerModal 
        speaker={selectedSpeaker} 
        open={showSpeakerModal} 
        onOpenChange={setShowSpeakerModal} 
      />
      <SessionDetailsModal 
        session={selectedSession} 
        open={showSessionModal} 
        onOpenChange={setShowSessionModal} 
      />
    </div>
  )
}