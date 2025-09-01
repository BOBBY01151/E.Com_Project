import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ShoppingBag, User, Search, Menu } from 'lucide-react'

const FigmaHeader = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = window.innerHeight * 0.5
      const progress = Math.min(scrolled / maxScroll, 1)
      setScrollProgress(progress)
      setIsScrolled(scrolled > 20)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Collections', href: '#collections' },
    { name: 'Featured', href: '#featured' },
    { name: 'Testimonials', href: '#testimonials' },
  ]

  return (
    <header 
      className={`
        fixed top-0 w-full z-50 transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
        }
      `}
      style={{ transform: `translateY(${scrollProgress * -10}px)` }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-white/90 to-gray-50/90 transition-opacity duration-500" 
        style={{ opacity: scrollProgress * 0.8 }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center transition-all duration-300"
            style={{ transform: `scale(${1 - scrollProgress * 0.1}) translateX(${scrollProgress * 20}px)` }}
          >
            <h1 
              className={`text-2xl font-bold transition-all duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}
              style={{ textShadow: isScrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              LUXE
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a 
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  if (!item.href.startsWith('#')) return
                  e.preventDefault()
                  const element = document.querySelector(item.href)
                  if (element) {
                    const headerHeight = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.scrollY - headerHeight
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                  }
                }}
                className={`
                  font-medium transition-all duration-300 hover:scale-110 relative group cursor-pointer
                  ${isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}
                `}
                style={{
                  transform: `translateY(${scrollProgress * (index * 2 + 5)}px) scale(${1 - scrollProgress * 0.05})`,
                  textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.2)'
                }}
              >
                {item.name}
                <div 
                  className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-white'}`}
                />
              </a>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div 
            className="flex items-center space-x-4"
            style={{ transform: `translateX(${scrollProgress * -20}px) scale(${1 - scrollProgress * 0.1})` }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className={`hidden sm:flex transition-all duration-300 hover:scale-110 ${isScrolled ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={`transition-all duration-300 hover:scale-110 ${isScrolled ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={`transition-all duration-300 hover:scale-110 relative group ${isScrolled ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
            >
              <ShoppingBag className="h-5 w-5" />
              <div 
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold transition-all duration-300 group-hover:scale-125"
                style={{ transform: `rotate(${scrollProgress * 360}deg) scale(${1 + scrollProgress * 0.2})` }}
              >
                2
              </div>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`md:hidden transition-all duration-300 hover:scale-110 ${isScrolled ? 'text-black hover:bg-black/10' : 'text-white hover:bg-white/20'}`}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-black via-gray-600 to-black transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%`, opacity: scrollProgress > 0.1 ? 1 : 0 }}
      />
    </header>
  )
}

export default FigmaHeader


