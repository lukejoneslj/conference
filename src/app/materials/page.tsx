'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  Calendar, Search, FileText, Download, 
  Video, Presentation, Eye, Star
} from 'lucide-react'
import Link from 'next/link'

// Mock conference materials data
const materials = {
  slideshows: [
    {
      id: 1,
      title: "Opening Keynote: The Future of Neuroplastic Treatment",
      speaker: "Dr. Howard Schubiner",
      session: "Day 1 - Keynote",
      downloadUrl: "/slides/schubiner-keynote.pdf",
      viewUrl: "/slides/schubiner-keynote",
      fileSize: "2.4 MB",
      pages: 45,
      downloadCount: 127,
      rating: 4.9,
      tags: ["keynote", "neuroplasticity", "future-directions"]
    },
    {
      id: 2,
      title: "Understanding Pain Neuroplasticity",
      speaker: "Dr. David Schechter",
      session: "Day 1 - Session",
      downloadUrl: "/slides/schechter-pain.pdf",
      viewUrl: "/slides/schechter-pain",
      fileSize: "3.1 MB",
      pages: 52,
      downloadCount: 89,
      rating: 4.8,
      tags: ["pain", "neuroplasticity", "mechanisms"]
    },
    {
      id: 3,
      title: "Trauma-Informed Care Approaches",
      speaker: "Dr. Mark Lumley",
      session: "Day 1 - Session",
      downloadUrl: "/slides/lumley-trauma.pdf",
      viewUrl: "/slides/lumley-trauma",
      fileSize: "1.8 MB",
      pages: 38,
      downloadCount: 104,
      rating: 4.7,
      tags: ["trauma", "care-approaches", "psychology"]
    },
    {
      id: 4,
      title: "Assessment Techniques Workshop",
      speaker: "Dr. Christie Uipi",
      session: "Day 1 - Workshop",
      downloadUrl: "/slides/uipi-assessment.pdf",
      viewUrl: "/slides/uipi-assessment",
      fileSize: "4.2 MB",
      pages: 67,
      downloadCount: 156,
      rating: 4.9,
      tags: ["workshop", "assessment", "techniques"]
    },
    {
      id: 5,
      title: "Advances in Mind-Body Medicine",
      speaker: "Dr. David Clarke",
      session: "Day 2 - Keynote",
      downloadUrl: "/slides/clarke-mindbody.pdf",
      viewUrl: "/slides/clarke-mindbody",
      fileSize: "2.8 MB",
      pages: 41,
      downloadCount: 93,
      rating: 4.8,
      tags: ["mind-body", "medicine", "advances"]
    },
    {
      id: 6,
      title: "Pediatric Neuroplastic Symptoms",
      speaker: "Dr. Jennifer Franklin",
      session: "Day 2 - Session",
      downloadUrl: "/slides/franklin-pediatric.pdf",
      viewUrl: "/slides/franklin-pediatric",
      fileSize: "2.2 MB",
      pages: 33,
      downloadCount: 78,
      rating: 4.6,
      tags: ["pediatric", "children", "symptoms"]
    },
    {
      id: 7,
      title: "Technology in Treatment",
      speaker: "Dr. Paul Hansma",
      session: "Day 2 - Session",
      downloadUrl: "/slides/hansma-technology.pdf",
      viewUrl: "/slides/hansma-technology",
      fileSize: "3.5 MB",
      pages: 58,
      downloadCount: 112,
      rating: 4.7,
      tags: ["technology", "digital-tools", "innovation"]
    },
    {
      id: 8,
      title: "Treatment Protocols Workshop",
      speaker: "Dr. Amy Schere",
      session: "Day 2 - Workshop",
      downloadUrl: "/slides/schere-protocols.pdf",
      viewUrl: "/slides/schere-protocols",
      fileSize: "5.1 MB",
      pages: 78,
      downloadCount: 145,
      rating: 4.9,
      tags: ["workshop", "protocols", "treatment"]
    }
  ],
  handouts: [
    {
      id: 1,
      title: "Neuroplastic Symptoms Assessment Checklist",
      description: "Comprehensive checklist for evaluating neuroplastic symptoms",
      downloadUrl: "/handouts/assessment-checklist.pdf",
      fileSize: "245 KB",
      downloadCount: 234,
      tags: ["assessment", "checklist", "evaluation"]
    },
    {
      id: 2,
      title: "Patient Education Handout - Understanding TMS",
      description: "Patient-friendly explanation of Tension Myositis Syndrome",
      downloadUrl: "/handouts/tms-patient-education.pdf",
      fileSize: "380 KB",
      downloadCount: 189,
      tags: ["patient-education", "tms", "explanation"]
    },
    {
      id: 3,
      title: "Treatment Planning Worksheet",
      description: "Structured worksheet for developing treatment plans",
      downloadUrl: "/handouts/treatment-planning.pdf",
      fileSize: "190 KB",
      downloadCount: 167,
      tags: ["treatment", "planning", "worksheet"]
    },
    {
      id: 4,
      title: "Mindfulness Exercises for Pain Management",
      description: "Collection of guided mindfulness exercises",
      downloadUrl: "/handouts/mindfulness-exercises.pdf",
      fileSize: "420 KB",
      downloadCount: 203,
      tags: ["mindfulness", "exercises", "pain-management"]
    },
    {
      id: 5,
      title: "Trauma-Informed Care Guidelines",
      description: "Best practices for trauma-informed approaches",
      downloadUrl: "/handouts/trauma-informed-guidelines.pdf",
      fileSize: "310 KB",
      downloadCount: 156,
      tags: ["trauma", "guidelines", "best-practices"]
    }
  ],
  recordings: [
    {
      id: 1,
      title: "Opening Keynote Recording",
      speaker: "Dr. Howard Schubiner",
      duration: "45 minutes",
      viewUrl: "/recordings/schubiner-keynote",
      thumbnailUrl: "/thumbnails/schubiner-keynote.jpg",
      viewCount: 342,
      tags: ["keynote", "recording", "video"]
    },
    {
      id: 2,
      title: "Panel Discussion: Clinical Applications",
      speaker: "Multiple Speakers",
      duration: "52 minutes",
      viewUrl: "/recordings/clinical-panel",
      thumbnailUrl: "/thumbnails/clinical-panel.jpg",
      viewCount: 278,
      tags: ["panel", "discussion", "clinical"]
    },
    {
      id: 3,
      title: "Workshop: Assessment Techniques",
      speaker: "Dr. Christie Uipi",
      duration: "38 minutes",
      viewUrl: "/recordings/assessment-workshop",
      thumbnailUrl: "/thumbnails/assessment-workshop.jpg",
      viewCount: 189,
      tags: ["workshop", "assessment", "techniques"]
    }
  ]
}

export default function MaterialsPage() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [activeTab, setActiveTab] = React.useState('slideshows')

  const filteredMaterials = React.useMemo(() => {
    type MaterialItem = {
      id: number
      title: string
      speaker?: string
      description?: string
      tags: string[]
      // Properties for slideshows
      session?: string
      rating?: number
      pages?: number
      fileSize?: string
      downloadCount?: number
      // Properties for recordings
      duration?: string
      viewCount?: number
    }
    
    const filterItems = (items: MaterialItem[]) => {
      return items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.speaker?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description?.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
      })
    }

    return {
      slideshows: filterItems(materials.slideshows),
      handouts: filterItems(materials.handouts),
      recordings: filterItems(materials.recordings)
    }
  }, [searchTerm])

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
              <Button size="lg" variant="outline" asChild>
                <Link href="/">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule
                </Link>
              </Button>
              <Button size="lg" variant="default" asChild>
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
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="slideshows">
              <Presentation className="w-4 h-4 mr-2" />
              Slideshows ({filteredMaterials.slideshows.length})
            </TabsTrigger>
            <TabsTrigger value="handouts">
              <FileText className="w-4 h-4 mr-2" />
              Handouts ({filteredMaterials.handouts.length})
            </TabsTrigger>
            <TabsTrigger value="recordings">
              <Video className="w-4 h-4 mr-2" />
              Recordings ({filteredMaterials.recordings.length})
            </TabsTrigger>
          </TabsList>

          {/* Slideshows */}
          <TabsContent value="slideshows" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.slideshows.map((slideshow) => (
                <Card key={slideshow.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-blue-100 text-blue-800">
                        {slideshow.session}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {slideshow.rating}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{slideshow.title}</CardTitle>
                    <CardDescription>{slideshow.speaker}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{slideshow.pages} pages</span>
                        <span>{slideshow.fileSize}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{slideshow.downloadCount} downloads</span>
                      </div>
                                             <div className="flex flex-wrap gap-1">
                         {slideshow.tags.map((tag: string) => (
                           <Badge key={tag} variant="secondary" className="text-xs">
                             {tag}
                           </Badge>
                         ))}
                       </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Handouts */}
          <TabsContent value="handouts" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.handouts.map((handout) => (
                <Card key={handout.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{handout.title}</CardTitle>
                    <CardDescription>{handout.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{handout.fileSize}</span>
                        <span>{handout.downloadCount} downloads</span>
                      </div>
                                             <div className="flex flex-wrap gap-1">
                         {handout.tags.map((tag: string) => (
                           <Badge key={tag} variant="secondary" className="text-xs">
                             {tag}
                           </Badge>
                         ))}
                       </div>
                      <Button size="sm" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recordings */}
          <TabsContent value="recordings" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.recordings.map((recording) => (
                <Card key={recording.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{recording.title}</CardTitle>
                    <CardDescription>{recording.speaker}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{recording.duration}</span>
                        <span>{recording.viewCount} views</span>
                      </div>
                                             <div className="flex flex-wrap gap-1">
                         {recording.tags.map((tag: string) => (
                           <Badge key={tag} variant="secondary" className="text-xs">
                             {tag}
                           </Badge>
                         ))}
                       </div>
                      <Button size="sm" className="w-full">
                        <Video className="w-4 h-4 mr-2" />
                        Watch Recording
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 