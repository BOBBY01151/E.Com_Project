import { useState, useEffect } from "react";
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
  Star
} from "lucide-react";

const Support = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading effect simulation
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setContentLoaded(true);
    }, 2000); // 2 second loading

    return () => clearTimeout(loadingTimer);
  }, []);

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
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen 
            title="SUPPORT" 
            subtitle="We're here to help you..." 
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        className="min-h-screen bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
      {/* Enhanced Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        {/* Background Images with Parallax */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 parallax-element opacity-20"
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`,
              backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjBzZXJ2aWNlfGVufDF8fHx8MTc1NzAwODYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div 
            className="absolute inset-0 parallax-element opacity-15"
            style={{ 
              transform: `translateY(${scrollY * 0.3}px)`,
              backgroundImage: `url('https://images.unsplash.com/photo-1556742111-a301076d9d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwJTIwZGVzayUyMGN1c3RvbWVyJTIwc2VydmljZXxlbnwxfHx8fDE3NTcwMDg2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-indigo-900/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-blue-900" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <HelpCircle className="w-32 h-32" />
          </motion.div>
        </div>

        <div className="absolute top-40 right-20 opacity-15">
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -3, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <MessageCircle className="w-24 h-24" />
          </motion.div>
        </div>

        <div className="absolute bottom-20 left-20 opacity-10">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          >
            <Headphones className="w-28 h-28" />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative flex items-center justify-center min-h-screen px-4 z-10">
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-4 mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <HelpCircle className="w-12 h-12" />
                <div className="text-left">
                  <p className="text-sm text-blue-200 uppercase tracking-wide">24/7 Customer Support</p>
                  <h1 className="text-5xl md:text-7xl font-bold">Support Center</h1>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Get help with your orders, find answers to common questions, and connect with our expert support team. 
              We're here to make your shopping experience perfect.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6 justify-center mb-16"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <MessageCircle className="w-5 h-5" />
                <span>Live Chat</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Phone className="w-5 h-5" />
                <span>Phone Support</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Mail className="w-5 h-5" />
                <span>Email Help</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center text-white/60"
              >
                <span className="text-sm mb-2">Scroll to explore</span>
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content with Parallax Effects */}
      <div className="relative bg-white dark:bg-gray-900">
        {/* Parallax Background Elements */}
        <div 
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent parallax-element"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-gray-900 dark:text-white">How Can We Help You?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the best way to get in touch with our support team
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center text-white`}>
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{method.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{method.description}</p>
                  <Badge variant="outline" className="mb-4">{method.availability}</Badge>
                  <Button className={`w-full bg-gradient-to-r ${method.color} hover:opacity-90 text-white`}>
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 dark:bg-gray-800 h-16">
                <TabsTrigger value="general" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full text-base">
                  <HelpCircle className="w-5 h-5" />
                  General
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full text-base">
                  <FileText className="w-5 h-5" />
                  Orders & Shipping
                </TabsTrigger>
                <TabsTrigger value="returns" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white h-full text-base">
                  <CheckCircle className="w-5 h-5" />
                  Returns & Exchanges
                </TabsTrigger>
              </TabsList>

              {faqData.map((category, categoryIndex) => (
                <TabsContent key={category.category.toLowerCase()} value={category.category.toLowerCase()} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    {category.questions.map((faq, index) => (
                      <Card key={index} className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="space-y-4"
                          >
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                              <Search className="w-5 h-5 text-blue-600" />
                              {faq.q}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Additional Information with Parallax */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-20 grid md:grid-cols-3 gap-8"
          >
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-6" />
                <h3 className="mb-4">Expert Team</h3>
                <p className="text-blue-100">
                  Our support team consists of fashion experts ready to help with any questions
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="mb-4 text-gray-900 dark:text-white">Quick Response</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Average response time of under 2 hours for all support requests
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="mb-4 text-gray-900 dark:text-white">5-Star Service</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Rated 4.9/5 stars by our customers for exceptional support quality
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      </motion.div>
    </>
  );
};

export default Support;
