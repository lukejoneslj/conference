'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, MapPin, Clock, Users, Search, 
  Heart, Share2, ChevronRight, Coffee, Car, 
  Bookmark, Video, Mic, Phone, Mail, FileText
} from 'lucide-react'
import Link from 'next/link'

// ATNS 2025 Conference Schedule
const scheduleData = {
  'day1': {
    date: 'Sunday, September 28, 2025',
    sessions: [
      {
        id: 1,
        time: '12:30 PM',
        title: 'Conference Check-In Opens',
        type: 'registration',
        room: 'Main Lobby',
        speaker: null,
        description: 'Registration and badge pickup',
        favorite: false
      },
      {
        id: 2,
        time: '1:50 PM',
        title: 'Welcome Announcement',
        type: 'announcement',
        room: 'Main Auditorium',
        speaker: null,
        description: 'Official conference welcome',
        favorite: false
      },
      {
        id: 3,
        time: '2:00 PM - 3:00 PM',
        title: 'Session #1: Hand to Heart: An Opportunity for Healing with Neuroplastic Symptoms',
        type: 'session',
        room: 'Main Auditorium',
        speaker: 'Monica Fitzgerald, PhD + Rita Gupta, DO MPA',
        description: 'An opportunity for healing with neuroplastic symptoms',
        favorite: false
      },
      {
        id: 4,
        time: '3:00 PM - 3:15 PM',
        title: 'Break',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Refreshment break',
        favorite: false
      },
      {
        id: 5,
        time: '3:15 PM - 4:15 PM',
        title: 'Session #2: New Research in Neuroplastic Symptoms',
        type: 'session',
        room: 'Main Auditorium',
        speaker: 'Howard Schubiner, MD + Dan Kaufmann, PhD + Paul Hansma, PhD + Marjorie Heule, MS + Lisa E. Baranik, PhD',
        description: 'Latest research findings in neuroplastic symptoms',
        favorite: true
      },
      {
        id: 6,
        time: '4:15 PM',
        title: 'Closing Remarks',
        type: 'announcement',
        room: 'Main Auditorium',
        speaker: null,
        description: 'Day 1 closing remarks',
        favorite: false
      },
      {
        id: 7,
        time: '4:30 PM - 6:00 PM',
        title: 'Welcome Reception',
        type: 'social',
        room: 'Reception Area',
        speaker: null,
        description: 'Welcome reception and networking',
        favorite: false
      }
    ]
  },
  'day2': {
    date: 'Monday, September 29, 2025',
    sessions: [
      {
        id: 8,
        time: '8:00 AM',
        title: 'Breakfast & Interest Group Session',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Breakfast and interest group discussions',
        favorite: false
      },
      {
        id: 9,
        time: '9:00 AM - 10:00 AM',
        title: 'Session #3: Pain Reprocessing Therapy, Advanced Skills: Working with Emotions and the Self',
        type: 'session',
        room: 'Main Auditorium',
        speaker: 'Christie Uipi, LCSW + Vanessa Blackstone, MSW, ACSW',
        description: 'Advanced skills in pain reprocessing therapy',
        favorite: true
      },
      {
        id: 10,
        time: '10:00 AM - 10:15 AM',
        title: 'Break',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Short break',
        favorite: false
      },
      {
        id: 11,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #4A: Finding Common Threads: Using Experiential Mind/Body Approaches to Address Sexual Challenges',
        type: 'concurrent',
        room: 'Room A',
        speaker: 'Lillian Bailey, MS, LMFT, CST',
        description: 'Experiential mind/body approaches for sexual challenges',
        favorite: false
      },
      {
        id: 12,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #4B: Fundamentals of Neuroplastic Pain Syndrome',
        type: 'concurrent',
        room: 'Room B',
        speaker: 'David Schechter, MD',
        description: 'Fundamentals of neuroplastic pain syndrome',
        favorite: false
      },
      {
        id: 13,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #4C: Embody Your Message',
        type: 'concurrent',
        room: 'Room C',
        speaker: 'Camille Thoman',
        description: 'Embodying your therapeutic message',
        favorite: false
      },
      {
        id: 14,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #4D: Practical Somatics',
        type: 'concurrent',
        room: 'Room D',
        speaker: 'Karden Rabin & Alexander Rosan',
        description: 'Practical somatic approaches',
        favorite: false
      },
      {
        id: 15,
        time: '11:15 AM - 11:30 AM',
        title: 'Break',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Short break',
        favorite: false
      },
      {
        id: 16,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #5A: Does Postural Tachycardia Syndrome (POTS) reflect an error in our survival circuits?',
        type: 'concurrent',
        room: 'Room A',
        speaker: 'Thomas Chelimsky, MD',
        description: 'POTS and survival circuits',
        favorite: false
      },
      {
        id: 17,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #5B: Integrating Neuroplastic Principles and Treatment into Frontline Healthcare',
        type: 'concurrent',
        room: 'Room B',
        speaker: 'Geoffrey Keenan, MD + Jonathan Takahashi, MD, MPH',
        description: 'Integration into frontline healthcare',
        favorite: false
      },
      {
        id: 18,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #5C: Cultivating a Felt-Sense of Internal and External Safety to Heal Neuroplastic Symptoms',
        type: 'concurrent',
        room: 'Room C',
        speaker: 'Mags Clark-Smith, MA, PGCE, BCPT, BMC Dip & Jennifer Franklin, PhD',
        description: 'Cultivating safety for healing',
        favorite: false
      },
      {
        id: 19,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #5D: Brain-Mind-Body (BMB) Takeaways from 25 years of the Lightning Process (LP)',
        type: 'concurrent',
        room: 'Room D',
        speaker: 'Phil Parker, PhD, DO, Dip E Hyp Psych',
        description: 'Lightning Process insights',
        favorite: false
      },
      {
        id: 20,
        time: '12:30 PM - 1:45 PM',
        title: 'Lunch with Table Discussions',
        type: 'break',
        room: 'Dining Area',
        speaker: null,
        description: 'Lunch and table discussions',
        favorite: false
      },
      {
        id: 21,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #6A: Difficult Cases Seminar For Therapists',
        type: 'concurrent',
        room: 'Room A',
        speaker: 'Jeffrey H. Axelbank, Psy.D. & David Clarke, MD',
        description: 'Handling difficult therapeutic cases',
        favorite: false
      },
      {
        id: 22,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #6B: Targeting the Root Causes of Chronic Pain in Emotional Awareness and Expression Therapy',
        type: 'concurrent',
        room: 'Room B',
        speaker: 'Shoshana Krohner, PhD + Mark Lumley, PhD',
        description: 'Emotional awareness and expression therapy',
        favorite: false
      },
      {
        id: 23,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #6C: Science and Stories to Decode Chronic Fatigue',
        type: 'concurrent',
        room: 'Room C',
        speaker: 'Rebecca Kennedy, MD & Rebecca Tolin',
        description: 'Understanding chronic fatigue',
        favorite: false
      },
      {
        id: 24,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #6D: Practical Somatics',
        type: 'concurrent',
        room: 'Room D',
        speaker: 'Karden Rabin & Alexander Rosan',
        description: 'Practical somatic approaches',
        favorite: false
      },
      {
        id: 25,
        time: '2:45 PM - 3:00 PM',
        title: 'Break',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Short break',
        favorite: false
      },
      {
        id: 26,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #7A: Building a movement for change: What (Recovered) patients and professionals can achieve together',
        type: 'concurrent',
        room: 'Room A',
        speaker: 'Marjon Oomens, MsC',
        description: 'Building collaborative movements',
        favorite: false
      },
      {
        id: 27,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #7B: Introduction to EMDR therapy, Is it really that good?',
        type: 'concurrent',
        room: 'Room B',
        speaker: 'Michelle Gottlieb, Psy.D., MFT, LPCC',
        description: 'Introduction to EMDR therapy',
        favorite: false
      },
      {
        id: 28,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #7C: How to Help Men with Pelvic & Sexual Issues (even the hard cases)',
        type: 'concurrent',
        room: 'Room C',
        speaker: 'Michael Hodge',
        description: 'Treating male pelvic and sexual issues',
        favorite: false
      },
      {
        id: 29,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #7D: From Fear to Freedom: Teaching Patients to Trust Their Bodies Again',
        type: 'concurrent',
        room: 'Room D',
        speaker: 'Leonida Tansinsin, MPT',
        description: 'Rebuilding body trust',
        favorite: false
      },
      {
        id: 30,
        time: '4:00 PM - 4:15 PM',
        title: 'Break',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Short break',
        favorite: false
      },
      {
        id: 31,
        time: '4:15 PM - 5:15 PM',
        title: 'Session #8: Exploring the State of the Science of Chronic Lyme and Mold',
        type: 'session',
        room: 'Main Auditorium',
        speaker: 'Kate Smith, N.D.',
        description: 'Science of chronic Lyme and mold',
        favorite: false
      },
      {
        id: 32,
        time: '5:15 PM - 5:20 PM',
        title: 'Closing Remarks',
        type: 'announcement',
        room: 'Main Auditorium',
        speaker: null,
        description: 'Day 2 closing remarks',
        favorite: false
      },
      {
        id: 33,
        time: '5:45 PM - 7:00 PM',
        title: 'Optional Happy Hour Gathering',
        type: 'social',
        room: 'Reception Area',
        speaker: null,
        description: 'Optional happy hour gathering',
        favorite: false
      }
    ]
  },
  'day3': {
    date: 'Tuesday, September 30, 2025',
    sessions: [
      {
        id: 34,
        time: '8:00 AM',
        title: 'Breakfast & Interest Group Session',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Breakfast and interest group discussions',
        favorite: false
      },
      {
        id: 35,
        time: '9:00 AM - 10:00 AM',
        title: 'Session #9: Feeling Safe Enough to Heal: Treating Trauma, Addiction and Chronic Pain',
        type: 'session',
        room: 'Main Auditorium',
        speaker: 'Les Aria, PhD',
        description: 'Creating safety for healing trauma, addiction, and chronic pain',
        favorite: false
      },
      {
        id: 36,
        time: '10:00 AM - 10:15 AM',
        title: 'Break',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Short break',
        favorite: false
      },
      {
        id: 37,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #10A: An Experiential Emotion-Focused Approach to Understanding and Treating Psychogenic Non-Epileptic Attacks (PNEA)',
        type: 'concurrent',
        room: 'Room A',
        speaker: 'William H. Watson, PhD',
        description: 'Emotion-focused approach to PNEA',
        favorite: false
      },
      {
        id: 38,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #10B: Targeting the Root Causes of Chronic Pain in Emotional Awareness and Expression Therapy',
        type: 'concurrent',
        room: 'Room B',
        speaker: 'Shoshana Krohner, PhD + Mark A. Lumley, PhD',
        description: 'Emotional awareness and expression therapy',
        favorite: false
      },
      {
        id: 39,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #10C: Introduction to EMDR therapy, Is it really that good?',
        type: 'concurrent',
        room: 'Room C',
        speaker: 'Michelle Gottlieb, Psy.D., MFT, LPCC',
        description: 'Introduction to EMDR therapy',
        favorite: false
      },
      {
        id: 40,
        time: '10:15 AM - 11:15 AM',
        title: 'Session #10D: Brain-Mind-Body (BMB) Takeaways from 25 years of the Lightning Process (LP)',
        type: 'concurrent',
        room: 'Room D',
        speaker: 'Phil Parker, PhD, DO, Dip E Hyp Psych',
        description: 'Lightning Process insights',
        favorite: false
      },
      {
        id: 41,
        time: '11:15 AM - 11:30 AM',
        title: 'Break',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Short break',
        favorite: false
      },
      {
        id: 42,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #11A: Psychedelic Medicine: from Neuroplasticity to Transcendence – An Overview',
        type: 'concurrent',
        room: 'Room A',
        speaker: 'Matt McClanahan, DO, MA',
        description: 'Overview of psychedelic medicine',
        favorite: false
      },
      {
        id: 43,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #11B: Treating the Trauma Caused by Chronic Pain & Symptoms',
        type: 'concurrent',
        room: 'Room B',
        speaker: 'Alex Klassen, MSW, RSW + Tanner Murtagh, MSW, RSW',
        description: 'Treating trauma from chronic pain',
        favorite: false
      },
      {
        id: 44,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #11C: Embody Your Message',
        type: 'concurrent',
        room: 'Room C',
        speaker: 'Camille Thoman',
        description: 'Embodying your therapeutic message',
        favorite: false
      },
      {
        id: 45,
        time: '11:30 AM - 12:30 PM',
        title: 'Session #11D: From Fear to Freedom: Teaching Patients to Trust Their Bodies Again',
        type: 'concurrent',
        room: 'Room D',
        speaker: 'Leonida Tansinsin, MPT',
        description: 'Rebuilding body trust',
        favorite: false
      },
      {
        id: 46,
        time: '12:30 PM - 1:45 PM',
        title: 'Lunch Break with Table Discussions',
        type: 'break',
        room: 'Dining Area',
        speaker: null,
        description: 'Lunch and table discussions',
        favorite: false
      },
      {
        id: 47,
        time: '1:45 PM - 2:45 PM',
        title: 'Session #12: Stigma as a Stressor: How Anti-Fat Bias Influences Neuroplastic Symptoms',
        type: 'session',
        room: 'Main Auditorium',
        speaker: 'Deb Malkin, Amy Schere, MSW, LCSWA, PT, DPT',
        description: 'Impact of anti-fat bias on neuroplastic symptoms',
        favorite: false
      },
      {
        id: 48,
        time: '2:45 PM - 3:00 PM',
        title: 'Break',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Short break',
        favorite: false
      },
      {
        id: 49,
        time: '3:00 PM - 4:00 PM',
        title: 'Session #13: Neuroplastic Symptoms of the Ear: Tinnitus, Sound Sensitivity and Dizziness',
        type: 'session',
        room: 'Main Auditorium',
        speaker: 'Yonit Arthur, AuD & Marcia Dewey, AuD, CCC/A',
        description: 'Neuroplastic symptoms affecting the ear',
        favorite: false
      },
      {
        id: 50,
        time: '4:00 PM',
        title: 'ATNS President David Clarke, MD - Closing Remarks',
        type: 'announcement',
        room: 'Main Auditorium',
        speaker: 'David Clarke, MD',
        description: 'ATNS President closing remarks',
        favorite: false
      },
      {
        id: 51,
        time: '4:30 PM',
        title: 'ATNS Board - Closing Remarks',
        type: 'announcement',
        room: 'Main Auditorium',
        speaker: 'ATNS Board',
        description: 'ATNS Board closing remarks',
        favorite: false
      },
      {
        id: 52,
        time: '5:00 PM - 6:30 PM',
        title: 'Optional Happy Hour Gathering',
        type: 'social',
        room: 'Reception Area',
        speaker: null,
        description: 'Final networking gathering',
        favorite: false
      }
    ]
  }
}

const speakers = [
  { name: "Howard Schubiner", title: "MD", specialty: "TMS Expert", initials: "HS", sessions: 3 },
  { name: "David Clarke", title: "MD", specialty: "Psychosomatic Medicine", initials: "DC", sessions: 2 },
  { name: "David Schechter", title: "MD", specialty: "Pain Medicine", initials: "DS", sessions: 2 },
  { name: "Mark Lumley", title: "PhD", specialty: "Psychology", initials: "ML", sessions: 2 },
  { name: "Christie Uipi", title: "LCSW", specialty: "Clinical Social Work", initials: "CU", sessions: 1 },
  { name: "Amy Schere", title: "MSW, LCSWA, PT, DPT", specialty: "Physical Therapy", initials: "AS", sessions: 1 },
  { name: "Jennifer Franklin", title: "PhD", specialty: "Child Psychology", initials: "JF", sessions: 1 },
  { name: "Paul Hansma", title: "PhD", specialty: "Technology Integration", initials: "PH", sessions: 1 },
  { name: "Geoffrey Keenan", title: "MD", specialty: "Practice Management", initials: "GK", sessions: 1 },
  { name: "Rebecca Kennedy", title: "MD", specialty: "Research", initials: "RK", sessions: 1 },
  { name: "Kate Smith", title: "ND", specialty: "Naturopathic Medicine", initials: "KS", sessions: 1 },
  { name: "Vanessa Blackstone", title: "MSW, ACSW", specialty: "Patient Advocacy", initials: "VB", sessions: 1 }
]

const currentSession = {
  title: "Session #1: Hand to Heart: An Opportunity for Healing with Neuroplastic Symptoms",
  speaker: "Monica Fitzgerald, PhD + Rita Gupta, DO MPA",
  room: "Main Auditorium",
  timeRemaining: "23 minutes",
  nextSession: "Break"
}

const getSessionTypeColor = (type: string) => {
  switch (type) {
    case 'keynote': return 'bg-blue-100 text-blue-800'
    case 'session': return 'bg-green-100 text-green-800'
    case 'workshop': return 'bg-purple-100 text-purple-800'
    case 'panel': return 'bg-orange-100 text-orange-800'
    case 'break': return 'bg-gray-100 text-gray-800'
    case 'social': return 'bg-pink-100 text-pink-800'
    case 'roundtable': return 'bg-yellow-100 text-yellow-800'
    case 'breakout': return 'bg-indigo-100 text-indigo-800'
    case 'concurrent': return 'bg-teal-100 text-teal-800'
    case 'announcement': return 'bg-red-100 text-red-800'
    case 'registration': return 'bg-slate-100 text-slate-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function ConferenceHub() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [activeDay, setActiveDay] = React.useState('day1')

  const filteredSpeakers = speakers.filter(speaker =>
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    speaker.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              <Button size="lg" variant="default" asChild>
                <Link href="/">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule
                </Link>
              </Button>
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day1">Day 1 (Today)</TabsTrigger>
                <TabsTrigger value="day2">Day 2</TabsTrigger>
                <TabsTrigger value="day3">Day 3</TabsTrigger>
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
                          <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={getSessionTypeColor(session.type)}>
                                    {session.type}
                                  </Badge>
                                  <span className="text-sm text-gray-600 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {session.time}
                                  </span>
                                  <span className="text-sm text-gray-600 flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {session.room}
                                  </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                                {session.speaker && (
                                  <p className="text-sm text-blue-600 mb-2 flex items-center gap-1">
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Speaker Directory */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Speakers
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
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredSpeakers.map((speaker, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-sm font-semibold bg-blue-100 text-blue-600">
                          {speaker.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{speaker.name}</h4>
                        <p className="text-sm text-gray-600">{speaker.title}</p>
                        <p className="text-xs text-blue-600">{speaker.specialty}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{speaker.sessions}</Badge>
                        <ChevronRight className="w-4 h-4 text-gray-400 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  Join Virtual Sessions
                </Button>
                <Button className="w-full" variant="outline">
                  <Coffee className="w-4 h-4 mr-2" />
                  Find Coffee Stations
                </Button>
                <Button className="w-full" variant="outline">
                  <Car className="w-4 h-4 mr-2" />
                  Parking Information
                </Button>
                <Button className="w-full" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Organizers
                </Button>
              </CardContent>
            </Card>

            {/* Venue Info */}
            <Card>
              <CardHeader>
                <CardTitle>Venue Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Boulder Jewish Community Center</p>
                  <p className="text-gray-600">6007 Oreg Avenue</p>
                  <p className="text-gray-600">Boulder, CO 80303</p>
                </div>
                <Separator />
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
                <Button className="w-full" size="sm" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  info@symptomatic.me
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
