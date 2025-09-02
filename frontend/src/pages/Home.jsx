import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../store/slices/productSlice'
import ModernProductCard from '../components/ModernProductCard'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  ArrowRight, 
  Star, 
  ShoppingBag,
  Heart,
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Filter,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react'

const Home = () => {
  const dispatch = useDispatch()
  const { featuredProducts, isLoading } = useSelector((state) => state.products)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    dispatch(getFeaturedProducts())
  }, [dispatch])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <div className="min-h-screen">
      {/* Clear Hero Section - Premium Fashion Landing */}
      <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-800 to-black text-white overflow-hidden">
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
        <div className="relative z-10 min-h-screen flex items-center">
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
                      <Button className="bg-white text-black hover:bg-gray-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
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
                    
                    <Button size="sm" className="bg-black text-white hover:bg-gray-800">
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
            <div className="flex justify-center">
              <div className="loading-shimmer w-12 h-12 rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ModernProductCard key={product._id} product={product} />
              ))}
            </div>
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

      {/* Footer (FigmaUI-style) */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <div className="py-12 border-b border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
                <p className="text-gray-400">
                  Get the latest updates on new arrivals, exclusive offers, and style tips.
                </p>
              </div>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-900 border border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 w-full"
                />
                <Button className="bg-white text-black hover:bg-gray-200 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">LUXE</h2>
              <p className="text-gray-400 leading-relaxed">
                Crafting exceptional fashion for those who dare to stand out.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Shop</h4>
              <ul className="space-y-3">
                <li><a href="#collections" className="text-gray-400 hover:text-white transition-colors">Collections</a></li>
                <li><a href="#featured" className="text-gray-400 hover:text-white transition-colors">Featured</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="py-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} LUXE. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
