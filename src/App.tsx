import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider, useAuth } from '@/contexts/auth-context'
import { LoginPage } from '@/components/login-page'
import { Layout } from '@/components/layout'

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return isAuthenticated ? <Layout /> : <LoginPage />
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="clinician-ui-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
