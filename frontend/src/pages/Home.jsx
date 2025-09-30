import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { toast } from 'react-hot-toast'
import { getFeaturedProducts } from '../store/slices/productSlice'
import ModernProductCard from '../components/ModernProductCard'
import LoadingScreen from '../components/LoadingScreen'

import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useCart } from '../FigmaUI/src/contexts/CartContext'
import { 
  ArrowRight, 
  Star, 
  ShoppingBag,
  Heart,
  ChevronRight,
  Filter,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Shield
} from 'lucide-react'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { featuredProducts, isLoading, isError, message } = useSelector((state) => state.products)
  const { addToCart } = useCart()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const heroRef = useRef(null)

  useEffect(() => {
    dispatch(getFeaturedProducts())
  }, [dispatch])

  // Fallback data for when API fails
  const fallbackProducts = [
    {
      _id: 'fallback-1',
      name: 'Premium Denim Collection',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      rating: 4.8,
      reviews: 124,
      category: 'denim'
    },
    {
      _id: 'fallback-2',
      name: 'Classic White T-Shirt',
      price: 24.99,
      originalPrice: 34.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      rating: 4.6,
      reviews: 89,
      category: 'tshirt'
    },
    {
      _id: 'fallback-3',
      name: 'Designer Sneakers',
      price: 159.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
      rating: 4.9,
      reviews: 156,
      category: 'shoes'
    }
  ]

  // Use fallback data when API fails
  const displayProducts = isError ? fallbackProducts : featuredProducts

  // Handle API errors gracefully
  useEffect(() => {
    if (isError && message) {
      console.warn('API Error (using fallback data):', message)
      // Don't show toast for API errors in development mode
      // toast.error('Unable to load featured products')
    }
  }, [isError, message])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle page loading effect - combine with data loading
  useEffect(() => {
    const minLoadingTime = 2000 // Minimum loading time for smooth UX
    const startTime = Date.now()
    
    const checkLoadingComplete = () => {
      const elapsedTime = Date.now() - startTime
      const dataLoaded = !isLoading && (featuredProducts.length > 0 || isError)
      
      if (dataLoaded && elapsedTime >= minLoadingTime) {
        setIsPageLoading(false)
      } else if (elapsedTime >= minLoadingTime + 1000) {
        // Fallback: stop loading after max time even if data isn't ready
        setIsPageLoading(false)
      } else {
        setTimeout(checkLoadingComplete, 100)
      }
    }
    
    checkLoadingComplete()
  }, [isLoading, featuredProducts, isError])

  // Enhanced hero images with better titles/subtitles matching ShopCollection style
  const heroImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1732551146857-6e12616efb27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZGVuaW0lMjBqZWFucyUyMGZhc2hpb258ZW58MXx8fHwxNzU2NzIxMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Premium Denim Collection',
      subtitle: 'Authentic Japanese selvedge construction'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1755514838747-adfd34197d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkZW5pbSUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzU2NzIxMDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Luxury Stretch Denim',
      subtitle: 'Ultra-comfortable premium Italian fabric blend'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1718882703813-5b18d074242a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2hpdGUlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NTY3MjEwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Minimalist Luxury Sneakers',
      subtitle: 'Premium leather with exceptional comfort technology'
    }
  ]

  // Sample products for the Comfort Meets Contemporary section
  const sampleProducts = [
    {
      _id: 'sample-1',
      name: 'Essential Black Tee',
      price: 45,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2hpdGUlMjB0LXNoaXJ0JTIwbWluaW1hbCUyMGZhc2hpb258ZW58MXwxfHx8MTc1NjcwNDcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      _id: 'sample-2',
      name: 'Minimalist White Shirt',
      price: 42,
      image: 'https://images.unsplash.com/photo-1667544417110-403b89341112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZmFzaGlvbiUyMG1vZGVsJTIwdC1zaGlydHxlbnwxfHx8fDE3NTY3MDQ1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      _id: 'sample-3',
      name: 'Urban Gray Sweatshirt',
      price: 48,
      image: 'https://images.unsplash.com/photo-1693901257178-b5fcb8f036a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGNsb3RoaW5nJTIwc3RvcmV8ZW58MXwxfHwxNzU2NzA0NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      _id: 'sample-4',
      name: 'Executive Black Trousers',
      price: 120,
      image: 'https://images.unsplash.com/photo-1615398264198-718da97f988d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBibGFjayUyMHRyb3VzZXJzJTIwbWVuJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTY3MDQ3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      _id: 'sample-5',
      name: 'Casual Chino Pants',
      price: 85,
      image: 'https://images.unsplash.com/photo-1665672017097-205fe870657f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYmxhY2slMjB0cm91c2VycyUyMHBhbnRzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTY3MDQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      _id: 'sample-6',
      name: 'Designer White Sneakers',
      price: 180,
      image: 'https://images.unsplash.com/photo-1642957464439-7c653ed1328c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNuZWFrZXJzJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1NjcwNDcwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ]

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(imageInterval)
  }, [heroImages.length])

  // Admin access function for UI design
  const handleAdminAccess = () => {
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
    
    toast.success('🎨 Redirecting to Admin Dashboard...')
    
    // Small delay to ensure state is updated before navigation
    setTimeout(() => {
      navigate('/admin', { replace: true })
    }, 100)
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {isPageLoading && (
          <LoadingScreen 
            title="LUXE" 
            subtitle="Welcome to premium fashion" 
          />
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPageLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={isPageLoading ? "pointer-events-none" : ""}
      >
          {/* Clear Hero Section - Premium Fashion Landing */}
          <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-800 to-black text-white overflow-hidden -mt-16 pt-16">
            {/* Background Image Slider with Enhanced Parallax */}
            <div className="absolute inset-0">
              {heroImages.map((image, index) => (
                <div
                  key={image.id}
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{
                    opacity: index === currentImageIndex ? 1 : 0,
                    transform: `translateY(${scrollY * 0.5}px) scale(${1 + Math.min(scrollY / 1000, 0.2)})`
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50"></div>
                </div>
              ))}
            </div>

            {/* Hero Content - Clear and Focused */}
            <div className="relative z-10 min-h-screen flex items-center pt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content - Clear Hero Message */}
                  <div 
                    className="space-y-8 text-white"
                    style={{ transform: `translateX(${Math.min(scrollY, 100) * -0.5}px)` }}
                  >
                    <div className="space-y-6">
                      {/* Premium Badge */}
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <Star className="w-4 h-4 fill-white" />
                        <span className="text-sm font-medium">Premium Fashion Collection</span>
                      </div>
                      
                      {/* Main Hero Title */}
                      <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                          Premium
                          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                            Fashion
                          </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-light">
                          Discover our curated selection of premium denim, luxury t-shirts, and designer footwear. 
                          Crafted with exceptional quality and timeless style.
                        </p>
                      </div>
                    </div>
                    
                    {/* Call-to-Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-white/20 transition-all duration-300"
                        asChild
                      >
                        <Link to="/shop">
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          Shop Collection
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                        asChild
                      >
                        <Link to="/products">
                          Explore Styles
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button 
                        onClick={handleAdminAccess}
                        size="lg" 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 px-6 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 transform"
                      >
                        <Shield className="mr-2 h-5 w-5" />
                        Admin
                      </Button>
                    </div>
                    
                    {/* Category Stats - Clear Metrics */}
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">200+</div>
                        <div className="text-sm text-white/70">Premium Denim</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">150+</div>
                        <div className="text-sm text-white/70">Luxury T-Shirts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">100+</div>
                        <div className="text-sm text-white/70">Designer Shoes</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Featured Product Showcase */}
                  <div 
                    className="relative"
                    style={{ transform: `translateX(${Math.min(scrollY, 100) * 0.5}px)` }}
                  >
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white border border-white/20 shadow-2xl">
                      <div className="space-y-6">
                        {/* Featured Product Info */}
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mb-4">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">Featured</span>
                          </div>
                          <h3 className="text-3xl font-bold mb-2">
                            {heroImages[currentImageIndex]?.title}
                          </h3>
                          <p className="text-xl text-white/90 leading-relaxed">
                            {heroImages[currentImageIndex]?.subtitle}
                          </p>
                        </div>
                        
                        {/* Image Navigation */}
                        <div className="flex items-center justify-center gap-4">
                          <div className="flex gap-2">
                            {heroImages.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/30'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-white/70 font-medium">
                            {currentImageIndex + 1} / {heroImages.length}
                          </span>
                        </div>
                        
                        {/* Benefits Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/15 rounded-xl p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-white">Free</div>
                            <div className="text-sm text-white/80">Shipping</div>
                          </div>
                          <div className="bg-white/15 rounded-xl p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-white">30d</div>
                            <div className="text-sm text-white/80">Returns</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prominent Floating Elements with Enhanced Parallax */}
            <div 
              className="absolute top-20 right-20 bg-white rounded-full p-6 shadow-2xl hidden lg:block border-4 border-yellow-400"
              style={{ transform: `translateY(${Math.min(scrollY, 200) * -0.4}px) rotate(${Math.min(scrollY, 200) * 0.9}deg)` }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-black">50%</div>
                <div className="text-xs text-gray-600 font-semibold">OFF</div>
              </div>
            </div>
            <div 
              className="absolute bottom-32 left-20 bg-black border-2 border-white text-white rounded-full p-6 shadow-2xl hidden lg:block"
              style={{ transform: `translateY(${Math.min(scrollY, 200) * 0.3}px) scale(${1 - Math.min(scrollY, 200) / 700})` }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">New</div>
                <div className="text-xs font-semibold">Arrivals</div>
              </div>
            </div>

            {/* Clear Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
              <div 
                className="flex flex-col items-center gap-3 text-white transition-opacity duration-300"
                style={{ opacity: 1 - Math.min(scrollY / 300, 1) }}
              >
                <span className="text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Scroll to discover</span>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced Geometric Parallax Elements */}
            <div 
              className="absolute top-1/4 left-10 w-32 h-32 border-2 border-white/20 rotate-45 hidden lg:block"
              style={{ transform: `rotate(${45 + Math.min(scrollY, 200)}deg) scale(${1 + Math.min(scrollY, 200) / 400})` }}
            />
            <div 
              className="absolute bottom-1/4 right-10 w-24 h-24 bg-white/10 rounded-full hidden lg:block"
              style={{ transform: `translateY(${Math.min(scrollY, 200) * -0.5}px) scale(${1 - Math.min(scrollY, 200) / 700})` }}
            />

            {/* Floating Admin Access Button */}
            <div 
              className="fixed top-1/2 right-8 z-50 hidden lg:block"
              style={{ transform: `translateY(${Math.min(scrollY, 200) * 0.2}px)` }}
            >
              <Button
                onClick={handleAdminAccess}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 transform rounded-full w-16 h-16 p-0"
                title="Admin Dashboard Access"
              >
                <Shield className="h-6 w-6" />
              </Button>
            </div>
          </section>

          {/* Comfort Meets Contemporary Section */}
          <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="text-center mb-20">
                <Badge variant="outline" className="mb-4 border-black text-black">
                  Premium Collection
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
                  Comfort Meets
                  <span className="block">Contemporary Design</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Crafted from the finest materials, our products deliver unmatched comfort and style for the modern individual.
                </p>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {sampleProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="group transition-all duration-700 opacity-100 translate-y-0"
                    style={{
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Quick Add Overlay */}
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <Button 
                            className="bg-white text-black hover:bg-gray-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                            onClick={() => addToCart({
                              id: product._id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              category: 'clothing'
                            })}
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Quick Add
                          </Button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-black mb-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-black">
                              ${product.price}
                            </span>
                          </div>
                        </div>

                        <Button 
                          className="w-full bg-black text-white hover:bg-gray-800"
                          size="lg"
                          onClick={() => addToCart({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: 'clothing'
                          })}
                        >
                          Add to Cart
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-16">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-black text-black hover:bg-black hover:text-white px-8"
                  asChild
                >
                  <Link to="/shop">
                    View All Products
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Featured Collection Section - FigmaUI Style */}
          <section id="collections" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="text-center mb-20">
                <Badge variant="outline" className="mb-4 border-black text-black">
                  Featured Collection
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
                  Premium Fashion
                  <span className="block">Collection</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Discover our handpicked selection of premium t-shirts, elegant trousers, 
                  and luxury sneakers designed to elevate your everyday style.
                </p>
              </div>

              {/* Featured Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleProducts.slice(0, 3).map((product) => (
                  <div key={product._id} className="group cursor-pointer border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden rounded-t-lg bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                      
                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Premium
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-lg text-black mb-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-black">
                            ${product.price}
                          </span>
                        </div>
                        
                        <Button 
                          size="sm" 
                          className="bg-black text-white hover:bg-gray-800"
                          onClick={() => addToCart({
                            id: product._id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: 'clothing'
                          })}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-black text-black hover:bg-black hover:text-white px-8"
                  asChild
                >
                  <Link to="/shop">
                    View All Collections
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section id="featured" className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Featured Products
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Discover our handpicked collection of trending products that our customers love
                </p>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <motion.div 
                    className="flex flex-col items-center space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-gray-600 font-medium">Loading featured products...</p>
                  </motion.div>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {displayProducts.map((product) => (
                    <ModernProductCard key={product._id} product={product} />
                  ))}
                </motion.div>
              )}

              <div className="text-center mt-12">
                <Button 
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold hover-lift"
                  asChild
                >
                  <Link to="/shop">
                    View All Products
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Redefining Fashion Section - FigmaUI Style */}
          <section id="testimonials" className="relative py-24 bg-black text-white overflow-hidden">
            {/* Top Fade Effect */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-white/90 via-white/70 via-white/40 to-transparent z-10"></div>
            
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="text-center mb-20">
                <Badge variant="outline" className="mb-4 border-white text-white">
                  Innovation
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Redefining
                  <span className="block">Fashion</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  We're not just creating clothes, we're crafting experiences. Every piece tells a story 
                  of innovation, sustainability, and timeless elegance.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all duration-500">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Premium Quality</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every garment is crafted with the finest materials, ensuring durability and comfort that lasts.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all duration-500">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Sustainable Design</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our commitment to eco-friendly practices ensures a better future for fashion and our planet.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-all duration-500">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Timeless Style</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Classic designs that transcend trends, creating a wardrobe that never goes out of style.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-16">
                <Button 
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-semibold"
                  asChild
                >
                  <Link to="/shop">
                    Discover Our Collection
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

      </motion.div>
    </div>
  )
}

export default Home
