import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Dashboard } from '@/components/dashboard'
import { 
  ExistingPatientsPage, 
  EnrollPatientsPage, 
  DiagnosisPage, 
  FlaggedPage, 
  ConfigPage 
} from '@/components/pages'

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />
      case 'existing-patients':
        return <ExistingPatientsPage />
      case 'enroll-patients':
        return <EnrollPatientsPage />
      case 'diagnosis':
        return <DiagnosisPage />
      case 'flagged':
        return <FlaggedPage />
      case 'config':
        return <ConfigPage />
      default:
        return <Dashboard onPageChange={setCurrentPage} />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}
