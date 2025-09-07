import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import LoadingScreen from "../components/LoadingScreen";
import { 
  RotateCcw, 
  RefreshCw, 
  DollarSign, 
  ArrowDown,
  CheckCircle,
  Clock,
  Package,
  Truck,
  CreditCard,
  Shield,
  HelpCircle,
  FileText,
  Calendar,
  AlertCircle,
  ArrowRight
} from "lucide-react";

const ReturnsExchange = () => {
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

  // Return policy data
  const returnPolicy = {
    timeframe: "30 days",
    condition: "Original condition with tags",
    process: [
      "Log into your account and go to 'Orders'",
      "Select the item you want to return",
      "Choose return reason and print label",
      "Package item securely with original packaging",
      "Drop off at designated location or schedule pickup"
    ]
  };

  // Exchange process data
  const exchangeProcess = [
    {
      step: 1,
      title: "Initiate Exchange",
      description: "Contact customer service or use online portal",
      icon: <RefreshCw className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Size Selection",
      description: "Choose your preferred size or alternative item",
      icon: <Package className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Return Original",
      description: "Send back original item with prepaid label",
      icon: <Truck className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Receive New Item",
      description: "Get your exchange item delivered quickly",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  // Refund information
  const refundInfo = {
    processingTime: "3-5 business days",
    methods: [
      { method: "Credit Card", time: "3-5 business days", icon: <CreditCard className="w-5 h-5" /> },
      { method: "PayPal", time: "1-3 business days", icon: <DollarSign className="w-5 h-5" /> },
      { method: "Bank Transfer", time: "5-7 business days", icon: <FileText className="w-5 h-5" /> }
    ]
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen 
            title="RETURNS & EXCHANGE" 
            subtitle="Hassle-free returns and exchanges..." 
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
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white -mt-16 pt-16">
        {/* Background Images with Parallax */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 parallax-element opacity-20"
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`,
              backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXR1cm4lMjBwYWNrYWdlJTIwZGVsaXZlcnl8ZW58MXx8fHwxNzU3MDA4NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div 
            className="absolute inset-0 parallax-element opacity-15"
            style={{ 
              transform: `translateY(${scrollY * 0.3}px)`,
              backgroundImage: `url('https://images.unsplash.com/photo-1556742111-a301076d9d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBzdXBwb3J0fGVufDF8fHx8MTc1NzAwODYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

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
            <RotateCcw className="w-32 h-32" />
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
            <RefreshCw className="w-24 h-24" />
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
            <DollarSign className="w-28 h-28" />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative flex items-center justify-center min-h-screen px-4 z-10 pt-16">
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-4 mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <RotateCcw className="w-12 h-12" />
                <div className="text-left">
                  <p className="text-sm text-gray-300 uppercase tracking-wide">Hassle-Free Returns</p>
                  <h1 className="text-5xl md:text-7xl font-bold">Returns & Exchange</h1>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Easy returns, quick exchanges, and fast refunds. We make it simple to get exactly what you want, 
              when you want it. Your satisfaction is our priority.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6 justify-center mb-16"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <RotateCcw className="w-5 h-5" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <RefreshCw className="w-5 h-5" />
                <span>Free Exchanges</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <DollarSign className="w-5 h-5" />
                <span>Quick Refunds</span>
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
          className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/5 to-transparent parallax-element"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-gray-900 dark:text-white">Easy Returns & Exchanges</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple processes for returns, exchanges, and refunds with full customer support
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Tabs defaultValue="returns" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 dark:bg-gray-800 h-16">
              <TabsTrigger value="returns" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                <RotateCcw className="w-5 h-5" />
                Returns
              </TabsTrigger>
              <TabsTrigger value="exchanges" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                <RefreshCw className="w-5 h-5" />
                Exchanges
              </TabsTrigger>
              <TabsTrigger value="refunds" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                <DollarSign className="w-5 h-5" />
                Refunds
              </TabsTrigger>
            </TabsList>

            {/* Returns Tab */}
            <TabsContent value="returns" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <RotateCcw className="w-6 h-6" />
                      Return Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{returnPolicy.timeframe}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Return Window</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">Free</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Return Shipping</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Return Conditions:</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {returnPolicy.condition}
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Original packaging included
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            No signs of wear or damage
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">How to Return an Item</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      {returnPolicy.process.map((step, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <Badge variant="outline" className="min-w-[32px] h-8 rounded-full flex items-center justify-center">
                            {index + 1}
                          </Badge>
                          <p className="text-gray-700 dark:text-gray-300">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl"
                    >
                      <h4 className="mb-3 text-gray-900 dark:text-white">Important Notes</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• Returns must be initiated within 30 days of delivery</li>
                        <li>• Items must be in original condition with all tags</li>
                        <li>• Free return shipping label provided</li>
                        <li>• Refunds processed within 3-5 business days</li>
                      </ul>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Exchanges Tab */}
            <TabsContent value="exchanges" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <RefreshCw className="w-6 h-6" />
                      Exchange Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {exchangeProcess.map((step, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                            {step.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{step.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">Exchange Options</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      {[
                        { type: "Size Exchange", desc: "Exchange for different size of same item", time: "2-3 days" },
                        { type: "Color Exchange", desc: "Exchange for different color variant", time: "2-3 days" },
                        { type: "Style Exchange", desc: "Exchange for different style/item", time: "3-5 days" },
                        { type: "Store Credit", desc: "Get store credit for future purchases", time: "1-2 days" }
                      ].map((option, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{option.type}</p>
                            <p className="text-gray-600 dark:text-gray-300">{option.desc}</p>
                          </div>
                          <Badge variant="outline" className="text-gray-600 dark:text-gray-300">
                            {option.time}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl"
                    >
                      <h4 className="mb-4 text-gray-900 dark:text-white">Exchange Benefits</h4>
                      <div className="space-y-3">
                        {[
                          { benefit: "Free Shipping", desc: "Both ways covered" },
                          { benefit: "Priority Processing", desc: "Faster than returns" },
                          { benefit: "Size Guarantee", desc: "Perfect fit or free return" },
                          { benefit: "No Restocking Fee", desc: "Full value exchange" }
                        ].map((benefit, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="font-medium text-gray-900 dark:text-white">{benefit.benefit}:</span>
                            <span className="text-gray-600 dark:text-gray-300">{benefit.desc}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Refunds Tab */}
            <TabsContent value="refunds" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 gap-8"
              >
                <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <DollarSign className="w-6 h-6" />
                      Refund Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {refundInfo.processingTime}
                          </div>
                          <div className="text-gray-600 dark:text-gray-300">Average Processing Time</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">Refund Methods:</h4>
                        {refundInfo.methods.map((method, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {method.icon}
                              <span className="font-medium text-gray-900 dark:text-white">{method.method}</span>
                            </div>
                            <Badge variant="outline" className="text-gray-600 dark:text-gray-300">
                              {method.time}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">Refund Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      {[
                        { step: "Return Received", time: "Same day", status: "completed" },
                        { step: "Quality Check", time: "1-2 days", status: "completed" },
                        { step: "Refund Processed", time: "3-5 days", status: "pending" },
                        { step: "Funds Available", time: "1-3 days", status: "pending" }
                      ].map((timeline, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            timeline.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {timeline.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <Clock className="w-5 h-5 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">{timeline.step}</p>
                            <p className="text-gray-600 dark:text-gray-300">{timeline.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl"
                    >
                      <h4 className="mb-4 text-gray-900 dark:text-white">Refund Guarantee</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• 100% money-back guarantee</li>
                        <li>• No questions asked policy</li>
                        <li>• Full refund including shipping</li>
                        <li>• Instant processing for eligible items</li>
                      </ul>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
          </motion.div>

          {/* Additional Information with Parallax */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-20 grid md:grid-cols-3 gap-8"
          >
            <Card className="bg-gradient-to-br from-black to-gray-800 text-white border-0 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 mx-auto mb-6" />
                <h3 className="mb-4">Secure Process</h3>
                <p className="text-gray-300">
                  All returns and exchanges are processed securely with full protection
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="mb-4 text-gray-900 dark:text-white">30-Day Window</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Generous return window gives you time to decide
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="mb-4 text-gray-900 dark:text-white">Need Help?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Contact our support team for assistance with returns
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

export default ReturnsExchange;
