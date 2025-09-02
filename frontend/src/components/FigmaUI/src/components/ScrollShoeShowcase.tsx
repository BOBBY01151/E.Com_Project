'use client';

import { useEffect, useRef, useState } from 'react';
import { ThreeShoe } from './ThreeShoe';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const shoeModels = [
  {
    id: 1,
    name: "Air Jordan Retro",
    variant: 'jordan' as const,
    price: "$190",
    description: "The legendary basketball shoe that started it all. Premium leather construction with iconic design.",
    image: "https://images.unsplash.com/photo-1723797935115-92b666c26e14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwYWlyJTIwam9yZGFuJTIwc25lYWtlcnN8ZW58MXx8fHwxNzU2NzAwNDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Air Max 90",
    variant: 'airmax' as const,
    price: "$120",
    description: "Revolutionary Air cushioning technology meets modern street style. Maximum comfort, maximum impact.",
    image: "https://images.unsplash.com/photo-1640016713197-76fe85053279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwYWlyJTIwbWF4JTIwc2hvZXN8ZW58MXx8fHwxNzU2NzAzMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Dunk Low",
    variant: 'dunk' as const,
    price: "$100",
    description: "Born on the basketball court, adopted by the streets. The perfect blend of heritage and contemporary style.",
    image: "https://images.unsplash.com/photo-1692620334887-06a4051bcf26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwZHVuayUyMHNuZWFrZXJzfGVufDF8fHx8MTc1NjcwMzAyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function ScrollShoeShowcase() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleShoes, setVisibleShoes] = useState<boolean[]>([false, false, false]);
  const containerRef = useRef<HTMLDivElement>(null);
  const shoeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress for the container
      const startScroll = containerTop - windowHeight;
      const endScroll = containerTop + containerHeight;
      const progress = Math.max(0, Math.min(1, (scrollTop - startScroll) / (endScroll - startScroll)));
      
      setScrollProgress(progress);

      // Check which shoes are visible
      const newVisibleShoes = shoeRefs.current.map((ref, index) => {
        if (!ref) return false;
        const rect = ref.getBoundingClientRect();
        return rect.top < windowHeight && rect.bottom > 0;
      });
      
      setVisibleShoes(newVisibleShoes);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Iconic Nike Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our premium Nike collection in stunning 3D. Each model tells a story of innovation, 
            style, and performance that has shaped sneaker culture for decades.
          </p>
        </div>

        {/* Scrolling Shoe Models */}
        <div className="space-y-32">
          {shoeModels.map((shoe, index) => (
            <div
              key={shoe.id}
              ref={(el) => (shoeRefs.current[index] = el)}
              className={`transition-all duration-1000 ${
                visibleShoes[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* 3D Shoe Model */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div 
                    className="aspect-square w-full max-w-lg mx-auto transform transition-all duration-700"
                    style={{
                      transform: `
                        scale(${0.8 + scrollProgress * 0.4}) 
                        rotateY(${scrollProgress * 360 * (index + 1)}deg)
                        translateZ(${scrollProgress * 50}px)
                      `
                    }}
                  >
                    <ThreeShoe 
                      variant={shoe.variant} 
                      scrollProgress={scrollProgress + index * 0.2}
                    />
                  </div>
                  
                  {/* Floating price tag */}
                  <div 
                    className="absolute top-8 right-8 bg-black text-white px-4 py-2 rounded-full font-bold transform transition-all duration-500"
                    style={{
                      transform: `translateY(${Math.sin(scrollProgress * Math.PI * 2 + index) * 20}px) rotate(${scrollProgress * 180}deg)`
                    }}
                  >
                    {shoe.price}
                  </div>
                </div>

                {/* Shoe Information */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={shoe.image}
                          alt={shoe.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Nike
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold text-black">
                          {shoe.name}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {shoe.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="text-2xl font-bold text-black">3D</div>
                      <div className="text-sm text-gray-600">Interactive View</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="text-2xl font-bold text-black">360°</div>
                      <div className="text-sm text-gray-600">Full Rotation</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-black text-white hover:bg-gray-800 px-8"
                    >
                      Add to Cart • {shoe.price}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-black text-black hover:bg-black hover:text-white px-8"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}