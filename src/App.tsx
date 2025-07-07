import './App.css'
import { Navigate, useLocation } from 'react-router-dom'
import AuthProvider, { useAuth } from './providers/AuthProvider'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    sessionStorage.setItem('redirectPath', location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children
}

function App() {

  return (
    <AuthProvider>
      <div className='text-2xl font-bold'>Simple Provider App</div>
    </AuthProvider>
  )
}

export default App
