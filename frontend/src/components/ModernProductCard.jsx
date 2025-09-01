import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

const ModernProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Link to={`/products/${product._id}`}>
      <Card 
        className="group relative overflow-hidden hover-lift cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay with actions */}
          <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white"
                onClick={handleWishlist}
              >
                <Heart 
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : ''
                  }`} 
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white"
              >
                <Eye className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {product.isNew && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                New
              </span>
            )}
            {product.discount && (
              <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-foreground">
                {product.rating}
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Category */}
            {product.category && (
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {product.category}
              </p>
            )}
            
            {/* Product Name */}
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            
            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        {/* Quick Add to Cart */}
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
            variant="outline"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ModernProductCard;
