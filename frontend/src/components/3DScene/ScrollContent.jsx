import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Sparkles, Zap, Target, ShoppingBag, Star, TrendingUp } from 'lucide-react'

const ScrollContent = () => {
  const titleRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  const featuresRef = useRef()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex items-center justify-center relative">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
            style={{
              transform: `translateY(${Math.max(0, 100 - scrollY * 0.1)}px)`,
              opacity: Math.max(0.3, 1 - scrollY * 0.002)
            }}
          >
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Fashion Forward
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              3D Shopping
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay"
            style={{
              transform: `translateY(${Math.max(0, 50 - scrollY * 0.05)}px)`,
              opacity: Math.max(0.3, 1 - scrollY * 0.0015)
            }}
          >
            Experience the future of online shopping with our interactive 3D fashion models. 
            See how clothes look from every angle as you scroll.
          </p>
          
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delay-2"
            style={{
              transform: `translateY(${Math.max(0, 30 - scrollY * 0.03)}px)`,
              opacity: Math.max(0.3, 1 - scrollY * 0.001)
            }}
          >
            <button className="group bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center gap-2">
                Shop Now
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
            </button>
            
            <button className="group border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10">
              <span className="flex items-center gap-2">
                View Collection
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section min-h-screen flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div 
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{
              transform: `translateY(${Math.max(0, 100 - scrollY * 0.2)}px)`,
              opacity: Math.max(0.3, 1 - Math.max(0, scrollY - 500) * 0.001)
            }}
          >
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="3D Try-On"
              description="See how clothes fit and look from every angle with our interactive 3D models. No more guessing!"
              color="from-pink-500 to-purple-500"
            />
            
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Trending Styles"
              description="Discover the latest fashion trends with our curated collections and real-time style updates."
              color="from-blue-500 to-cyan-500"
            />
            
            <FeatureCard
              icon={<Star className="w-8 h-8" />}
              title="Premium Quality"
              description="Shop with confidence knowing all our products are carefully selected for quality and style."
              color="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black/40 to-purple-900/40 backdrop-blur-sm">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Style?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of fashion-forward shoppers already experiencing the future of online retail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-12 py-4 rounded-full font-semibold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              Start Shopping
            </button>
            <button className="border-2 border-white/30 hover:border-white/60 text-white px-12 py-4 rounded-full font-semibold text-xl transition-all duration-300 hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105">
      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  )
}

export default ScrollContent
