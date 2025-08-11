import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Search, ChevronLeft, ChevronRight, User, Calendar, Phone, MapPin, Eye, UserPen, ArrowLeft, FileText, ClipboardList, ChevronDown, X, History, Activity, ClipboardPlus, Upload, Image, Camera, FileImage, Scan } from 'lucide-react'

// Mock patient data
const generateMockPatients = () => {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa', 'William', 'Ashley', 'James', 'Amanda', 'Daniel', 'Jessica', 'Thomas', 'Michelle', 'Christopher', 'Jennifer', 'Matthew', 'Elizabeth']
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez']
  const conditions = ['Hypertension', 'Diabetes Type 2', 'Asthma', 'Arthritis', 'Heart Disease', 'COPD', 'Depression', 'Anxiety', 'Migraine', 'Allergies']
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
  
  const patients = []
  for (let i = 1; i <= 125; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const age = Math.floor(Math.random() * 60) + 20
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    
    patients.push({
      id: `PAT${String(i).padStart(4, '0')}`,
      name: `${firstName} ${lastName}`,
      age,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      address: `${Math.floor(Math.random() * 9999) + 1} ${['Main St', 'Oak Ave', 'Pine St', 'Elm Dr', 'Cedar Ln'][Math.floor(Math.random() * 5)]}, ${city}`,
      lastVisit: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      condition,
      status: Math.random() > 0.8 ? 'Inactive' : 'Active'
    })
  }
  return patients
}

const mockPatients = generateMockPatients()

// Mock visits data generator
const generateMockVisits = (patientId: string) => {
  const visits = []
  const visitTypes = ['Regular Checkup', 'Follow-up', 'Emergency', 'Consultation', 'Specialist Referral']
  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis']
  const diagnoses = ['Hypertension', 'Diabetes Type 2', 'Common Cold', 'Migraine', 'Allergic Reaction', 'Back Pain', 'Anxiety']
  
  for (let i = 0; i < Math.floor(Math.random() * 8) + 3; i++) {
    const visitDate = new Date(Date.now() - Math.floor(Math.random() * 730) * 24 * 60 * 60 * 1000)
    const hasNotes = Math.random() > 0.3
    const hasReport = Math.random() > 0.4
    
    visits.push({
      id: `${patientId}-VIS${String(i + 1).padStart(3, '0')}`,
      date: visitDate.toISOString().split('T')[0],
      time: `${Math.floor(Math.random() * 12) + 1}:${Math.random() > 0.5 ? '00' : '30'} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      type: visitTypes[Math.floor(Math.random() * visitTypes.length)],
      doctor: doctors[Math.floor(Math.random() * doctors.length)],
      diagnosis: diagnoses[Math.floor(Math.random() * diagnoses.length)],
      status: Math.random() > 0.1 ? 'Completed' : 'Cancelled',
      noteId: hasNotes ? `NOTE${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}` : null,
      attemptId: hasReport ? `ATT${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}` : null,
      notes: hasNotes ? `Patient reported ${['mild discomfort', 'significant improvement', 'persistent symptoms', 'new concerns'][Math.floor(Math.random() * 4)]}. Prescribed ${['medication', 'rest', 'follow-up tests', 'lifestyle changes'][Math.floor(Math.random() * 4)]}.` : null,
      report: hasReport ? `Comprehensive diagnosis report including blood work analysis, vital signs assessment, and treatment recommendations. Patient shows ${['positive response', 'stable condition', 'minor concerns', 'excellent progress'][Math.floor(Math.random() * 4)]} to current treatment plan.` : null
    })
  }
  
  return visits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function PatientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
        <p className="text-muted-foreground">
          Manage and view patient information
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Patient Management</CardTitle>
          <CardDescription>
            This page would contain patient lists, search functionality, and patient details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Patient management functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function ExistingPatientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(9) // Multiple of 3 for grid display
  const [isSearching, setIsSearching] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  // Filter patients based on search term (patient ID or name)
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) {
      return mockPatients
    }
    
    return mockPatients.filter(patient => 
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPatients.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPatients = filteredPatients.slice(startIndex, endIndex)

  // Reset to first page when search changes
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
    setIsSearching(!!value.trim())
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: string) => {
    setPageSize(Number(size))
    setCurrentPage(1)
  }

  // If a patient is selected, show patient detail view
  if (selectedPatient) {
    return <PatientDetailView 
      patient={selectedPatient} 
      onBack={() => setSelectedPatient(null)}
    />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Existing Patients</h2>
        <p className="text-muted-foreground">
          Search and manage existing patient records
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Patients</CardTitle>
          <CardDescription>
            Search by Patient ID or patient name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Enter Patient ID (e.g., PAT0001) or patient name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Show:</label>
              <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {isSearching ? 'Search Results' : 'All Patients'}
              </CardTitle>
              <CardDescription>
                Showing {currentPatients.length} of {filteredPatients.length} patients
                {isSearching && ` matching "${searchTerm}"`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentPatients.length === 0 ? (
            <div className="text-center py-8">
              <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No patients found</h3>
              <p className="text-muted-foreground">
                {isSearching 
                  ? 'Try adjusting your search criteria' 
                  : 'No patients available in the system'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentPatients.map((patient) => (
                <Card key={patient.id} className="group relative overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header with avatar and basic info */}
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center shrink-0 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300 group-hover:scale-105">
                            <User className="h-6 w-6 text-primary transition-all duration-300 group-hover:text-primary/80" />
                          </div>
                          <div className="absolute -bottom-1 -right-1">
                            <div className={`w-3 h-3 rounded-full border-2 border-card transition-all duration-300 ${
                              patient.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-base text-foreground mb-1 truncate group-hover:text-primary transition-colors duration-300">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono">ID: {patient.id}</p>
                          <div className="mt-2">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                              patient.status === 'Active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 transition-all duration-300 ${
                                patient.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                              }`}></div>
                              {patient.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Patient details - more compact layout */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-muted-foreground">Age:</span>
                            <span className="font-semibold">{patient.age}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="font-semibold capitalize">{patient.gender}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm truncate">{patient.phone}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground leading-relaxed truncate">{patient.address}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Condition and last visit - horizontal layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-3 border-t border-border/30 text-sm">
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">Condition</span>
                          <p className="font-medium text-foreground mt-1 text-sm">{patient.condition}</p>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">Last Visit</span>
                          <p className="font-medium text-foreground mt-1 text-sm">{patient.lastVisit}</p>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-2 pt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 h-9 text-sm transition-all duration-300 hover:bg-primary/5 hover:border-primary/30 hover:text-primary"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex-1 h-9 text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                        >
                          <UserPen className="h-4 w-4 mr-2" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredPatients.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} patients
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else {
                      if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Patient Detail View Component
function PatientDetailView({ patient, onBack }: {
  patient: any,
  onBack: () => void
}) {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<{type: 'notes' | 'report', content: string, title: string}>()
  const [isVisitHistoryExpanded, setIsVisitHistoryExpanded] = useState(false)
  const [isNewVisitExpanded, setIsNewVisitExpanded] = useState(false)
  const [newVisitForm, setNewVisitForm] = useState({
    visitType: '',
    doctor: 'Dr. Sarah Johnson', // Auto-populated logged in clinician
    condition: '',
    clinicalNotes: '',
    deepSearch: false,
    regenerate: false,
    llmModel: ''
  })
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [isExtracting, setIsExtracting] = useState(false)
  const visits = generateMockVisits(patient.id)

  const handleShowModal = (type: 'notes' | 'report', content: string, title: string) => {
    setModalContent({type, content, title})
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Patient Details</h1>
          <p className="text-lg text-muted-foreground mt-1">
            Complete patient information and visit history
          </p>
        </div>
      </div>

      {/* Patient General Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            {patient.name}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              patient.status === 'Active' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
            }`}>
              {patient.status}
            </span>
          </CardTitle>
          <CardDescription>General patient information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Patient ID</label>
              <p className="font-mono text-sm bg-muted/30 px-3 py-2 rounded">{patient.id}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Age</label>
              <p className="text-base font-medium">{patient.age} years</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Gender</label>
              <p className="text-base font-medium capitalize">{patient.gender}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-base font-medium">{patient.phone}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-base font-medium">{patient.email}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Last Visit</label>
              <p className="text-base font-medium">{patient.lastVisit}</p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <p className="text-base font-medium">{patient.address}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Primary Condition</label>
              <p className="text-base font-medium bg-primary/5 px-3 py-2 rounded">{patient.condition}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Visit Check-in */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <ClipboardPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>New Visit Check-in</CardTitle>
                <CardDescription>Create a new visit and generate diagnosis</CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNewVisitExpanded(!isNewVisitExpanded)}
              className="flex items-center gap-2"
            >
              {isNewVisitExpanded ? 'Collapse' : 'Expand'}
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isNewVisitExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        {isNewVisitExpanded && (
          <CardContent>
            <div className="space-y-6">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Visit Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Visit Type</label>
                  <Select value={newVisitForm.visitType} onValueChange={(value) => setNewVisitForm({...newVisitForm, visitType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine Check-up</SelectItem>
                      <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                      <SelectItem value="emergency">Emergency Visit</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="procedure">Procedure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Doctor (Read-only) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Attending Physician</label>
                  <Input 
                    value={newVisitForm.doctor} 
                    readOnly 
                    className="bg-muted/30 cursor-not-allowed" 
                  />
                </div>

                {/* Condition */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Primary Condition</label>
                  <Input 
                    value={newVisitForm.condition}
                    onChange={(e) => setNewVisitForm({...newVisitForm, condition: e.target.value})}
                    placeholder="Enter primary condition or symptoms"
                  />
                </div>

                {/* LLM Model Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">AI Model</label>
                  <Select value={newVisitForm.llmModel} onValueChange={(value) => setNewVisitForm({...newVisitForm, llmModel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude-3</SelectItem>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="llama-2">Llama 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Clinical Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Clinical Notes</label>
                <textarea
                  value={newVisitForm.clinicalNotes}
                  onChange={(e) => setNewVisitForm({...newVisitForm, clinicalNotes: e.target.value})}
                  placeholder="Enter detailed clinical observations, symptoms, and notes..."
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  rows={5}
                />
              </div>

              {/* Image Upload and Text Extraction */}
              <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                <div className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-primary" />
                  <h4 className="text-sm font-medium">Extract Text from Images</h4>
                </div>
                
                <div className="space-y-3">
                  {/* Upload Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            setUploadedImages(prev => [...prev, ...Array.from(e.target.files!)])
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-xs text-center text-muted-foreground">Upload Files</span>
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => {
                          if (e.target.files) {
                            setUploadedImages(prev => [...prev, ...Array.from(e.target.files!)])
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="camera-capture"
                      />
                      <label htmlFor="camera-capture" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                        <Camera className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-xs text-center text-muted-foreground">Take Photo</span>
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            setUploadedImages(prev => [...prev, ...Array.from(e.target.files!)])
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="gallery-upload"
                      />
                      <label htmlFor="gallery-upload" className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                        <Image className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-xs text-center text-muted-foreground">From Gallery</span>
                      </label>
                    </div>
                  </div>

                  {/* Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Uploaded Images ({uploadedImages.length})</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUploadedImages([])}
                          className="text-xs h-7"
                        >
                          Clear All
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {uploadedImages.map((file, index) => (
                          <div key={index} className="relative">
                            <div className="aspect-square rounded-lg border overflow-hidden bg-muted flex items-center justify-center">
                              <FileImage className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <button
                              onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs hover:bg-destructive/90"
                            >
                              ×
                            </button>
                            <p className="text-xs text-center mt-1 truncate">{file.name}</p>
                          </div>
                        ))}
                      </div>

                      {/* Extract Text Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          setIsExtracting(true)
                          // Mock API call for text extraction
                          await new Promise(resolve => setTimeout(resolve, 2000))
                          
                          // Mock extracted text
                          const mockExtractedText = `
Extracted from uploaded images:
- Patient reports chest pain and shortness of breath
- Blood pressure reading: 140/90 mmHg
- Heart rate: 85 bpm
- Temperature: 98.6°F
- Previous medication: Lisinopril 10mg daily
- Allergies: Penicillin
- Family history: Hypertension, diabetes
                          `.trim()
                          
                          setNewVisitForm(prev => ({
                            ...prev,
                            clinicalNotes: prev.clinicalNotes 
                              ? prev.clinicalNotes + '\n\n' + mockExtractedText
                              : mockExtractedText
                          }))
                          setIsExtracting(false)
                        }}
                        disabled={isExtracting}
                        className="w-full"
                      >
                        {isExtracting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
                            Extracting Text...
                          </>
                        ) : (
                          <>
                            <Scan className="h-4 w-4 mr-2" />
                            Extract Text from Images
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Toggle Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Deep Search</div>
                    <div className="text-xs text-muted-foreground">Enable comprehensive medical database search</div>
                  </div>
                  <Switch 
                    checked={newVisitForm.deepSearch}
                    onCheckedChange={(checked) => setNewVisitForm({...newVisitForm, deepSearch: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Regenerate</div>
                    <div className="text-xs text-muted-foreground">Allow AI to regenerate diagnosis if needed</div>
                  </div>
                  <Switch 
                    checked={newVisitForm.regenerate}
                    onCheckedChange={(checked) => setNewVisitForm({...newVisitForm, regenerate: checked})}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4 border-t">
                <Button 
                  className="px-8 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  onClick={() => {
                    // Handle diagnosis submission
                    console.log('Submitting diagnosis with:', newVisitForm)
                    // You can add actual form submission logic here
                  }}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Generate Diagnosis
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Visit History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Visit History</CardTitle>
                <CardDescription>Complete list of patient visits and consultations ({visits.length} visits)</CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisitHistoryExpanded(!isVisitHistoryExpanded)}
              className="flex items-center gap-2"
            >
              {isVisitHistoryExpanded ? 'Collapse' : 'Expand'}
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isVisitHistoryExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        {isVisitHistoryExpanded && (
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {visits.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No visits recorded</p>
              ) : (
                visits.map((visit) => (
                  <div key={visit.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{visit.type}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            visit.status === 'Completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {visit.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">Visit ID: {visit.id}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium">{visit.date}</p>
                        <p className="text-muted-foreground">{visit.time}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Doctor</label>
                        <p className="text-sm">{visit.doctor}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Diagnosis</label>
                        <p className="text-sm">{visit.diagnosis}</p>
                      </div>
                      {visit.noteId && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Note ID</label>
                          <p className="text-sm font-mono">{visit.noteId}</p>
                        </div>
                      )}
                      {visit.attemptId && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Attempt ID</label>
                          <p className="text-sm font-mono">{visit.attemptId}</p>
                        </div>
                      )}
                    </div>

                    {/* Action buttons for notes and reports */}
                    <div className="flex gap-2">
                      {visit.noteId && visit.notes && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShowModal('notes', visit.notes!, `Clinical Notes - ${visit.noteId}`)}
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Clinical Notes
                        </Button>
                      )}
                      {visit.attemptId && visit.report && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShowModal('report', visit.report!, `Diagnosis Report - ${visit.attemptId}`)}
                          className="flex items-center gap-2"
                        >
                          <ClipboardList className="h-4 w-4" />
                          Diagnosis Report
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Enhanced Modal for displaying notes/reports */}
      {showModal && modalContent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div 
            className="bg-background border rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-muted/30">
              <div className="flex items-center gap-3">
                {modalContent.type === 'notes' ? (
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <ClipboardList className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{modalContent.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {modalContent.type === 'notes' ? 'Clinical documentation and observations' : 'Comprehensive diagnostic analysis'}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowModal(false)}
                className="rounded-full h-8 w-8 p-0 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
              {modalContent.type === 'notes' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Document Type</label>
                      <p className="text-sm font-medium">Clinical Notes</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Note ID</label>
                      <p className="text-sm font-mono">{modalContent.title.split(' - ')[1]}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Date</label>
                      <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg border-b pb-2">Clinical Observations</h4>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap bg-background border rounded-lg p-4">
                        {modalContent.content}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Report Type</label>
                      <p className="text-sm font-medium">Diagnosis Report</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Attempt ID</label>
                      <p className="text-sm font-mono">{modalContent.title.split(' - ')[1]}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Generated</label>
                      <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg border-b pb-2">Diagnostic Analysis</h4>
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap bg-background border rounded-lg p-4">
                        {modalContent.content}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium text-sm text-muted-foreground mb-2">Key Findings</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Vital signs within normal parameters</li>
                        <li>• No acute distress observed</li>
                        <li>• Treatment response positive</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-medium text-sm text-muted-foreground mb-2">Recommendations</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Continue current medication</li>
                        <li>• Follow-up in 2 weeks</li>
                        <li>• Monitor symptoms daily</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-muted/30">
              <div className="text-xs text-muted-foreground">
                {modalContent.type === 'notes' ? 'Clinical documentation' : 'Diagnostic report'} • 
                Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button size="sm">
                  Print Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function EnrollPatientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Enroll Patients</h2>
        <p className="text-muted-foreground">
          Register new patients into the system
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Patient Enrollment</CardTitle>
          <CardDescription>
            Create new patient profiles and onboard them into the healthcare system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Patient enrollment functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function DiagnosisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Previous Diagnosis</h2>
        <p className="text-muted-foreground">
          Review and analyze previous diagnostic cases
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Diagnosis History</CardTitle>
          <CardDescription>
            This page would contain historical diagnosis data, analytics, and case reviews.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Diagnosis history functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function FlaggedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Flagged for Review</h2>
        <p className="text-muted-foreground">
          Cases requiring clinical attention and review
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Review Queue</CardTitle>
          <CardDescription>
            This page would contain cases flagged by the AI system for human review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Review queue functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export function ConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurations</h2>
        <p className="text-muted-foreground">
          System settings and preferences
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>
            This page would contain system settings, AI model configurations, and user preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Configuration functionality coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}
