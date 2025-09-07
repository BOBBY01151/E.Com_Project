import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import LoadingScreen from "../components/LoadingScreen";
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
  ArrowDown,
  CheckCircle,
  Clock,
  Users,
  Headphones,
  FileText,
  Search,
  Star,
  ArrowRight,
  ShoppingBag
} from "lucide-react";

const Support = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle page loading effect - similar to Home page
  useEffect(() => {
    const minLoadingTime = 2000; // Minimum loading time for smooth UX
    const startTime = Date.now();
    
    const checkLoadingComplete = () => {
      const elapsedTime = Date.now() - startTime;
      
      if (elapsedTime >= minLoadingTime) {
        setIsPageLoading(false);
      } else {
        setTimeout(checkLoadingComplete, 100);
      }
    };
    
    checkLoadingComplete();
  }, []);

  // Auto-rotate hero images every 5 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  // Hero images for Support page
  const heroImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjBzZXJ2aWNlfGVufDF8fHx8MTc1NzAwODYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: '24/7 Customer Support',
      subtitle: 'Expert help whenever you need it'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwJTIwZGVzayUyMGN1c3RvbWVyJTIwc2VydmljZXxlbnwxfHx8fDE3NTcwMDg2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Live Chat Support',
      subtitle: 'Instant assistance from our team'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjBzZXJ2aWNlfGVufDF8fHx8MTc1NzAwODYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Premium Service',
      subtitle: 'Dedicated support for your needs'
    }
  ];

  // FAQ data
  const faqData = [
    {
      category: "General",
      questions: [
        { q: "How do I track my order?", a: "You can track your order by logging into your account and visiting the 'Orders' section, or by using the tracking number sent to your email." },
        { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers." },
        { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location." },
        { q: "How can I change my account information?", a: "You can update your account information by logging into your account and visiting the 'Profile' section." }
      ]
    },
    {
      category: "Orders & Shipping",
      questions: [
        { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days, express shipping takes 1-2 business days, and international shipping takes 7-14 business days." },
        { q: "Can I cancel my order?", a: "You can cancel your order within 24 hours of placing it. After that, you'll need to return the items once received." },
        { q: "What if my order is damaged?", a: "If your order arrives damaged, please contact us immediately with photos. We'll arrange for a replacement or full refund." },
        { q: "Do you offer free shipping?", a: "Yes, we offer free standard shipping on orders over $75 within the continental US." }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        { q: "What is your return policy?", a: "We offer a 30-day return policy for all items in original condition with tags attached." },
        { q: "How do I return an item?", a: "You can initiate a return through your account dashboard or contact our customer service team for assistance." },
        { q: "Are return shipping costs covered?", a: "We provide free return shipping labels for all returns within the US. International returns may incur shipping costs." },
        { q: "How long do refunds take?", a: "Refunds are processed within 3-5 business days after we receive your returned items." }
      ]
    }
  ];

  // Contact methods
  const contactMethods = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      action: "Start Chat",
      color: "from-black to-gray-800"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
      color: "from-gray-800 to-black"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "from-black to-gray-700"
    }
  ];

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {isPageLoading && (
          <LoadingScreen 
            title="SUPPORT" 
            subtitle="We're here to help you..." 
          />
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPageLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={isPageLoading ? "pointer-events-none" : ""}
      >
        {/* Clear Hero Section - Support Landing */}
        <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-800 to-black text-white overflow-hidden -mt-16 pt-16">
          {/* Background Image Slider with Enhanced Parallax */}
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={image.id}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: index === currentImageIndex ? 1 : 0,
                  transform: `translateY(${scrollY * 0.5}px) scale(${1 + Math.min(scrollY / 1000, 0.2)})`
                }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            ))}
          </div>

          {/* Hero Content - Clear and Focused */}
          <div className="relative z-10 min-h-screen flex items-center pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content - Clear Hero Message */}
                <div 
                  className="space-y-8 text-white"
                  style={{ transform: `translateX(${Math.min(scrollY, 100) * -0.5}px)` }}
                >
                  <div className="space-y-6">
                    {/* Support Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                      <Star className="w-4 h-4 fill-white" />
                      <span className="text-sm font-medium">24/7 Customer Support</span>
                    </div>
                    
                    {/* Main Hero Title */}
                    <div className="space-y-4">
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                        Support
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                          Center
                        </span>
                      </h1>
                      <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-light">
                        Get help with your orders, find answers to common questions, and connect with our expert support team. 
                        We're here to make your shopping experience perfect.
                      </p>
                    </div>
                  </div>
                  
                  {/* Call-to-Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-white/20 transition-all duration-300"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Start Live Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                    >
                      Browse FAQ
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Support Stats - Clear Metrics */}
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">24/7</div>
                      <div className="text-sm text-white/70">Live Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">&lt;2h</div>
                      <div className="text-sm text-white/70">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">4.9★</div>
                      <div className="text-sm text-white/70">Rating</div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Featured Support Showcase */}
                <div 
                  className="relative"
                  style={{ transform: `translateX(${Math.min(scrollY, 100) * 0.5}px)` }}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white border border-white/20 shadow-2xl">
                    <div className="space-y-6">
                      {/* Featured Support Info */}
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full mb-4">
                          <Star className="w-4 h-4 fill-white text-white" />
                          <span className="text-sm font-medium">Featured</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-2">
                          {heroImages[currentImageIndex]?.title}
                        </h3>
                        <p className="text-xl text-white/90 leading-relaxed">
                          {heroImages[currentImageIndex]?.subtitle}
                        </p>
                      </div>
                      
                      {/* Image Navigation */}
                      <div className="flex items-center justify-center gap-4">
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
                        <span className="text-sm text-white/70 font-medium">
                          {currentImageIndex + 1} / {heroImages.length}
                        </span>
                      </div>
                      
                      {/* Benefits Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/15 rounded-xl p-4 text-center border border-white/20">
                          <div className="text-2xl font-bold text-white">Free</div>
                          <div className="text-sm text-white/80">Support</div>
                        </div>
                        <div className="bg-white/15 rounded-xl p-4 text-center border border-white/20">
                          <div className="text-2xl font-bold text-white">Expert</div>
                          <div className="text-sm text-white/80">Team</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div 
            className="absolute top-20 right-20 bg-gradient-to-r from-white to-gray-300 rounded-full p-6 shadow-2xl hidden lg:block border-4 border-white"
            style={{ transform: `translateY(${Math.min(scrollY, 200) * -0.4}px) rotate(${Math.min(scrollY, 200) * 0.9}deg)` }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-black">24/7</div>
              <div className="text-xs text-black font-semibold">SUPPORT</div>
            </div>
          </div>
          <div 
            className="absolute bottom-32 left-20 bg-black border-2 border-white text-white rounded-full p-6 shadow-2xl hidden lg:block"
            style={{ transform: `translateY(${Math.min(scrollY, 200) * 0.3}px) scale(${1 - Math.min(scrollY, 200) / 700})` }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Help</div>
              <div className="text-xs font-semibold">Center</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div 
              className="flex flex-col items-center gap-3 text-white transition-opacity duration-300"
              style={{ opacity: 1 - Math.min(scrollY / 300, 1) }}
            >
              <span className="text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Scroll to explore Support</span>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Main Support Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 mb-6">
              <Star className="w-4 h-4 fill-black text-black" />
              <span className="text-sm font-medium text-black">Support Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              How Can We
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-black">
                Help You?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the best way to get in touch with our expert support team. 
              We're here to help you with any questions or concerns.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-black">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center text-white`}>
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <Badge variant="outline" className="mb-4 border-black text-black">{method.availability}</Badge>
                  <Button className={`w-full bg-gradient-to-r ${method.color} hover:opacity-90 text-white`}>
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 h-16">
                <TabsTrigger value="general" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                  <HelpCircle className="w-5 h-5" />
                  General
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                  <FileText className="w-5 h-5" />
                  Orders & Shipping
                </TabsTrigger>
                <TabsTrigger value="returns" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                  <CheckCircle className="w-5 h-5" />
                  Returns & Exchanges
                </TabsTrigger>
              </TabsList>

              {faqData.map((category, categoryIndex) => (
                <TabsContent key={category.category.toLowerCase()} value={category.category.toLowerCase()} className="space-y-6">
                  <div className="space-y-6">
                    {category.questions.map((faq, index) => (
                      <Card key={index} className="border-2 border-gray-200 hover:shadow-lg transition-shadow duration-300 hover:border-black">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-black flex items-center gap-2">
                              <Search className="w-5 h-5 text-black" />
                              {faq.q}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Additional Information */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <Card className="bg-black text-white border-0 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-6" />
                <h3 className="mb-4">Expert Team</h3>
                <p className="text-gray-300">
                  Our support team consists of fashion experts ready to help with any questions
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:scale-105 transition-transform duration-300 hover:border-black">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="mb-4 text-black">Quick Response</h3>
                <p className="text-gray-600">
                  Average response time of under 2 hours for all support requests
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:scale-105 transition-transform duration-300 hover:border-black">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="mb-4 text-black">5-Star Service</h3>
                <p className="text-gray-600">
                  Rated 4.9/5 stars by our customers for exceptional support quality
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Support;
