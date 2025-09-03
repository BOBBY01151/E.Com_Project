import { Button } from "./ui/button";
import { Award, Truck, RefreshCw, Shield, Shirt, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState, useRef } from 'react';

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handcrafted with the finest materials and attention to detail."
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $100 worldwide."
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns and exchanges on all purchases."
  },
  {
    icon: Shield,
    title: "Warranty",
    description: "1-year warranty against manufacturing defects."
  }
];

export function AboutSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute top-10 right-10 w-64 h-64 border border-gray-200 rounded-full opacity-20"
        style={{
          transform: `translateY(${scrollProgress * -100}px) scale(${0.5 + scrollProgress * 0.5})`
        }}
      ></div>
      <div 
        className="absolute bottom-20 left-10 w-32 h-32 bg-black/5 rounded-full"
        style={{
          transform: `translateY(${scrollProgress * 80}px) rotate(${scrollProgress * 180}deg)`
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div 
            className="space-y-8"
            style={{
              transform: `translateX(${(1 - scrollProgress) * -50}px)`,
              opacity: scrollProgress
            }}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full mb-4">
                <Star className="w-4 h-4 text-black" />
                <span className="text-sm font-medium">About Fashion</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                Redefining Fashion 
                <span className="block">for the Modern World</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Fashion is a complete lifestyle brand dedicated to bringing you the finest 
                collection of t-shirts, trousers, and sneakers. We believe that great style 
                should be accessible, sustainable, and timeless.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment to quality craftsmanship and ethical manufacturing ensures 
                that every piece in our collection meets the highest standards while 
                contributing to a more sustainable fashion future.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 px-8"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-black text-black hover:bg-black hover:text-white px-8"
              >
                Our Story
              </Button>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            style={{
              transform: `translateX(${(1 - scrollProgress) * 50}px)`,
              opacity: scrollProgress
            }}
          >
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100"
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Updated Stats Section */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            style={{
              transform: `translateY(${(1 - scrollProgress) * 30}px)`,
              opacity: scrollProgress
            }}
          >
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2 group-hover:scale-110 transition-transform">
                200+
              </div>
              <div className="text-gray-600 font-medium">T-Shirt Designs</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2 group-hover:scale-110 transition-transform">
                150+
              </div>
              <div className="text-gray-600 font-medium">Trouser Styles</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2 group-hover:scale-110 transition-transform">
                100+
              </div>
              <div className="text-gray-600 font-medium">Sneaker Models</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-black mb-2 group-hover:scale-110 transition-transform">
                50k+
              </div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Category Icons */}
        <div className="mt-16 flex justify-center gap-12">
          <div className="text-center group">
            <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:scale-110 transition-all duration-300">
              <Shirt className="w-8 h-8 text-black group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">T-Shirts</span>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:scale-110 transition-all duration-300">
              <ShoppingBag className="w-8 h-8 text-black group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">Trousers</span>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:scale-110 transition-all duration-300">
              <Award className="w-8 h-8 text-black group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">Sneakers</span>
          </div>
        </div>
      </div>
    </section>
  );
}