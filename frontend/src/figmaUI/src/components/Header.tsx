'use client';

import { Button } from "./ui/button";
import { ShoppingBag, User, Search, Menu } from "lucide-react";
import { useEffect, useState } from 'react';


export function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const handleProfileClick = () => {
    // In a real app, this would navigate to the profile page
    // For demo purposes, we'll just show an alert
    alert('Navigate to Profile Page - In a real app, this would use your router (React Router, Next.js router, etc.)');
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight * 0.5; // Adjust this value to control when effects trigger
      const progress = Math.min(scrolled / maxScroll, 1);
      
      setScrollProgress(progress);
      setIsScrolled(scrolled > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        fixed top-0 w-full z-50 transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
        }
      `}
      style={{
        transform: `translateY(${scrollProgress * -10}px)`,
      }}
    >
      {/* Animated background overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-white/90 to-gray-50/90 transition-opacity duration-500"
        style={{
          opacity: scrollProgress * 0.8,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo with parallax effect */}
          <div 
            className="flex items-center transition-all duration-300"
            style={{
              transform: `scale(${1 - scrollProgress * 0.1}) translateX(${scrollProgress * 20}px)`,
            }}
          >
            <h1 
              className={`
                text-2xl font-bold transition-all duration-300
                ${isScrolled ? 'text-black' : 'text-white'}
              `}
              style={{
                textShadow: isScrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              FASHION
            </h1>
          </div>

          {/* Desktop Navigation with staggered parallax */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'T-Shirts', href: '#tshirts' },
              { name: 'Trousers', href: '#trousers' },
              { name: 'Sneakers', href: '#sneakers' },
              { name: 'Featured', href: '#featured' },
              { name: 'About', href: '#about' }
            ].map((item, index) => (
              <a 
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    const headerHeight = 80; // Account for fixed header
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`
                  font-medium transition-all duration-300 hover:scale-110 relative group cursor-pointer
                  ${isScrolled ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-200'}
                `}
                style={{
                  transform: `translateY(${scrollProgress * (index * 2 + 5)}px) scale(${1 - scrollProgress * 0.05})`,
                  textShadow: isScrolled ? 'none' : '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {item.name}
                {/* Animated underline */}
                <div 
                  className={`
                    absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300
                    ${isScrolled ? 'bg-black' : 'bg-white'}
                  `}
                />
              </a>
            ))}
          </nav>

          {/* Right Side Icons with parallax */}
          <div 
            className="flex items-center space-x-4"
            style={{
              transform: `translateX(${scrollProgress * -20}px) scale(${1 - scrollProgress * 0.1})`,
            }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className={`
                hidden sm:flex transition-all duration-300 hover:scale-110
                ${isScrolled 
                  ? 'text-black hover:bg-black/10' 
                  : 'text-white hover:bg-white/20'
                }
              `}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleProfileClick}
              className={`
                transition-all duration-300 hover:scale-110 relative group
                ${isScrolled 
                  ? 'text-black hover:bg-black/10' 
                  : 'text-white hover:bg-white/20'
                }
              `}
            >
              <User className="h-5 w-5" />
              {/* Profile indicator */}
              <div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white opacity-80 group-hover:opacity-100 transition-opacity"
                style={{
                  transform: `scale(${1 + scrollProgress * 0.2})`,
                }}
              />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className={`
                transition-all duration-300 hover:scale-110 relative group
                ${isScrolled 
                  ? 'text-black hover:bg-black/10' 
                  : 'text-white hover:bg-white/20'
                }
              `}
            >
              <ShoppingBag className="h-5 w-5" />
              {/* Cart badge with parallax */}
              <div 
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold transition-all duration-300 group-hover:scale-125"
                style={{
                  transform: `rotate(${scrollProgress * 360}deg) scale(${1 + scrollProgress * 0.2})`,
                }}
              >
                2
              </div>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={`
                md:hidden transition-all duration-300 hover:scale-110
                ${isScrolled 
                  ? 'text-black hover:bg-black/10' 
                  : 'text-white hover:bg-white/20'
                }
              `}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-black via-gray-600 to-black transition-all duration-300"
        style={{
          width: `${scrollProgress * 100}%`,
          opacity: scrollProgress > 0.1 ? 1 : 0,
        }}
      />

      {/* Floating particles effect */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full opacity-0 transition-opacity duration-500 animate-pulse"
          style={{
            left: `${20 + i * 15}%`,
            top: '50%',
            transform: `translateY(${scrollProgress * (i * 10 - 20)}px) rotate(${scrollProgress * 360}deg)`,
            opacity: isScrolled ? 0 : scrollProgress * 0.7,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      {/* Geometric shapes for visual interest */}
      <div 
        className="absolute top-2 right-32 w-3 h-3 border border-white/20 rotate-45 opacity-0 transition-opacity duration-500"
        style={{
          transform: `rotate(${45 + scrollProgress * 180}deg) scale(${1 + scrollProgress * 0.5})`,
          opacity: isScrolled ? 0 : scrollProgress * 0.4,
        }}
      />
      
      <div 
        className="absolute bottom-2 left-32 w-2 h-2 bg-white/20 rounded-full opacity-0 transition-opacity duration-500"
        style={{
          transform: `translateX(${scrollProgress * 50}px) scale(${1 - scrollProgress * 0.3})`,
          opacity: isScrolled ? 0 : scrollProgress * 0.5,
        }}
      />


    </header>
  );
}