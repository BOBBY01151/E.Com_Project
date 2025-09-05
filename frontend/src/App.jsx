import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'

// Components
import FigmaHeader from './components/FigmaHeader'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Landing3D from './pages/Landing3D'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import ShopCollection from './pages/ShopCollection'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'

// FigmaUI Components
import { ShoppingCartPage } from './FigmaUI/src/components/ShoppingCartPage'

// Import the proper pages
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SizeGuide from './pages/SizeGuide';

// Redux
import { reset } from './store/slices/authSlice'

// FigmaUI Cart Context
import { CartProvider } from './FigmaUI/src/contexts/CartContext'

function App() {
  const dispatch = useDispatch()
  const { isError, isSuccess, message } = useSelector((state) => state.auth)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
    }

    dispatch(reset())
  }, [isError, isSuccess, message, dispatch])

  useEffect(() => {
    // Handle scroll for parallax effects
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    
    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update document class when dark mode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <CartProvider>
      <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Background Decorative Elements with Parallax */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-5 dark:opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.1}px)`,
            background: isDarkMode 
              ? 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)'
              : 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 opacity-3 dark:opacity-8"
          style={{
            transform: `translateY(${scrollY * -0.2}px) translateX(${scrollY * -0.1}px)`,
            background: isDarkMode 
              ? 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)'
              : 'linear-gradient(45deg, transparent 40%, rgba(0,0,0,0.05) 50%, transparent 60%)'
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-48 h-48 opacity-5 dark:opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.4}px) rotate(${scrollY * 0.1}deg)`,
            border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            borderRadius: '50%'
          }}
        />
      </div>

      {/* Navigation */}
      <FigmaHeader />

      {/* Main Content */}
      <main className="relative z-10 pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/3d" element={<Landing3D />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<ShopCollection />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          
          {/* Protected Routes */}
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/orders/:id" element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute adminOnly>
              <AdminProducts />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute adminOnly>
              <AdminOrders />
            </ProtectedRoute>
          } />

          {/* Placeholder Routes */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/size-guide" element={<SizeGuide />} />
        </Routes>
      </main>

      {/* Footer removed to avoid duplication with page-level footer */}
      </div>
    </CartProvider>
  )
}

export default App
