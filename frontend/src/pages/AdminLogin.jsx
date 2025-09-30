import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login } from '../store/slices/authSlice'
import { toast } from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock, Shield, ArrowLeft } from 'lucide-react'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData
  const { isLoading, isSuccess, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const redirect = location.search ? location.search.split('=')[1] : '/admin'

  useEffect(() => {
    if (isSuccess || user) {
      if (user?.role === 'admin') {
        navigate(redirect)
      } else {
        toast.error('Access denied. Admin privileges required.')
        dispatch({ type: 'auth/logout' })
      }
    }
  }, [isSuccess, user, navigate, redirect, dispatch])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // For UI design purposes - bypass authentication
    handleDesignModeAccess()
  }

  const handleDesignModeAccess = () => {
    // Create a mock admin user for design/development purposes
    const mockAdminUser = {
      _id: 'admin-123',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      token: 'mock-admin-token'
    }
    
    // Store in localStorage and Redux
    localStorage.setItem('user', JSON.stringify(mockAdminUser))
    dispatch({ 
      type: 'auth/loginSuccess', 
      payload: mockAdminUser 
    })
    
    toast.success('🚀 Redirecting to Admin Dashboard...')
    
    // Small delay to ensure state is updated before navigation
    setTimeout(() => {
      navigate('/admin', { replace: true })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Store
          </Link>
        </div>

        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            🎨 Admin Portal - UI Design Mode
          </h2>
          <p className="mt-2 text-center text-sm text-white/70">
            No credentials required - instant admin access for design
          </p>
        </div>

        {/* Login Form */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="space-y-6">
            {/* UI Design Mode Notice */}
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                <Shield className="h-5 w-5 text-green-300 mr-2" />
                <span className="text-green-200 text-sm font-medium">UI Design Mode Active</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleDesignModeAccess}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105 transform"
              >
                <span>🚀 Instant Admin Access</span>
                <span className="ml-2">→</span>
              </button>
              <p className="mt-2 text-xs text-center text-white/60">
                Click to go directly to Admin Dashboard
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-300 mr-2" />
              <p className="text-sm text-blue-200">
                Perfect for UI design and development - no authentication barriers!
              </p>
            </div>
          </div>

          {/* Alternative Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/60">Need help?</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-white/70">
                Not an admin?{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-300 hover:text-blue-200 transition-colors"
                >
                  Sign in as customer
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/50">
            © 2024 E-Commerce Store. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
