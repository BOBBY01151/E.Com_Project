'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { 
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  ArrowRight,
  ChevronDown,
  Sparkles,
  CreditCard,
  Truck,
  Shield,
  Tag,
  Gift,
  CheckCircle2,
  X
} from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart, CartItem } from '../contexts/CartContext';
import { Footer } from './Footer';

export function ShoppingCartPage() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);



  // Enhanced Loading screen component
  const LoadingScreen = () => (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Main Loading Spinner */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
            <motion.div
              className="absolute inset-0 border-4 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner Ring */}
            <motion.div
              className="absolute inset-4 border-4 border-gray-400/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center Icon */}
            <motion.div
              className="absolute inset-8 bg-white rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShoppingCart className="w-8 h-8 text-black" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Title Animation */}
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Loading
          </motion.span>
          <motion.span 
            className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Your Cart
          </motion.span>
        </motion.h1>
        
        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "300px" }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="h-2 bg-gradient-to-r from-white to-gray-400 mx-auto rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1.5 }}
          />
        </motion.div>
        
        {/* Loading Text */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-white/80 mt-6 text-xl"
        >
          Preparing your shopping experience...
        </motion.p>
        
        {/* Loading Dots */}
        <motion.div
          className="flex justify-center gap-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  const handleUpdateQuantity = (id: string, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'fashion20') {
      setPromoApplied(true);
    }
  };

  const subtotal = getTotalPrice();
  const discount = promoApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 200 ? 0 : 25;
  const total = subtotal - discount + shipping;

  const handleCheckout = () => {
    setCheckout(true);
    setTimeout(() => {
      setCheckout(false);
      clearCart();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {/* Enhanced Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: yBg, scale }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1740664651822-3a02ec12c121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzaG9wcGluZyUyMGJhZ3MlMjBmYXNoaW9ufGVufDF8fHx8MTc1Njk1NTE0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Shopping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + i * 8}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        {/* Parallax Text Content */}
        <motion.div 
          className="relative h-full flex items-center"
          style={{ y: yText, opacity }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white px-4 py-2 mb-6">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {cartItems.length} Items in Cart
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-8xl font-bold mb-8 leading-tight"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  Your
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  Shopping
                </motion.span>
                <motion.span 
                  className="block text-white/80"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  Cart
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8 leading-relaxed"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                Review your carefully curated selections and complete your fashion journey. 
                Every piece tells a story of style and sophistication.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-6 shadow-2xl">
                    Continue Shopping
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/50 text-white hover:bg-white hover:text-black px-8 py-6 backdrop-blur-sm"
                  >
                    View Wishlist
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mouse Parallax Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-sm mb-2">Scroll to review</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cart Items Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-400" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Start shopping to fill it with amazing products!</p>
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.h2 
                  className="text-3xl font-bold mb-8"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Shopping Cart ({cartItems.length} items)
                </motion.h2>
                
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="hover:shadow-xl transition-all duration-500">
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <motion.div 
                              className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
                              whileHover={{ scale: 1.05 }}
                            >
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-lg">{item.name}</h3>
                                  <p className="text-gray-600">{item.category}</p>
                                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                    {item.size && <span>Size: {item.size}</span>}
                                    {item.color && <span>Color: {item.color}</span>}
                                  </div>
                                </div>
                                
                                <motion.button
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <X className="w-5 h-5" />
                                </motion.button>
                              </div>
                              
                              <div className="flex justify-between items-end">
                                <div className="flex items-center gap-3">
                                  <motion.button
                                    onClick={() => handleUpdateQuantity(item.id, -1)}
                                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </motion.button>
                                  
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  
                                  <motion.button
                                    onClick={() => handleUpdateQuantity(item.id, 1)}
                                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </motion.button>
                                </div>
                                
                                <div className="text-right">
                                  <p className="font-bold text-lg">${item.price * item.quantity}</p>
                                  <p className="text-sm text-gray-500">${item.price} each</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="sticky top-8"
                >
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Promo Code */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Promo Code</label>
                        <div className="flex gap-2">
                          <Input
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter code"
                            disabled={promoApplied}
                          />
                          <Button 
                            onClick={applyPromoCode}
                            disabled={promoApplied || !promoCode}
                            size="sm"
                          >
                            {promoApplied ? <CheckCircle2 className="w-4 h-4" /> : 'Apply'}
                          </Button>
                        </div>
                        {promoApplied && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-green-600 text-sm flex items-center gap-1"
                          >
                            <Tag className="w-4 h-4" />
                            20% discount applied!
                          </motion.p>
                        )}
                      </div>
                      
                      <Separator />
                      
                      {/* Price Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${subtotal}</span>
                        </div>
                        {promoApplied && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount (20%)</span>
                            <span>-${discount}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${total}</span>
                        </div>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          onClick={handleCheckout}
                          className="w-full bg-black text-white hover:bg-gray-800 py-6"
                          disabled={checkout}
                        >
                          {checkout ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Secure Checkout
                              <Shield className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                      
                      {/* Benefits */}
                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Truck className="w-4 h-4" />
                          <span>Free shipping on orders over $200</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Shield className="w-4 h-4" />
                          <span>Secure payment processing</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Gift className="w-4 h-4" />
                          <span>Free returns within 30 days</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {checkout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: 2 }}
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4">Order Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. You'll receive a confirmation email shortly.
              </p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <p>Order Total: ${total}</p>
                <p>Estimated Delivery: 3-5 business days</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}