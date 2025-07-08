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

// Mock schedule data for 3 days
const scheduleData = {
  'day1': {
    date: 'Sunday, September 28, 2025',
    sessions: [
      {
        id: 1,
        time: '12:00 PM - 12:30 PM',
        title: 'Registration & Welcome Coffee',
        type: 'registration',
        room: 'Main Lobby',
        speaker: null,
        description: 'Check-in, badge pickup, and networking coffee'
      },
      {
        id: 2,
        time: '12:30 PM - 1:15 PM',
        title: 'Opening Keynote: The Future of Neuroplastic Treatment',
        type: 'keynote',
        room: 'Main Auditorium',
        speaker: 'Dr. Howard Schubiner',
        description: 'Opening address on breakthrough approaches in neuroplastic symptoms treatment',
        favorite: false
      },
      {
        id: 3,
        time: '1:30 PM - 2:15 PM',
        title: 'Understanding Pain Neuroplasticity',
        type: 'session',
        room: 'Conference Room A',
        speaker: 'Dr. David Schechter',
        description: 'Deep dive into the mechanisms of neuroplastic pain',
        favorite: true
      },
      {
        id: 4,
        time: '1:30 PM - 2:15 PM',
        title: 'Trauma-Informed Care Approaches',
        type: 'session',
        room: 'Conference Room B',
        speaker: 'Dr. Mark Lumley',
        description: 'Integrating trauma-informed principles in treatment',
        favorite: false
      },
      {
        id: 5,
        time: '2:15 PM - 2:45 PM',
        title: 'Coffee Break & Networking',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Sponsored by Boulder Coffee Collective'
      },
      {
        id: 6,
        time: '2:45 PM - 3:30 PM',
        title: 'Panel: Clinical Applications',
        type: 'panel',
        room: 'Main Auditorium',
        speaker: 'Multiple Speakers',
        description: 'Real-world application stories from leading practitioners',
        favorite: false
      },
      {
        id: 7,
        time: '3:45 PM - 4:30 PM',
        title: 'Hands-on Workshop: Assessment Techniques',
        type: 'workshop',
        room: 'Workshop Room 1',
        speaker: 'Dr. Christie Uipi',
        description: 'Interactive workshop on patient assessment methods',
        favorite: true
      },
      {
        id: 8,
        time: '5:00 PM - 6:30 PM',
        title: 'Welcome Reception',
        type: 'social',
        room: 'Outdoor Patio',
        speaker: null,
        description: 'Networking reception with local catering and drinks'
      }
    ]
  },
  'day2': {
    date: 'Monday, September 29, 2025',
    sessions: [
      {
        id: 9,
        time: '8:00 AM - 9:00 AM',
        title: 'Breakfast & Networking',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Continental breakfast and morning networking'
      },
      {
        id: 10,
        time: '9:00 AM - 9:45 AM',
        title: 'Keynote: Advances in Mind-Body Medicine',
        type: 'keynote',
        room: 'Main Auditorium',
        speaker: 'Dr. David Clarke',
        description: 'Latest research in psychosomatic medicine approaches',
        favorite: false
      },
      {
        id: 11,
        time: '10:00 AM - 10:45 AM',
        title: 'Pediatric Neuroplastic Symptoms',
        type: 'session',
        room: 'Conference Room A',
        speaker: 'Dr. Jennifer Franklin',
        description: 'Specialized approaches for children and adolescents',
        favorite: true
      },
      {
        id: 12,
        time: '10:00 AM - 10:45 AM',
        title: 'Technology in Treatment',
        type: 'session',
        room: 'Conference Room B',
        speaker: 'Dr. Paul Hansma',
        description: 'Digital tools and apps for patient care',
        favorite: false
      },
      {
        id: 13,
        time: '11:00 AM - 11:45 AM',
        title: 'Research Roundtable',
        type: 'roundtable',
        room: 'Workshop Room 2',
        speaker: 'Research Committee',
        description: 'Latest studies and ongoing research projects',
        favorite: false
      },
      {
        id: 14,
        time: '12:00 PM - 1:00 PM',
        title: 'Lunch & Poster Session',
        type: 'break',
        room: 'Exhibition Hall',
        speaker: null,
        description: 'Lunch with poster presentations from attendees'
      },
      {
        id: 15,
        time: '1:15 PM - 2:45 PM',
        title: 'Intensive Workshop: Treatment Protocols',
        type: 'workshop',
        room: 'Workshop Room 1',
        speaker: 'Dr. Amy Schere',
        description: 'Extended hands-on training session',
        favorite: true
      },
      {
        id: 16,
        time: '3:00 PM - 3:45 PM',
        title: 'Case Study Presentations',
        type: 'session',
        room: 'Conference Room A',
        speaker: 'Multiple Presenters',
        description: 'Real patient cases and treatment outcomes',
        favorite: false
      },
      {
        id: 17,
        time: '4:00 PM - 5:00 PM',
        title: 'Special Interest Groups',
        type: 'breakout',
        room: 'Various Rooms',
        speaker: 'Group Leaders',
        description: 'Small group discussions by specialty',
        favorite: false
      }
    ]
  },
  'day3': {
    date: 'Tuesday, September 30, 2025',
    sessions: [
      {
        id: 18,
        time: '8:00 AM - 9:00 AM',
        title: 'Breakfast & Final Networking',
        type: 'break',
        room: 'Main Lobby',
        speaker: null,
        description: 'Last chance networking over breakfast'
      },
      {
        id: 19,
        time: '9:00 AM - 9:45 AM',
        title: 'Patient Advocacy & Communication',
        type: 'session',
        room: 'Main Auditorium',
        speaker: 'Vanessa Blackstone',
        description: 'Effective patient communication strategies',
        favorite: false
      },
      {
        id: 20,
        time: '10:00 AM - 10:45 AM',
        title: 'Building Your Practice',
        type: 'session',
        room: 'Conference Room A',
        speaker: 'Dr. Geoffrey Keenan',
        description: 'Business aspects of neuroplastic symptom treatment',
        favorite: true
      },
      {
        id: 21,
        time: '11:00 AM - 12:00 PM',
        title: 'Q&A with Leading Experts',
        type: 'panel',
        room: 'Main Auditorium',
        speaker: 'Panel of Experts',
        description: 'Open forum with conference faculty',
        favorite: false
      },
      {
        id: 22,
        time: '12:15 PM - 1:15 PM',
        title: 'Lunch & Awards Ceremony',
        type: 'break',
        room: 'Main Auditorium',
        speaker: null,
        description: 'Recognition of contributions to the field'
      },
      {
        id: 23,
        time: '1:30 PM - 2:15 PM',
        title: 'Future Directions & Research',
        type: 'session',
        room: 'Conference Room A',
        speaker: 'Dr. Rebecca Kennedy',
        description: 'Emerging trends and future research opportunities',
        favorite: false
      },
      {
        id: 24,
        time: '2:30 PM - 3:15 PM',
        title: 'Implementation Strategies',
        type: 'workshop',
        room: 'Workshop Room 1',
        speaker: 'Dr. Kate Smith',
        description: 'Taking learnings back to your practice',
        favorite: true
      },
      {
        id: 25,
        time: '3:30 PM - 4:15 PM',
        title: 'Closing Keynote: Moving Forward Together',
        type: 'keynote',
        room: 'Main Auditorium',
        speaker: 'Dr. Howard Schubiner',
        description: 'Closing thoughts and call to action',
        favorite: false
      },
      {
        id: 26,
        time: '4:15 PM - 5:00 PM',
        title: 'Closing Reception & Farewells',
        type: 'social',
        room: 'Main Lobby',
        speaker: null,
        description: 'Final networking and conference conclusion'
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
  title: "Understanding Pain Neuroplasticity",
  speaker: "Dr. David Schechter",
  room: "Conference Room A",
  timeRemaining: "23 minutes",
  nextSession: "Coffee Break & Networking"
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
