import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import LoadingScreen from "../components/LoadingScreen";
import { 
  Cookie, 
  Settings, 
  Shield, 
  Eye, 
  Database,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Calendar,
  Mail,
  Globe,
  Smartphone,
  Monitor,
  ArrowRight,
  Info
} from "lucide-react";

const Cookies = () => {
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

  // Cookie types data
  const cookieTypes = [
    {
      type: "Essential Cookies",
      description: "Necessary for website functionality",
      icon: <Shield className="w-6 h-6" />,
      required: true,
      examples: [
        "Authentication and login status",
        "Shopping cart contents",
        "Security and fraud prevention",
        "Language and region preferences"
      ]
    },
    {
      type: "Analytics Cookies",
      description: "Help us understand website usage",
      icon: <Eye className="w-6 h-6" />,
      required: false,
      examples: [
        "Page views and user interactions",
        "Traffic sources and referrals",
        "Popular products and features",
        "Performance and error tracking"
      ]
    },
    {
      type: "Marketing Cookies",
      description: "Used for advertising and personalization",
      icon: <Globe className="w-6 h-6" />,
      required: false,
      examples: [
        "Personalized product recommendations",
        "Targeted advertisements",
        "Social media integration",
        "Email marketing campaigns"
      ]
    },
    {
      type: "Preference Cookies",
      description: "Remember your settings and choices",
      icon: <Settings className="w-6 h-6" />,
      required: false,
      examples: [
        "Theme and display preferences",
        "Currency and payment methods",
        "Notification settings",
        "Accessibility options"
      ]
    }
  ];

  // Cookie management options
  const cookieManagement = [
    {
      title: "Browser Settings",
      description: "Control cookies through your browser preferences",
      icon: <Monitor className="w-8 h-8" />,
      steps: [
        "Open your browser settings",
        "Navigate to Privacy & Security",
        "Find Cookie settings",
        "Choose your preferred options"
      ]
    },
    {
      title: "Mobile Settings",
      description: "Manage cookies on mobile devices",
      icon: <Smartphone className="w-8 h-8" />,
      steps: [
        "Access device settings",
        "Go to Privacy settings",
        "Find Website data options",
        "Configure cookie preferences"
      ]
    },
    {
      title: "Cookie Banner",
      description: "Use our cookie consent banner",
      icon: <Cookie className="w-8 h-8" />,
      steps: [
        "Click the cookie banner",
        "Review cookie categories",
        "Toggle preferences on/off",
        "Save your choices"
      ]
    }
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen 
            title="COOKIE POLICY" 
            subtitle="Understanding our cookie usage..." 
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
                backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwcHJpdmFjeSUyMHNlY3VyaXR5fGVufDF8fHx8MTc1NzAwODYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            <div 
              className="absolute inset-0 parallax-element opacity-15"
              style={{ 
                transform: `translateY(${scrollY * 0.3}px)`,
                backgroundImage: `url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raWVzJTIwZGF0YSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTcwMDg2MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
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
              <Cookie className="w-32 h-32" />
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
              <Settings className="w-24 h-24" />
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
              <Shield className="w-28 h-28" />
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
                  <Cookie className="w-12 h-12" />
                  <div className="text-left">
                    <p className="text-sm text-gray-300 uppercase tracking-wide">Data & Privacy</p>
                    <h1 className="text-5xl md:text-7xl font-bold">Cookie Policy</h1>
                  </div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                Learn about how we use cookies to enhance your browsing experience, 
                improve our services, and provide personalized content.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-6 justify-center mb-16"
              >
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <Shield className="w-5 h-5" />
                  <span>Secure & Transparent</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <Settings className="w-5 h-5" />
                  <span>Your Control</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <Eye className="w-5 h-5" />
                  <span>Privacy First</span>
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
                  <ArrowRight className="w-5 h-5 rotate-90" />
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
              <h2 className="text-4xl md:text-5xl mb-4 font-bold text-gray-900 dark:text-white">Understanding Cookies</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive information about our cookie usage and your privacy options
              </p>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-12"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-900 dark:text-white" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Last Updated</h3>
                  <p className="text-gray-600 dark:text-gray-300">December 2024</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-12 bg-gray-100 dark:bg-gray-800 h-16">
                  <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                    <Info className="w-5 h-5" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="types" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                    <Database className="w-5 h-5" />
                    Cookie Types
                  </TabsTrigger>
                  <TabsTrigger value="management" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                    <Settings className="w-5 h-5" />
                    Management
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                    <Mail className="w-5 h-5" />
                    Contact
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-8">
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
                          <Cookie className="w-6 h-6" />
                          What Are Cookies?
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Cookies are small text files that are stored on your device when you visit our website. 
                            They help us provide you with a better browsing experience by remembering your preferences 
                            and understanding how you interact with our site.
                          </p>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">Key Benefits:</h4>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Remember your login status
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Keep items in your shopping cart
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Personalize your experience
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                Improve website performance
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                        <CardTitle className="text-gray-900 dark:text-white">Our Commitment</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Shield className="w-6 h-6 text-green-500 mt-1" />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Privacy Protection</h4>
                              <p className="text-gray-600 dark:text-gray-300">We never sell your personal data to third parties</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Settings className="w-6 h-6 text-blue-500 mt-1" />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Your Control</h4>
                              <p className="text-gray-600 dark:text-gray-300">You can manage cookie preferences at any time</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Eye className="w-6 h-6 text-purple-500 mt-1" />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Transparency</h4>
                              <p className="text-gray-600 dark:text-gray-300">Clear information about what data we collect</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Cookie Types Tab */}
                <TabsContent value="types" className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-2 gap-8"
                  >
                    {cookieTypes.map((cookie, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 h-full">
                          <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                            <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                              <div className="flex items-center gap-2">
                                {cookie.icon}
                                {cookie.type}
                              </div>
                              <Badge variant={cookie.required ? "default" : "outline"}>
                                {cookie.required ? "Required" : "Optional"}
                              </Badge>
                            </CardTitle>
                            <p className="text-gray-600 dark:text-gray-300">{cookie.description}</p>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900 dark:text-white">Examples:</h4>
                              <ul className="space-y-2">
                                {cookie.examples.map((example, exampleIndex) => (
                                  <li key={exampleIndex} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>{example}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                {/* Management Tab */}
                <TabsContent value="management" className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-3 gap-8"
                  >
                    {cookieManagement.map((method, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 h-full">
                          <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 text-center">
                            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                              {method.icon}
                            </div>
                            <CardTitle className="text-gray-900 dark:text-white">{method.title}</CardTitle>
                            <p className="text-gray-600 dark:text-gray-300">{method.description}</p>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900 dark:text-white">Steps:</h4>
                              <ul className="space-y-3">
                                {method.steps.map((step, stepIndex) => (
                                  <li key={stepIndex} className="flex items-start gap-3">
                                    <Badge variant="outline" className="min-w-[24px] h-6 rounded-full flex items-center justify-center">
                                      {stepIndex + 1}
                                    </Badge>
                                    <span className="text-gray-600 dark:text-gray-300">{step}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12"
                  >
                    <Card className="border-2 border-gray-100 dark:border-gray-700">
                      <CardContent className="p-8">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Cookie Settings
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            You can manage your cookie preferences using our cookie banner or through your browser settings. 
                            Note that disabling certain cookies may affect website functionality.
                          </p>
                          <Button className="bg-black text-white hover:bg-gray-800">
                            Manage Cookie Preferences
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                {/* Contact Tab */}
                <TabsContent value="contact" className="space-y-8">
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
                          <Mail className="w-6 h-6" />
                          Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white">Questions About Cookies?</h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              If you have any questions about our cookie policy or need help managing your preferences, 
                              please don't hesitate to contact us.
                            </p>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <Mail className="w-5 h-5 text-gray-900 dark:text-white" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Email</p>
                                <p className="text-gray-600 dark:text-gray-300">privacy@luxe.com</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <FileText className="w-5 h-5 text-gray-900 dark:text-white" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">Support</p>
                                <p className="text-gray-600 dark:text-gray-300">24/7 Customer Support</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                        <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <Link
                            to="/privacy"
                            className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <Shield className="w-5 h-5 text-gray-900 dark:text-white" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Privacy Policy</p>
                              <p className="text-gray-600 dark:text-gray-300">Learn about our data practices</p>
                            </div>
                          </Link>
                          <Link
                            to="/contactus"
                            className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <Mail className="w-5 h-5 text-gray-900 dark:text-white" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Contact Support</p>
                              <p className="text-gray-600 dark:text-gray-300">Get help with your account</p>
                            </div>
                          </Link>
                          <div className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <Settings className="w-5 h-5 text-gray-900 dark:text-white" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Cookie Settings</p>
                              <p className="text-gray-600 dark:text-gray-300">Manage your preferences</p>
                            </div>
                          </div>
                        </div>
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
                  <h3 className="mb-4">Secure & Private</h3>
                  <p className="text-gray-300">
                    Your data is protected with industry-standard security measures
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h3 className="mb-4 text-gray-900 dark:text-white">Your Control</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Manage your cookie preferences anytime through our settings
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="mb-4 text-gray-900 dark:text-white">Transparent</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Clear information about what data we collect and why
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

export default Cookies;
