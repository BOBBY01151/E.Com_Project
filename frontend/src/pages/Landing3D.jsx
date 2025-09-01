import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Scene3D from '../components/3DScene/Scene3D'
import ScrollContent from '../components/3DScene/ScrollContent'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Menu, X } from 'lucide-react'

const Landing3D = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading 3D Fashion Experience</h2>
          <p className="text-gray-300">Preparing your virtual shopping journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background Scene */}
      <Scene3D />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-white">Fashion3D</span>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-white/80 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#about" className="text-white/80 hover:text-white transition-colors">
                  About
                </a>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </a>
                <Link 
                  to="/shop" 
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                >
                  Shop Now
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobile && isMenuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a 
                  href="#features" 
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#about" 
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                <Link 
                  to="/shop" 
                  className="block px-3 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Scroll Content */}
      <ScrollContent />

      {/* Performance Warning */}
      <PerformanceWarning />
    </div>
  )
}

const PerformanceWarning = () => {
  const [showWarning, setShowWarning] = useState(false)
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    // Check for low-powered devices
    const checkPerformance = () => {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      
      if (!gl) {
        setIsLowPower(true)
        setShowWarning(true)
        return
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        const isLowPowerGPU = /intel|radeon|mali|adreno/i.test(renderer.toLowerCase())
        
        if (isLowPowerGPU) {
          setIsLowPower(true)
          setShowWarning(true)
        }
      }
    }

    checkPerformance()
  }, [])

  if (!showWarning) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
      <div className="bg-yellow-500/90 backdrop-blur-md border border-yellow-400 rounded-lg p-4 shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-800" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Performance Notice
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                {isLowPower 
                  ? "Your device may experience reduced performance with 3D content. Consider using a device with better graphics capabilities."
                  : "3D content detected. For optimal experience, ensure your device supports WebGL."
                }
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowWarning(false)}
                className="text-sm font-medium text-yellow-800 hover:text-yellow-900 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing3D
