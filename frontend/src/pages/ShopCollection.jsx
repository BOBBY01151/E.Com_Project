import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import LoadingScreen from '../components/LoadingScreen'
import { useCart } from '../FigmaUI/src/contexts/CartContext'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Grid, 
  List, 
  Star,
  Heart,
  ShoppingCart,
  ShoppingBag,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock product data
const denimProducts = [
  {
    id: 'denim-1',
    name: 'Classic Raw Denim',
    price: 189.99,
    originalPrice: 249.99,
    category: 'denim',
    subcategory: 'jeans',
    color: 'Indigo',
    size: ['28', '30', '32', '34', '36'],
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1732551146857-6e12616efb27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZGVuaW0lMjBqZWFucyUyMGZhc2hpb258ZW58MXx8fHwxNzU2NzIxMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: true,
    isFeatured: true,
    description: 'Premium 100% cotton raw denim with authentic Japanese selvedge construction.'
  },
  {
    id: 'denim-2',
    name: 'Luxury Stretch Denim',
    price: 229.99,
    category: 'denim',
    subcategory: 'jeans',
    color: 'Dark Blue',
    size: ['28', '30', '32', '34', '36', '38'],
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1755514838747-adfd34197d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkZW5pbSUyMGNvbGxlY3Rpb258ZW58MXx8fHwxNzU2NzIxMDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: true,
    description: 'Ultra-comfortable stretch denim with premium Italian fabric blend.'
  },
  {
    id: 'denim-3',
    name: 'Designer Slim Fit',
    price: 159.99,
    category: 'denim',
    subcategory: 'jeans',
    color: 'Black',
    size: ['28', '30', '32', '34'],
    rating: 4.6,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGRlbmltJTIwanNlYW5zJTIwbWVuJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTY3MDQ1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: false,
    description: 'Modern slim fit design with premium stretch denim for ultimate comfort.'
  },
  {
    id: 'denim-4',
    name: 'Vintage Straight Leg',
    price: 179.99,
    category: 'denim',
    subcategory: 'jeans',
    color: 'Light Blue',
    size: ['30', '32', '34', '36', '38'],
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqZWFucyUyMGZhc2hpb258ZW58MXx8fHwxNzU2NzA0NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: true,
    description: 'Classic straight leg fit with authentic vintage wash and premium construction.'
  }
]

const tshirtProducts = [
  {
    id: 'tshirt-1',
    name: 'Premium Cotton Tee',
    price: 45.99,
    category: 'tshirts',
    subcategory: 'basic',
    color: 'White',
    size: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2hpdGUlMjB0LXNoaXJ0JTIwbWluaW1hbCUyMGZhc2hpb258ZW58MXwxfHx8MTc1NjcwNDcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: true,
    isFeatured: true,
    description: 'Ultra-soft premium cotton t-shirt with perfect fit and durability.'
  },
  {
    id: 'tshirt-2',
    name: 'Minimalist Black Tee',
    price: 42.99,
    category: 'tshirts',
    subcategory: 'basic',
    color: 'Black',
    size: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1667544417110-403b89341112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZmFzaGlvbiUyMG1vZGVsJTIwdC1zaGlydHxlbnwxfHx8fDE3NTY3MDQ1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: false,
    description: 'Essential black t-shirt with clean lines and premium fabric.'
  },
  {
    id: 'tshirt-3',
    name: 'Designer Graphic Tee',
    price: 58.99,
    category: 'tshirts',
    subcategory: 'graphic',
    color: 'Navy',
    size: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1693901257178-b5fcb8f036a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGNsb3RoaW5nJTIwc3RvcmV8ZW58MXwxfHwxNzU2NzA0NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: true,
    isFeatured: false,
    description: 'Limited edition graphic t-shirt with artistic design and premium materials.'
  },
  {
    id: 'tshirt-4',
    name: 'Luxury Pima Cotton',
    price: 65.99,
    category: 'tshirts',
    subcategory: 'premium',
    color: 'Gray',
    size: ['M', 'L', 'XL'],
    rating: 4.9,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1615398264198-718da97f988d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBibGFjayUyMHRyb3VzZXJzJTIwbWVuJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTY3MDQ3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: true,
    description: 'Ultra-premium Pima cotton t-shirt with exceptional softness and longevity.'
  }
]

const shoeProducts = [
  {
    id: 'shoes-1',
    name: 'Minimalist White Sneakers',
    price: 189.99,
    category: 'shoes',
    subcategory: 'sneakers',
    color: 'White',
    size: ['7', '8', '9', '10', '11', '12'],
    rating: 4.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1642957464439-7c653ed1328c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNuZWFrZXJzJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1NjcwNDcwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: true,
    isFeatured: true,
    description: 'Clean, minimalist design with premium leather and exceptional comfort.'
  },
  {
    id: 'shoes-2',
    name: 'Premium Leather Boots',
    price: 299.99,
    category: 'shoes',
    subcategory: 'boots',
    color: 'Brown',
    size: ['8', '9', '10', '11', '12'],
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1723797935115-92b666c26e14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwYWlyJTIwam9yZGFuJTIwc25lYWtlcnN8ZW58MXwxfHx8MTc1NjcwMDQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: true,
    description: 'Handcrafted leather boots with premium materials and timeless design.'
  },
  {
    id: 'shoes-3',
    name: 'Classic Retro Sneakers',
    price: 145.99,
    category: 'shoes',
    subcategory: 'retro',
    color: 'Navy',
    size: ['7', '8', '9', '10', '11', '12'],
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1723797935115-92b666c26e14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwYWlyJTIwam9yZGFuJTIwc25lYWtlcnN8ZW58MXx8fHx8MTc1NjcwMDQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: false,
    description: 'Timeless retro design with modern comfort and premium materials.'
  }
]

const allProducts = [...denimProducts, ...tshirtProducts, ...shoeProducts]

const ShopCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [favorites, setFavorites] = useState(new Set())
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [loading, setLoading] = useState(true)
  
  // Use cart context
  const { addToCart, cartItems } = useCart()

  // Hero images specifically for Premium Collection
  const heroImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZmFzaGlvbiUyMGJvdXRpcXVlfGVufDF8fHx8MTc1NjcwNDcwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Premium Denim Collection',
      subtitle: 'Authentic Japanese selvedge construction with luxury Italian fabrics'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjbG90aGluZyUyMHN0b3JlfGVufDF8fHx8MTc1NjcwNDcxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Luxury T-Shirt Collection',
      subtitle: 'Ultra-premium Pima cotton with exceptional softness and durability'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNuZWFrZXJzJTIwc3RvcmV8ZW58MXx8fHx8MTc1NjcwNDcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Designer Footwear Collection',
      subtitle: 'Handcrafted leather with timeless design and premium materials'
    }
  ]

  // Loading timer effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Auto-rotate hero images every 6 seconds
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 6000)

    return () => clearInterval(heroInterval)
  }, [heroImages.length])

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let products = []
    
    // Filter by category
    switch (selectedCategory) {
      case 'denim':
        products = [...denimProducts]
        break
      case 'tshirts':
        products = [...tshirtProducts]
        break
      case 'shoes':
        products = [...shoeProducts]
        break
      case 'all':
      default:
        products = [...allProducts]
        break
    }
    
    // Sort products by featured status (default behavior)
    products = [...products].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    
    setFilteredProducts(products)
  }, [selectedCategory])

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: product.size[0], // Default to first size
      color: product.color
    })
  }

  const ProductCard = ({ product, isListView = false }) => (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white ${isListView ? 'flex' : ''}`}>
      <div className={`relative overflow-hidden ${isListView ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-black text-white">New</Badge>
          )}
          {product.isFeatured && (
            <Badge variant="outline" className="bg-white/90 text-black border-black">Featured</Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive" className="bg-red-500 text-white">
              Sale
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className={`h-4 w-4 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>

      <CardContent className={`p-4 ${isListView ? 'flex-1' : ''}`}>
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 capitalize">{product.color}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviews})</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex gap-1">
              {product.size.slice(0, 3).map((size) => (
                <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {size}
                </span>
              ))}
              {product.size.length > 3 && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  +{product.size.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen 
          key="loading"
          title="LUXE Shop"
          subtitle="Discover our premium collection"
        />
      ) : (
        <motion.div 
          key="shop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gray-50"
        >
          {/* Navigation Bar with Smooth Scrolling */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">LUXE</span>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-700 hover:text-yellow-500 transition-colors duration-200"
              >
                Home
              </button>
              <button 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-700 hover:text-yellow-500 transition-colors duration-200"
              >
                Products
              </button>

            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-yellow-500">
                <Heart className="w-4 h-4" />
              </Button>
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-yellow-500 relative">
                  <ShoppingCart className="w-4 h-4" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {cartItems.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section - Premium Collection Showcase */}
      <section id="hero" className="relative min-h-screen bg-gradient-to-br from-black via-gray-800 to-black text-white overflow-hidden">
        {/* Background Image Slider with Enhanced Parallax */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image.id}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: index === currentHeroIndex ? 1 : 0,
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

        {/* Hero Content - Premium Collection Focus */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content - Premium Collection Message */}
              <div 
                className="space-y-8 text-white"
                style={{ transform: `translateX(${Math.min(scrollY, 100) * -0.5}px)` }}
              >
                <div className="space-y-6">
                  {/* Premium Collection Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">Our Collection</span>
                  </div>
                  
                  {/* Main Hero Title */}
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                      Our
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                        Collection
                      </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-light">
                      Discover our curated selection of premium denim, luxury t-shirts, and designer footwear. 
                      Crafted with exceptional quality and timeless style for the discerning individual.
                    </p>
                  </div>
                </div>
                
                {/* Call-to-Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                  >
                    View Lookbook
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                
                {/* Premium Features */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">200+</div>
                    <div className="text-sm text-white/70">Premium Denim</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">150+</div>
                    <div className="text-sm text-white/70">Luxury T-Shirts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">100+</div>
                    <div className="text-sm text-white/70">Designer Shoes</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Featured Collection Showcase */}
              <div 
                className="relative"
                style={{ transform: `translateX(${Math.min(scrollY, 100) * 0.5}px)` }}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white border border-white/20 shadow-2xl">
                  <div className="space-y-6">
                    {/* Featured Collection Info */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 bg-yellow-400/20 px-3 py-1 rounded-full mb-4 border border-yellow-400/30">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-yellow-400">Featured Collection</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-2">
                        {heroImages[currentHeroIndex]?.title}
                      </h3>
                      <p className="text-xl text-white/90 leading-relaxed">
                        {heroImages[currentHeroIndex]?.subtitle}
                      </p>
                    </div>
                    
                    {/* Collection Navigation */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex gap-2">
                        {heroImages.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentHeroIndex ? 'bg-yellow-400 w-8' : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-white/70 font-medium">
                        {currentHeroIndex + 1} / {heroImages.length}
                      </span>
                    </div>
                    
                    {/* Premium Benefits */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/15 rounded-xl p-4 text-center border border-white/20">
                        <div className="text-2xl font-bold text-yellow-400">Free</div>
                        <div className="text-sm text-white/80">Shipping</div>
                      </div>
                      <div className="bg-white/15 rounded-xl p-4 text-center border border-white/20">
                        <div className="text-2xl font-bold text-yellow-400">30d</div>
                        <div className="text-sm text-white/80">Returns</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Floating Elements */}
        <div 
          className="absolute top-20 right-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-6 shadow-2xl hidden lg:block border-4 border-white"
          style={{ transform: `translateY(${Math.min(scrollY, 200) * -0.4}px) rotate(${Math.min(scrollY, 200) * 0.9}deg)` }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-black">50%</div>
            <div className="text-xs text-black font-semibold">OFF</div>
          </div>
        </div>
        <div 
          className="absolute bottom-32 left-20 bg-black border-2 border-yellow-400 text-white rounded-full p-6 shadow-2xl hidden lg:block"
          style={{ transform: `translateY(${Math.min(scrollY, 200) * 0.3}px) scale(${1 - Math.min(scrollY, 200) / 700})` }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">New</div>
            <div className="text-xs font-semibold">Arrivals</div>
          </div>
        </div>

        {/* Premium Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div 
            className="flex flex-col items-center gap-3 text-white transition-opacity duration-300"
            style={{ opacity: 1 - Math.min(scrollY / 300, 1) }}
          >
            <span className="text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Scroll to explore Premium Collection</span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-yellow-400 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Premium Geometric Elements */}
        <div 
          className="absolute top-1/4 left-10 w-32 h-32 border-2 border-yellow-400/20 rotate-45 hidden lg:block"
          style={{ transform: `rotate(${45 + Math.min(scrollY, 200)}deg) scale(${1 + Math.min(scrollY, 200) / 400})` }}
        />
        <div 
          className="absolute bottom-1/4 right-10 w-24 h-24 bg-yellow-400/10 rounded-full hidden lg:block"
          style={{ transform: `translateY(${Math.min(scrollY, 200) * -0.5}px) scale(${1 - Math.min(scrollY, 200) / 700})` }}
        />
      </section>

      {/* Main Shop Content */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20 mb-6">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-600">Premium Collection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Premium Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium denim, luxury t-shirts, and designer footwear. 
            Each piece is crafted with exceptional quality and timeless style.
          </p>
        </div>
        
        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedCategory === 'all' 
                ? 'border-yellow-400 bg-yellow-400/10' 
                : 'border-gray-200 bg-white hover:border-yellow-300 hover:bg-yellow-400/5'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{allProducts.length}</div>
              <div className="text-sm text-gray-600">All Products</div>
            </div>
          </div>
          
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedCategory === 'denim' 
                ? 'border-yellow-400 bg-yellow-400/10' 
                : 'border-gray-200 bg-white hover:border-yellow-300 hover:bg-yellow-400/5'
            }`}
            onClick={() => setSelectedCategory('denim')}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{denimProducts.length}</div>
              <div className="text-sm text-gray-600">Premium Denim</div>
            </div>
          </div>
          
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedCategory === 'tshirts' 
                ? 'border-yellow-400 bg-yellow-400/10' 
                : 'border-gray-200 bg-white hover:border-yellow-300 hover:bg-yellow-400/5'
            }`}
            onClick={() => setSelectedCategory('tshirts')}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{tshirtProducts.length}</div>
              <div className="text-sm text-gray-600">Luxury T-Shirts</div>
            </div>
          </div>
          
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              selectedCategory === 'shoes' 
                ? 'border-yellow-400 bg-yellow-400/10' 
                : 'border-gray-200 bg-white hover:border-yellow-300 hover:bg-yellow-400/5'
            }`}
            onClick={() => setSelectedCategory('shoes')}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{shoeProducts.length}</div>
              <div className="text-sm text-gray-600">Designer Shoes</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* View Mode */}
            <div className="flex items-center border rounded-lg bg-white">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
              {selectedCategory !== 'all' && (
                <span className="ml-2">
                  in <span className="font-medium capitalize text-yellow-600">{selectedCategory}</span>
                </span>
              )}

            </p>
            
            {/* Category Badge */}
            {selectedCategory !== 'all' && (
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-600 capitalize">
                  {selectedCategory === 'denim' ? 'Premium Denim' : 
                   selectedCategory === 'tshirts' ? 'Luxury T-Shirts' : 
                   selectedCategory === 'shoes' ? 'Designer Shoes' : selectedCategory}
                </span>
              </div>
            )}


          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-400" />
              {favorites.size} favorited
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShoppingCart className="w-4 h-4 text-blue-400" />
              {cartItems.length} in cart
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} isListView />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or browse all categories
            </p>
            <Button onClick={() => setSelectedCategory('all')}>
              View All Products
            </Button>
          </div>
        )}
      </div>



        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ShopCollection
