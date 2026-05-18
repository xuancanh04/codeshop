import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import FloatingContactWidget from '../FloatingContactWidget'

export default function MainLayout() {
  const { isAdmin } = useAuth()

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="flex min-h-svh min-w-0 flex-col overflow-x-clip">
      <Navbar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingContactWidget />
    </div>
  )
}
