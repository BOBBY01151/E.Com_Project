'use client';

import { Button } from "./ui/button";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const heroImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1667544417110-403b89341112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZmFzaGlvbiUyMG1vZGVsJTIwdC1zaGlydHxlbnwxfHx8fDE3NTY3MDQ1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Premium T-Shirts",
    subtitle: "Comfort meets style"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1665672017097-205fe870657f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYmxhY2slMjB0cm91c2VycyUyMHBhbnRzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTY3MDQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Elegant Trousers",
    subtitle: "Tailored perfection"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1718802312963-daa58ede8736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzbmVha2VycyUyMGJsYWNrJTIwd2hpdGUlMjBtaW5pbWFsfGVufDF8fHx8MTc1NjcwNDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Luxury Sneakers",
    subtitle: "Step into tomorrow"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1611747581894-45e5f11c7be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBibGFjayUyMHdoaXRlJTIwb3V0Zml0fGVufDF8fHx8MTc1NjcwNDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Complete Outfits",
    subtitle: "Styled to impress"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1693901257178-b5fcb8f036a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGNsb3RoaW5nJTIwc3RvcmV8ZW58MXx8fHwxNzU2NzA0NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Minimalist Collection",
    subtitle: "Less is more"
  }
];

export function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image Slider with Parallax */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              transform: `translateY(${scrollProgress * 100}px) scale(${1 + scrollProgress * 0.2})`
            }}
          >
            <ImageWithFallback
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
              style={{
                transform: `translateX(${scrollProgress * -50}px)`
              }}
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
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Collection
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold"
                >
                  Explore Styles
                  <ArrowRight className="ml-2 h-5 w-5" />
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
              style={{
                transform: `translateX(${scrollProgress * 50}px)`
              }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white border border-white/20">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">
                      {heroImages[currentImageIndex].title}
                    </h3>
                    <p className="text-xl text-gray-200">
                      {heroImages[currentImageIndex].subtitle}
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
        style={{
          transform: `translateY(${scrollProgress * -80}px) rotate(${scrollProgress * 180}deg)`
        }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-black">50%</div>
          <div className="text-xs text-gray-600">OFF</div>
        </div>
      </div>

      <div 
        className="absolute bottom-32 left-20 bg-black border-2 border-white text-white rounded-full p-6 shadow-2xl hidden lg:block"
        style={{
          transform: `translateY(${scrollProgress * 60}px) scale(${1 - scrollProgress * 0.2})`
        }}
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
          style={{ opacity: 1 - scrollProgress }}
        >
          <span className="text-sm font-medium">Scroll to discover</span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Geometric Parallax Elements */}
      <div 
        className="absolute top-1/4 left-10 w-32 h-32 border-2 border-white/20 rotate-45 hidden lg:block"
        style={{
          transform: `rotate(${45 + scrollProgress * 180}deg) scale(${1 + scrollProgress * 0.5})`
        }}
      ></div>
      
      <div 
        className="absolute bottom-1/4 right-10 w-24 h-24 bg-white/10 rounded-full hidden lg:block"
        style={{
          transform: `translateY(${scrollProgress * -100}px) scale(${1 - scrollProgress * 0.3})`
        }}
      ></div>
    </section>
  );
}