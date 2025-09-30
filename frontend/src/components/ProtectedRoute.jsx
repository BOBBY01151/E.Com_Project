import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
