import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { 
  Award, Users, Heart, Leaf, Globe, Scissors, Star, ArrowRight, CheckCircle,
  Target, TrendingUp, Shield, Sparkles, ChevronDown, Zap, Eye, Palette,
  Clock, MapPin, Phone, Mail, Instagram, Twitter, Facebook, Linkedin
} from "lucide-react";

// Enhanced Team members data
const teamMembers = [
  {
    id: 1, name: "Sarah Chen", role: "Founder & Creative Director",
    bio: "With over 15 years in luxury fashion, Sarah founded our brand with a vision to create timeless pieces that blend traditional craftsmanship with modern design.",
    image: "https://images.unsplash.com/photo-1674729444118-5d62050429b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY4MjYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: { linkedin: "#", instagram: "#", twitter: "#" },
    expertise: ["Creative Direction", "Brand Strategy", "Sustainable Fashion"]
  },
  {
    id: 2, name: "Marcus Rodriguez", role: "Head of Design",
    bio: "Marcus brings innovative design perspectives from his background in haute couture, ensuring every piece meets our standards of excellence.",
    image: "https://images.unsplash.com/photo-1685703206366-d514f27076ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXwxfHwxNzU2ODI2MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: { linkedin: "#", instagram: "#", twitter: "#" },
    expertise: ["Haute Couture", "Pattern Making", "Design Innovation"]
  },
  {
    id: 3, name: "Elena Vasquez", role: "Sustainability Lead",
    bio: "Elena champions our commitment to sustainable fashion, working with ethical suppliers and developing eco-friendly production methods.",
    image: "https://images.unsplash.com/photo-1753370241639-e8596ccbfe0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBtYXRlcmlhbHN8ZW58MXwxfHwxNzU2ODI2MTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: { linkedin: "#", instagram: "#", twitter: "#" },
    expertise: ["Sustainable Materials", "Ethical Sourcing", "Environmental Impact"]
  },
  {
    id: 4, name: "Alex Thompson", role: "Digital Innovation Lead",
    bio: "Alex drives our digital transformation, creating seamless online experiences and leveraging technology to connect with our global community.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsJTIwbWVufGVufDF8fHx8MTc1NjgyNjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: { linkedin: "#", instagram: "#", twitter: "#" },
    expertise: ["Digital Strategy", "E-commerce", "User Experience"]
  }
];

// Enhanced Company values
const values = [
  { icon: Award, title: "Quality Excellence", description: "Every piece is crafted with meticulous attention to detail using premium materials and traditional techniques.", color: "from-yellow-400 to-orange-500" },
  { icon: Leaf, title: "Sustainability", description: "We're committed to sustainable practices, from sourcing organic materials to reducing our environmental impact.", color: "from-green-400 to-emerald-500" },
  { icon: Heart, title: "Authentic Design", description: "Our designs are timeless and authentic, created to last and transcend seasonal trends.", color: "from-pink-400 to-rose-500" },
  { icon: Users, title: "Community", description: "We build lasting relationships with our customers, artisans, and partners based on trust and respect.", color: "from-blue-400 to-indigo-500" },
  { icon: Zap, title: "Innovation", description: "Constantly pushing boundaries with cutting-edge technology and creative design solutions.", color: "from-purple-400 to-violet-500" },
  { icon: Globe, title: "Global Reach", description: "Connecting fashion enthusiasts worldwide through our innovative digital platform.", color: "from-cyan-400 to-blue-500" }
];

// Enhanced Statistics
const stats = [
  { label: "Years of Excellence", value: "15+", icon: Clock, color: "from-yellow-400 to-orange-500" },
  { label: "Satisfied Customers", value: "50K+", icon: Users, color: "from-blue-400 to-indigo-500" },
  { label: "Countries Worldwide", value: "25+", icon: Globe, color: "from-green-400 to-emerald-500" },
  { label: "Artisan Partners", value: "100+", icon: Heart, color: "from-pink-400 to-rose-500" },
  { label: "Products Launched", value: "500+", icon: Sparkles, color: "from-purple-400 to-violet-500" },
  { label: "Awards Won", value: "25+", icon: Award, color: "from-cyan-400 to-blue-500" }
];

// Enhanced Milestones
const milestones = [
  { year: "2009", title: "Brand Founded", description: "Started with a small collection of premium denim in a workshop in San Francisco.", icon: Star, color: "from-yellow-400 to-orange-500" },
  { year: "2012", title: "First Flagship Store", description: "Opened our first flagship store in downtown San Francisco, marking our physical presence in the fashion world.", icon: MapPin, color: "from-blue-400 to-indigo-500" },
  { year: "2015", title: "Sustainable Initiative", description: "Launched our sustainability program and began working with organic cotton suppliers, setting industry standards.", icon: Leaf, color: "from-green-400 to-emerald-500" },
  { year: "2018", title: "Digital Transformation", description: "Launched our e-commerce platform, expanding our reach to customers worldwide and revolutionizing our business model.", icon: Zap, color: "from-purple-400 to-violet-500" },
  { year: "2020", title: "Global Expansion", description: "Expanded to 25+ countries, establishing partnerships with local artisans and bringing our vision to new markets.", icon: Globe, color: "from-cyan-400 to-blue-500" },
  { year: "2023", title: "Innovation Hub", description: "Opened our innovation center, focusing on sustainable materials research and digital fashion experiences.", icon: Sparkles, color: "from-pink-400 to-rose-500" },
  { year: "2024", title: "Future Forward", description: "Leading the industry with AI-powered design tools, virtual try-ons, and sustainable fashion technology.", icon: Eye, color: "from-indigo-400 to-purple-500" }
];

// Enhanced Testimonials
const testimonials = [
  { id: 1, name: "Emma Rodriguez", role: "Fashion Blogger", content: "The quality and attention to detail in every piece is incredible. I've never felt more confident in my style choices.", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjgyNjE2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", rating: 5 },
  { id: 2, name: "David Chen", role: "Tech Entrepreneur", content: "Sustainable fashion that actually looks good? This brand proves you don't have to compromise style for ethics.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsJTIwbWVufGVufDF8fHx8MTc1NjgyNjE2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", rating: 5 },
  { id: 3, name: "Sophia Kim", role: "Sustainability Advocate", content: "Finally, a brand that walks the talk on sustainability. Their commitment to ethical practices is inspiring.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjgyNjE2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", rating: 5 }
];

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
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
    const handleMouseMove = (e) => {
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
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="text-center relative z-10">
        {/* Enhanced Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 40px rgba(255,255,255,0.6)",
                "0 0 20px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-24 h-24 border-4 border-white border-t-transparent rounded-full mx-auto mb-8 relative"
          >
            <motion.div
              className="absolute inset-2 border-2 border-white/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
        
        {/* Enhanced Title Animation */}
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
        >
          About Us
        </motion.h1>
        
        {/* Enhanced Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "300px", opacity: 1 }}
          transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
          className="h-2 bg-gradient-to-r from-white via-gray-300 to-white mx-auto rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Enhanced Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-white/80 mt-6 text-xl font-light tracking-wide"
        >
          Crafting stories, creating futures
        </motion.p>
        
        {/* Loading Dots */}
        <motion.div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

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
        {/* Enhanced Animated Background */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: yBg, scale }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/80" />
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 right-32 w-24 h-24 bg-white/5 rounded-full"
            animate={{ 
              y: [0, 30, 0],
              x: [0, 20, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Background Image */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1704729105381-f579cfcefd63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduJTIwc3R1ZGlvJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NjgyNjE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
            }}
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
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
                  <Sparkles className="w-4 h-4 mr-2" />
                  Our Story
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
                  Crafting
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  Fashion
                </motion.span>
                <motion.span 
                  className="block text-white/80"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  With Purpose
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8 leading-relaxed"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                Since 2009, we've been dedicated to creating exceptional fashion pieces that combine 
                timeless design with sustainable practices and uncompromising quality.
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
                    Our Mission
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
                    Meet Our Team
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
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Continue with the rest of the sections... */}
      {/* For now, let me add a simple continuation */}
      
      {/* Animated Statistics Section */}
      <motion.div 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-black mb-2 relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring" }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                  <motion.div
                    className="absolute -inset-2 bg-black/5 rounded-lg -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <motion.div 
                  className="text-gray-600 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Our Story Section */}
      <motion.div 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-8"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Our Story
              </motion.h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                {[
                  "What started as a small workshop in San Francisco has grown into a global fashion brand committed to excellence, sustainability, and timeless design. Our journey began with a simple belief: fashion should be beautiful, ethical, and built to last.",
                  "Today, we work with skilled artisans around the world, using traditional techniques combined with modern innovation to create pieces that tell a story. Every garment represents our commitment to quality, sustainability, and the communities we work with.",
                  "We believe that true luxury lies not just in premium materials and expert craftsmanship, but in the positive impact we create for our customers, our partners, and our planet."
                ].map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              <motion.div 
                className="mt-8 flex items-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </motion.div>
                <span className="font-medium">Certified B Corporation since 2020</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="aspect-[4/3] rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1750603247133-1fd1b4e4aca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHN0b3JlJTIwaW50ZXJpb3J8ZW58MXwxfHwxNzU2ODI2MTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
                  }}
                />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl"
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="font-bold">Award Winner</div>
                    <div className="text-sm text-gray-600">Sustainable Fashion 2023</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Values Section */}
      <motion.div 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              These core principles guide everything we do, from design and production 
              to customer service and community engagement.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white h-full relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                  
                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center relative"
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                      
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-2xl"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl font-bold mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      {value.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {value.description}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Team Section */}
      <motion.div 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              The passionate individuals behind our brand, each bringing unique expertise 
              and creativity to everything we create.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id} 
                className="group"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('${member.image}')`
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    <p className="text-sm font-medium">
                      {member.role}
                    </p>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.h3 
                    className="text-2xl font-bold mb-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-lg text-gray-600 font-medium mb-4"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    viewport={{ once: true }}
                  >
                    {member.role}
                  </motion.p>
                  
                  <motion.p 
                    className="text-gray-700 leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                    viewport={{ once: true }}
                  >
                    {member.bio}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to global impact, here are the key milestones 
              that have shaped our brand.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300 hidden lg:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="flex-1 lg:px-8">
                    <Card className="group hover:shadow-xl transition-all duration-300 bg-white border-0">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge className="bg-black text-white px-4 py-2 text-lg font-bold">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-2xl font-bold">
                            {milestone.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden lg:block w-6 h-6 bg-black rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="flex-1 lg:px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer (FigmaUI-style) */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Newsletter Section */}
          <div className="py-12 border-b border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
                <p className="text-gray-400">
                  Get the latest updates on new arrivals, exclusive offers, and style tips.
                </p>
              </div>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-900 border border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 w-full"
                />
                <Button className="bg-white text-black hover:bg-gray-200 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">LUXE</h2>
              <p className="text-gray-400 leading-relaxed">
                Crafting exceptional fashion for those who dare to stand out.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Shop</h4>
              <ul className="space-y-3">
                <li><a href="#collections" className="text-gray-400 hover:text-white transition-colors">Collections</a></li>
                <li><a href="#featured" className="text-gray-400 hover:text-white transition-colors">Featured</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="/aboutus" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="py-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} LUXE. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
