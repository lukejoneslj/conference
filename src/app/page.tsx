'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Combobox } from '@/components/ui/combobox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar, MapPin, Clock, Users, Search, 
  Heart, Share2, ChevronRight, Car, 
  Bookmark, Mic, Mail, FileText,
  UserPlus, LogOut, Bell, BellOff, MessageSquare,
  Map, Navigation, Utensils, CheckCircle, XCircle,
  AlertCircle, User
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

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

// Enhanced speakers data
const speakers = [
  { 
    id: 1,
    name: "Howard Schubiner", 
    title: "MD", 
    specialty: "TMS Expert", 
    initials: "HS", 
    sessions: 3,
    bio: "Dr. Howard Schubiner is a pioneer in the field of mind-body medicine and neuroplastic pain treatment.",
    email: "hschubiner@example.com",
    topics: ["Neuroplastic Pain", "Mind-Body Medicine", "TMS Treatment"]
  },
  { 
    id: 2,
    name: "David Clarke", 
    title: "MD", 
    specialty: "Psychosomatic Medicine", 
    initials: "DC", 
    sessions: 2,
    bio: "Dr. David Clarke is the president of ATNS and a leading expert in psychosomatic medicine.",
    email: "dclarke@example.com",
    topics: ["Psychosomatic Medicine", "Clinical Practice", "Patient Care"]
  },
  { 
    id: 3,
    name: "Christie Uipi", 
    title: "LCSW", 
    specialty: "Clinical Social Work", 
    initials: "CU", 
    sessions: 1,
    bio: "Christie Uipi is a licensed clinical social worker specializing in pain reprocessing therapy.",
    email: "cuipi@example.com",
    topics: ["Pain Reprocessing", "Therapy Techniques", "Emotional Processing"]
  }
]

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
  speaker: typeof speakers[0] | null, 
  open: boolean, 
  onOpenChange: (open: boolean) => void 
}) {
  if (!speaker) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                {speaker.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div>{speaker.name}</div>
              <div className="text-sm text-gray-600 font-normal">{speaker.title}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Specialty</h4>
            <p className="text-sm text-gray-600">{speaker.specialty}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Biography</h4>
            <p className="text-sm text-gray-600">{speaker.bio}</p>
        </div>
              <div>
            <h4 className="font-semibold mb-2">Topics</h4>
            <div className="flex flex-wrap gap-1">
              {speaker.topics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {topic}
                                  </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Sessions</h4>
            <Badge>{speaker.sessions} session{speaker.sessions !== 1 ? 's' : ''}</Badge>
                </div>
          <div className="pt-2">
                <Button className="w-full" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
              Contact Speaker
                </Button>
          </div>
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
  const [selectedSpeaker, setSelectedSpeaker] = useState<typeof speakers[0] | null>(null)
  const [showSpeakerModal, setShowSpeakerModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string>('all')
  
  const { user, signOut, registerForSession, unregisterFromSession, registerForLunchTable, toggleNotifications, sessionData } = useAuth()

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSpeakerClick = (speaker: typeof speakers[0]) => {
    setSelectedSpeaker(speaker)
    setShowSpeakerModal(true)
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

  const currentSession = {
    title: "Session #1: Hand to Heart: An Opportunity for Healing with Neuroplastic Symptoms",
    speaker: "Monica Fitzgerald, PhD + Rita Gupta, DO MPA",
    room: "Main Auditorium",
    timeRemaining: "23 minutes",
    nextSession: "Break"
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
        {/* Current Session Alert */}
        <Card className="mb-6 border-l-4 border-l-green-500 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900">Current Session</h3>
                <p className="text-green-800">{currentSession.title}</p>
                <p className="text-sm text-green-700">
                  {currentSession.speaker} • {currentSession.room}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-700">Time Remaining</p>
                <p className="text-2xl font-bold text-green-900">{currentSession.timeRemaining}</p>
                <p className="text-xs text-green-600">Next: {currentSession.nextSession}</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                          <div key={session.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                            session.type === 'concurrent' ? 'ml-4 border-l-4 border-l-blue-200 bg-blue-50/30' : ''
                          }`}>
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
                                <h3 className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-blue-600" 
                                    onClick={() => session.speaker && handleSpeakerClick(speakers.find(s => session.speaker?.includes(s.name)) || speakers[0])}>
                                  {session.title}
                                </h3>
                                {session.speaker && (
                                  <p className="text-sm text-blue-600 mb-2 flex items-center gap-1 cursor-pointer hover:underline"
                                     onClick={() => handleSpeakerClick(speakers.find(s => session.speaker?.includes(s.name)) || speakers[0])}>
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
                                <Button size="sm" variant="outline">
                                  <Bookmark className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
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
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                          {speaker.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{speaker.name}</h4>
                        <p className="text-sm text-gray-600">{speaker.title}</p>
                        <p className="text-xs text-blue-600">{speaker.specialty}</p>
                            <Badge variant="secondary" className="mt-1">
                              {speaker.sessions} session{speaker.sessions !== 1 ? 's' : ''}
                            </Badge>
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
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Room Locations</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Main Auditorium</h4>
                          <p className="text-sm text-gray-600">Keynotes & Main Sessions</p>
                        </div>
                        <Badge>Ground Floor</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Room A</h4>
                          <p className="text-sm text-gray-600">Breakout Sessions</p>
                        </div>
                        <Badge>2nd Floor</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Room B</h4>
                          <p className="text-sm text-gray-600">Breakout Sessions</p>
                        </div>
                        <Badge>2nd Floor</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Room C</h4>
                          <p className="text-sm text-gray-600">Breakout Sessions</p>
                        </div>
                        <Badge>3rd Floor</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Dining Area</h4>
                          <p className="text-sm text-gray-600">Meals & Networking</p>
                        </div>
                        <Badge>Ground Floor</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Venue Information</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Boulder Jewish Community Center</h4>
                        <p className="text-sm text-gray-600 mb-2">6007 Oreg Avenue<br/>Boulder, CO 80303</p>
                        <Button size="sm" className="w-full">
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                </Button>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Parking</h4>
                        <p className="text-sm text-gray-600 mb-2">Free parking available in the main lot. Overflow parking in adjacent lots.</p>
                        <Button size="sm" variant="outline" className="w-full">
                  <Car className="w-4 h-4 mr-2" />
                          Parking Details
                </Button>
                </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">WiFi & Contact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>WiFi:</span>
                    <span className="font-medium">ATNS2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency:</span>
                    <span className="font-medium">ext. 911</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Organizers:</span>
                    <span className="font-medium">ext. 100</span>
                  </div>
                </div>
                      </div>
                    </div>
                  </div>
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
    </div>
  )
}