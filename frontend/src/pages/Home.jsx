import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../store/slices/productSlice'
import ModernProductCard from '../components/ModernProductCard'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { 
  ArrowRight, 
  Star, 
  ShoppingBag,
  TrendingUp,
  Award,
  Zap,
  Truck,
  Shield,
  Clock,
  Heart,
  Eye,
  ChevronRight,
  Play,
  Facebook,
  Instagram,
  Twitter,
  Youtube
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

  // FigmaUI-style hero images with titles/subtitles
  const heroImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1667544417110-403b89341112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZmFzaGlvbiUyMG1vZGVsJTIwdC1zaGlydHxlbnwxfHx8fDE3NTY3MDQ1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Premium T-Shirts',
      subtitle: 'Comfort meets style'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1665672017097-205fe870657f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYmxhY2slMjB0cm91c2VycyUyMHBhbnRzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTY3MDQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Elegant Trousers',
      subtitle: 'Tailored perfection'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1718802312963-daa58ede8736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzbmVha2VycyUyMGJsYWNrJTIwd2hpdGUlMjBtaW5pbWFsfGVufDF8fHx8MTc1NjcwNDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Luxury Sneakers',
      subtitle: 'Step into tomorrow'
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

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '30-day money-back guarantee',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const collections = [
    {
      title: 'Athletic Shoes',
      subtitle: 'Performance & Style',
      description: 'Discover our premium collection of athletic footwear designed for ultimate comfort and performance.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      position: 'left'
    },
    {
      title: 'Designer T-Shirts',
      subtitle: 'Comfort Redefined',
      description: 'Luxurious fabrics meet modern design in our exclusive t-shirt collection.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      position: 'right'
    },
    {
      title: 'Formal Trousers',
      subtitle: 'Elegance in Motion',
      description: 'Perfectly tailored trousers that combine sophistication with contemporary style.',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      position: 'left'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Amazing quality products and fast delivery. The attention to detail is incredible!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Mike Davis',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Great customer service and excellent product selection. Will definitely shop again!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Emily Chen',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Perfect fit and comfortable materials. Love my new purchases from LUXE!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Background Image Slider with Parallax */}
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

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div 
                className="space-y-8 text-white"
                style={{ transform: `translateX(${Math.min(scrollY, 100) * -0.5}px)` }}
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 fill-white" />
                    <span className="text-sm font-medium">Premium Fashion Collection</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                    Fashion
                    <span className="block">Redefined</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                    Discover our curated collection of premium t-shirts, elegant trousers, 
                    and luxury sneakers. Where style meets sophistication.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                    asChild
                  >
                    <Link to="/products">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Shop Collection
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold"
                    asChild
                  >
                    <Link to="/products">
                      Explore Styles
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                {/* Category Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                  <div>
                    <div className="text-3xl font-bold text-white">200+</div>
                    <div className="text-sm text-gray-300">T-Shirts</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">150+</div>
                    <div className="text-sm text-gray-300">Trousers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">100+</div>
                    <div className="text-sm text-gray-300">Sneakers</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Current Image Info */}
              <div 
                className="relative"
                style={{ transform: `translateX(${Math.min(scrollY, 100) * 0.5}px)` }}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white border border-white/20">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">
                        {heroImages[currentImageIndex]?.title}
                      </h3>
                      <p className="text-xl text-gray-200">
                        {heroImages[currentImageIndex]?.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
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
                      <span className="text-sm text-gray-300">
                        {currentImageIndex + 1} / {heroImages.length}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold">Free</div>
                        <div className="text-sm text-gray-300">Shipping</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold">30d</div>
                        <div className="text-sm text-gray-300">Returns</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements with Parallax */}
        <div 
          className="absolute top-20 right-20 bg-white rounded-full p-6 shadow-2xl hidden lg:block"
          style={{ transform: `translateY(${Math.min(scrollY, 200) * -0.4}px) rotate(${Math.min(scrollY, 200) * 0.9}deg)` }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-black">50%</div>
            <div className="text-xs text-gray-600">OFF</div>
          </div>
        </div>
        <div 
          className="absolute bottom-32 left-20 bg-black border-2 border-white text-white rounded-full p-6 shadow-2xl hidden lg:block"
          style={{ transform: `translateY(${Math.min(scrollY, 200) * 0.3}px) scale(${1 - Math.min(scrollY, 200) / 700})` }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold">New</div>
            <div className="text-xs">Arrivals</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div 
            className="flex flex-col items-center gap-2 text-white transition-opacity duration-300"
            style={{ opacity: 1 - Math.min(scrollY / 300, 1) }}
          >
            <span className="text-sm font-medium">Scroll to discover</span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Geometric Parallax Elements */}
        <div 
          className="absolute top-1/4 left-10 w-32 h-32 border-2 border-white/20 rotate-45 hidden lg:block"
          style={{ transform: `rotate(${45 + Math.min(scrollY, 200)}deg) scale(${1 + Math.min(scrollY, 200) / 400})` }}
        />
        <div 
          className="absolute bottom-1/4 right-10 w-24 h-24 bg-white/10 rounded-full hidden lg:block"
          style={{ transform: `translateY(${Math.min(scrollY, 200) * -0.5}px) scale(${1 - Math.min(scrollY, 200) / 700})` }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose LUXE?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="card-glass hover-lift text-center p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Featured Collections
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collections designed for the modern individual
            </p>
          </div>

          <div className="space-y-16">
            {collections.map((collection, index) => (
              <div key={index} className={`flex flex-col ${collection.position === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                <div className="flex-1">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-lg text-primary font-medium mb-4">
                      {collection.subtitle}
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {collection.description}
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group"
                    asChild
                  >
                    <Link to="/products">
                      Explore Collection
                      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
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
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-glass p-8 hover-lift">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
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
                <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
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
