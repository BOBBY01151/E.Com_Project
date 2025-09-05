'use client';

import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Filter, 
  Grid3X3, 
  List, 
  Search,
  Star,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

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
    originalPrice: 199.99,
    category: 'denim',
    subcategory: 'jeans',
    color: 'Black',
    size: ['29', '30', '31', '32', '33', '34'],
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1700844414385-0cedc33e4bd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGRlbmltJTIwamVhbnN8ZW58MXx8fHwxNzU2NzIxMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: false,
    description: 'Sleek black denim with modern slim-fit tailoring and premium finish.'
  },
  {
    id: 'denim-4',
    name: 'Vintage Denim Jacket',
    price: 139.99,
    category: 'denim',
    subcategory: 'jacket',
    color: 'Light Blue',
    size: ['S', 'M', 'L', 'XL'],
    rating: 4.6,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1563339387-0ba9892a3f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqYWNrZXR8ZW58MXx8fHwxNzU2Njg4MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: false,
    description: 'Classic vintage-style denim jacket with authentic washed finish.'
  },
  {
    id: 'denim-5',
    name: 'Premium Straight Cut',
    price: 199.99,
    category: 'denim',
    subcategory: 'jeans',
    color: 'Indigo',
    size: ['30', '32', '34', '36', '38'],
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1558234200-3efd43232f08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGplYW5zJTIwZmFzaGlvbiUyMHN0b3JlfGVufDF8fHx8MTc1NjcyMTA2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: true,
    isFeatured: true,
    description: 'Timeless straight-cut denim with heavy-weight construction and classic fit.'
  },
  {
    id: 'denim-6',
    name: 'Artisan Crafted Denim',
    price: 279.99,
    category: 'denim',
    subcategory: 'jeans',
    color: 'Dark Indigo',
    size: ['28', '30', '32', '34'],
    rating: 5.0,
    reviews: 34,
    image: 'https://images.unsplash.com/photo-1732551146857-6e12616efb27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZGVuaW0lMjBqZWFucyUyMGZhc2hpb258ZW58MXx8fHwxNzU2NzIxMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: true,
    isFeatured: true,
    description: 'Hand-crafted premium denim with unique aging and finishing techniques.'
  }
];

const tshirtProducts = [
  {
    id: 'tshirt-1',
    name: 'Premium Cotton Tee',
    price: 49.99,
    category: 'tshirts',
    subcategory: 'basic',
    color: 'White',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwdC1zaGlydCUyMGZhc2hpb258ZW58MXx8fHwxNzU2NzIxMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: false,
    description: 'Ultra-soft 100% organic cotton with perfect fit and breathable comfort.'
  }
];

const shoeProducts = [
  {
    id: 'shoes-1',
    name: 'Luxury Sneakers',
    price: 179.99,
    category: 'shoes',
    subcategory: 'sneakers',
    color: 'White',
    size: ['7', '8', '9', '10', '11', '12'],
    rating: 4.8,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1718882703813-5b18d074242a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2hpdGUlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NTY3MjEwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: true,
    isFeatured: false,
    description: 'Minimalist design with premium leather and exceptional comfort technology.'
  },
  {
    id: 'shoes-2',
    name: 'Designer Athletic Shoes',
    price: 229.99,
    category: 'shoes',
    subcategory: 'athletic',
    color: 'Black/White',
    size: ['7', '8', '9', '10', '11'],
    rating: 4.9,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1543652711-77eeb35ae548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzbmVha2VycyUyMHNob2VzfGVufDF8fHx8MTc1NjcyMTA3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isNew: false,
    isFeatured: true,
    description: 'High-performance athletic shoes with advanced cushioning and style.'
  }
];

const allProducts = [...denimProducts, ...tshirtProducts, ...shoeProducts];

type ViewMode = 'grid' | 'list';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rating';

export function ShopCollection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'denim' | 'tshirts' | 'shoes'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    let products = selectedCategory === 'all' ? allProducts : allProducts.filter(p => p.category === selectedCategory);
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products = [...products].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        products = [...products].sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        products = [...products].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
    
    setFilteredProducts(products);
  }, [selectedCategory, sortBy]);

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const addToCart = (productId: string) => {
    const newCart = new Set(cart);
    newCart.add(productId);
    setCart(newCart);
  };

  const ProductCard = ({ product, isListView = false }: { product: any, isListView?: boolean }) => (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white ${isListView ? 'flex' : ''}`}>
      <div className={`relative overflow-hidden ${isListView ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={isListView ? 192 : 400}
          height={isListView ? 240 : 400}
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
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-white/90 border-black hover:bg-black hover:text-white"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-current text-red-500' : ''}`} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 bg-white/90 border-black hover:bg-black hover:text-white"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardContent className={`p-4 ${isListView ? 'flex-1' : ''}`}>
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-3 h-3 fill-current text-yellow-500" />
              <span>{product.rating}</span>
              <span>({product.reviews})</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Color: {product.color}</span>
            <span>•</span>
            <span>Sizes: {product.size.slice(0, 3).join(', ')}{product.size.length > 3 ? '...' : ''}</span>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">${product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
              )}
            </div>
            
            <Button 
              size="sm"
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => addToCart(product.id)}
            >
              {cart.has(product.id) ? 'Added' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-800 to-black text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Premium Collection
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover our curated selection of premium denim, luxury t-shirts, and designer footwear. 
              Crafted with exceptional quality and timeless style.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white px-4 py-2">
                Free Shipping Over $150
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white px-4 py-2">
                30-Day Returns
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white px-4 py-2">
                Premium Materials
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Shop Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Tabs & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)} className="flex-1">
            <TabsList className="bg-white shadow-sm h-12">
              <TabsTrigger value="all" className="px-6">All Products</TabsTrigger>
              <TabsTrigger value="denim" className="px-6">Premium Denim</TabsTrigger>
              <TabsTrigger value="tshirts" className="px-6">T-Shirts</TabsTrigger>
              <TabsTrigger value="shoes" className="px-6">Shoes</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-48 bg-white">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex items-center border rounded-lg bg-white">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
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
          <p className="text-gray-600">
            Showing {filteredProducts.length} products
            {selectedCategory !== 'all' && (
              <span className="ml-2">
                in <span className="font-medium capitalize">{selectedCategory}</span>
              </span>
            )}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{favorites.size} favorited</span>
            <span>•</span>
            <span>{cart.size} in cart</span>
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
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or browse all products.</p>
            <Button 
              className="mt-4"
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('featured');
              }}
            >
              View All Products
            </Button>
          </div>
        )}

        {/* Featured Section - Premium Denim Highlight */}
        {selectedCategory === 'all' && (
          <div className="mt-16 py-16 bg-gradient-to-r from-gray-900 to-black rounded-2xl text-white">
            <div className="max-w-4xl mx-auto px-8 text-center">
              <h2 className="text-4xl font-bold mb-6">Premium Denim Collection</h2>
              <p className="text-xl text-white/80 mb-8">
                Our signature denim pieces are crafted with the finest materials and traditional techniques, 
                offering unmatched quality and timeless style that improves with age.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <h3 className="font-medium mb-2">Premium Materials</h3>
                  <p className="text-white/70 text-sm">Japanese selvedge and organic cotton</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✂️</span>
                  </div>
                  <h3 className="font-medium mb-2">Artisan Crafted</h3>
                  <p className="text-white/70 text-sm">Hand-finished with attention to detail</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">♻️</span>
                  </div>
                  <h3 className="font-medium mb-2">Sustainable</h3>
                  <p className="text-white/70 text-sm">Eco-friendly production methods</p>
                </div>
              </div>

              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-black"
                onClick={() => setSelectedCategory('denim')}
              >
                Shop Denim Collection
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}