'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const categories = {
  tshirts: {
    title: "Premium T-Shirts",
    subtitle: "Comfort meets contemporary design",
    description: "Crafted from the finest materials, our t-shirts deliver unmatched comfort and style for the modern individual.",
    products: [
      {
        id: 1,
        name: "Essential Black Tee",
        price: "$45",
        originalPrice: "$60",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwd2hpdGUlMjB0LXNoaXJ0JTIwbWluaW1hbCUyMGZhc2hpb258ZW58MXx8fHwxNzU2NzA0NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.9,
        reviews: 234,
        badge: "Bestseller"
      },
      {
        id: 2,
        name: "Minimalist White",
        price: "$42",
        image: "https://images.unsplash.com/photo-1667544417110-403b89341112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZmFzaGlvbiUyMG1vZGVsJTIwdC1zaGlydHxlbnwxfHx8fDE3NTY3MDQ1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.8,
        reviews: 189,
        badge: "New"
      },
      {
        id: 3,
        name: "Urban Gray",
        price: "$48",
        image: "https://images.unsplash.com/photo-1693901257178-b5fcb8f036a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGNsb3RoaW5nJTIwc3RvcmV8ZW58MXx8fHwxNzU2NzA0NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.7,
        reviews: 156
      }
    ]
  },
  trousers: {
    title: "Elegant Trousers",
    subtitle: "Tailored to perfection",
    description: "From boardroom to weekend, our premium trousers blend sophisticated tailoring with modern comfort.",
    products: [
      {
        id: 4,
        name: "Executive Black",
        price: "$120",
        originalPrice: "$150",
        image: "https://images.unsplash.com/photo-1615398264198-718da97f988d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBibGFjayUyMHRyb3VzZXJzJTIwbWVuJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTY3MDQ3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.9,
        reviews: 167,
        badge: "Premium"
      },
      {
        id: 5,
        name: "Casual Chino",
        price: "$85",
        image: "https://images.unsplash.com/photo-1665672017097-205fe870657f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYmxhY2slMjB0cm91c2VycyUyMHBhbnRzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTY3MDQ1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.8,
        reviews: 203,
        badge: "Comfort"
      },
      {
        id: 6,
        name: "Slim Fit Navy",
        price: "$95",
        image: "https://images.unsplash.com/photo-1611747581894-45e5f11c7be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBibGFjayUyMHdoaXRlJTIwb3V0Zml0fGVufDF8fHx8MTc1NjcwNDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.6,
        reviews: 134
      }
    ]
  },
  sneakers: {
    title: "Luxury Sneakers",
    subtitle: "Where performance meets style",
    description: "Step into the future with our collection of premium sneakers that combine cutting-edge technology with timeless design.",
    products: [
      {
        id: 7,
        name: "Designer White",
        price: "$180",
        originalPrice: "$220",
        image: "https://images.unsplash.com/photo-1642957464439-7c653ed1328c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNuZWFrZXJzJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1NjcwNDcwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.9,
        reviews: 342,
        badge: "Limited"
      },
      {
        id: 8,
        name: "Street Black",
        price: "$165",
        image: "https://images.unsplash.com/photo-1718802312963-daa58ede8736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzbmVha2VycyUyMGJsYWNrJTIwd2hpdGUlMjBtaW5pbWFsfGVufDF8fHx8MTc1NjcwNDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.8,
        reviews: 287,
        badge: "Trending"
      },
      {
        id: 9,
        name: "Classic Retro",
        price: "$145",
        image: "https://images.unsplash.com/photo-1723797935115-92b666c26e14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwYWlyJTIwam9yZGFuJTIwc25lYWtlcnN8ZW58MXx8fHwxNzU2NzAwNDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        rating: 4.7,
        reviews: 198
      }
    ]
  }
};

interface CategoryShowcaseProps {
  category: keyof typeof categories;
}

export function CategoryShowcase({ category }: CategoryShowcaseProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  const categoryData = categories[category];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));
      
      setScrollProgress(progress);

      // Check product visibility
      const newVisibleProducts = productRefs.current.map((ref) => {
        if (!ref) return false;
        const productRect = ref.getBoundingClientRect();
        return productRect.top < windowHeight && productRect.bottom > 0;
      });
      
      setVisibleProducts(newVisibleProducts);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className="text-center mb-20"
          style={{
            transform: `translateY(${(1 - scrollProgress) * 50}px)`,
            opacity: scrollProgress
          }}
        >
          <Badge variant="outline" className="mb-4 border-black text-black">
            {categoryData.title}
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
            {categoryData.subtitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {categoryData.description}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {categoryData.products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              className={`group transition-all duration-700 ${
                visibleProducts[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <Badge 
                      className="absolute top-4 left-4 bg-black text-white"
                    >
                      {product.badge}
                    </Badge>
                  )}
                  
                  {/* Wishlist */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                    <Heart className="w-4 h-4 text-black" />
                  </button>

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Button className="bg-white text-black hover:bg-gray-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Quick Add
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating) 
                              ? 'fill-black text-black' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-black">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
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
        <div 
          className="text-center mt-16"
          style={{
            transform: `translateY(${(1 - scrollProgress) * 30}px)`,
            opacity: scrollProgress
          }}
        >
          <Button 
            variant="outline" 
            size="lg"
            className="border-black text-black hover:bg-black hover:text-white px-8"
          >
            View All {categoryData.title}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}