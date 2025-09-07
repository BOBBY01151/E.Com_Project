import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import LoadingScreen from "../components/LoadingScreen";
import { 
  Briefcase, 
  Users, 
  Heart, 
  ArrowDown,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign,
  GraduationCap,
  Coffee,
  Laptop,
  Shield,
  Star,
  TrendingUp,
  Globe,
  Award,
  Zap,
  Target,
  Lightbulb,
  Users2
} from "lucide-react";

const Careers = () => {
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

  // Job positions data
  const jobPositions = [
    {
      id: 1,
      title: "Fashion Designer",
      department: "Design",
      location: "Remote / New York",
      type: "Full-time",
      experience: "3-5 years",
      description: "Create innovative t-shirt designs and develop our brand aesthetic for future expansion into trousers and shoes.",
      requirements: [
        "Bachelor's degree in Fashion Design or related field",
        "3+ years experience in apparel design",
        "Proficiency in Adobe Creative Suite",
        "Strong understanding of fashion trends",
        "Experience with sustainable fashion practices"
      ],
      benefits: ["Competitive salary", "Health insurance", "Flexible hours", "Design budget"]
    },
    {
      id: 2,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote / Los Angeles",
      type: "Full-time",
      experience: "4-6 years",
      description: "Lead marketing campaigns for our t-shirt brand and develop strategies for future product launches.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "4+ years digital marketing experience",
        "Experience with social media marketing",
        "Knowledge of fashion industry trends",
        "Strong analytical skills"
      ],
      benefits: ["Competitive salary", "Performance bonuses", "Health insurance", "Remote work"]
    },
    {
      id: 3,
      title: "E-commerce Specialist",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      description: "Manage our online store, optimize user experience, and prepare for scaling to multiple product categories.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "2+ years e-commerce experience",
        "Proficiency in React, Node.js",
        "Experience with Shopify/WooCommerce",
        "Understanding of SEO and analytics"
      ],
      benefits: ["Competitive salary", "Stock options", "Health insurance", "Learning budget"]
    },
    {
      id: 4,
      title: "Customer Experience Manager",
      department: "Customer Service",
      location: "Remote / Chicago",
      type: "Full-time",
      experience: "3-5 years",
      description: "Ensure exceptional customer experience for our t-shirt customers and build processes for future growth.",
      requirements: [
        "Bachelor's degree in Business or related field",
        "3+ years customer service experience",
        "Experience with CRM systems",
        "Strong communication skills",
        "Passion for fashion and customer satisfaction"
      ],
      benefits: ["Competitive salary", "Health insurance", "Flexible schedule", "Team events"]
    },
    {
      id: 5,
      title: "Supply Chain Coordinator",
      department: "Operations",
      location: "Remote / Miami",
      type: "Full-time",
      experience: "2-4 years",
      description: "Manage t-shirt production and logistics, preparing for expansion into trousers and shoes manufacturing.",
      requirements: [
        "Bachelor's degree in Supply Chain or related field",
        "2+ years supply chain experience",
        "Experience with apparel manufacturing",
        "Knowledge of sustainable sourcing",
        "Strong organizational skills"
      ],
      benefits: ["Competitive salary", "Health insurance", "Travel opportunities", "Growth potential"]
    },
    {
      id: 6,
      title: "Brand Ambassador",
      department: "Marketing",
      location: "Remote / Austin",
      type: "Part-time",
      experience: "1-2 years",
      description: "Represent our t-shirt brand on social media and at events, building community for future product launches.",
      requirements: [
        "High school diploma or equivalent",
        "1+ years social media experience",
        "Strong personal brand on social platforms",
        "Passion for fashion and streetwear",
        "Excellent communication skills"
      ],
      benefits: ["Flexible hours", "Product discounts", "Event opportunities", "Commission based"]
    }
  ];

  // Company benefits
  const companyBenefits = [
    {
      category: "Health & Wellness",
      benefits: [
        { name: "Comprehensive Health Insurance", icon: <Shield className="w-5 h-5" /> },
        { name: "Mental Health Support", icon: <Heart className="w-5 h-5" /> },
        { name: "Gym Membership Reimbursement", icon: <Zap className="w-5 h-5" /> },
        { name: "Wellness Programs", icon: <Star className="w-5 h-5" /> }
      ]
    },
    {
      category: "Work-Life Balance",
      benefits: [
        { name: "Flexible Working Hours", icon: <Clock className="w-5 h-5" /> },
        { name: "Remote Work Options", icon: <Laptop className="w-5 h-5" /> },
        { name: "Unlimited PTO", icon: <Coffee className="w-5 h-5" /> },
        { name: "Summer Fridays", icon: <Coffee className="w-5 h-5" /> }
      ]
    },
    {
      category: "Professional Development",
      benefits: [
        { name: "Learning & Development Budget", icon: <GraduationCap className="w-5 h-5" /> },
        { name: "Conference Attendance", icon: <Globe className="w-5 h-5" /> },
        { name: "Mentorship Programs", icon: <Users className="w-5 h-5" /> },
        { name: "Career Growth Opportunities", icon: <TrendingUp className="w-5 h-5" /> }
      ]
    },
    {
      category: "Company Culture",
      benefits: [
        { name: "Team Building Events", icon: <Users2 className="w-5 h-5" /> },
        { name: "Company Retreats", icon: <MapPin className="w-5 h-5" /> },
        { name: "Innovation Time", icon: <Lightbulb className="w-5 h-5" /> },
        { name: "Recognition Programs", icon: <Award className="w-5 h-5" /> }
      ]
    }
  ];

  // Company values
  const companyValues = [
    {
      title: "Innovation",
      description: "We're constantly pushing boundaries in fashion design and technology to create unique experiences.",
      icon: <Lightbulb className="w-8 h-8" />
    },
    {
      title: "Sustainability",
      description: "Committed to eco-friendly practices and sustainable fashion for a better future.",
      icon: <Heart className="w-8 h-8" />
    },
    {
      title: "Quality",
      description: "Every t-shirt we create meets the highest standards of craftsmanship and design.",
      icon: <Star className="w-8 h-8" />
    },
    {
      title: "Community",
      description: "Building a global community of fashion enthusiasts who share our passion for style.",
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Growth",
      description: "Expanding from t-shirts to a complete fashion brand with trousers and shoes.",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      title: "Excellence",
      description: "Striving for excellence in everything we do, from design to customer service.",
      icon: <Target className="w-8 h-8" />
    }
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen 
            title="CAREERS" 
            subtitle="Join our fashion revolution..." 
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
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        {/* Background Images with Parallax */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 parallax-element opacity-20"
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`,
              backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzU3MDA4NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div 
            className="absolute inset-0 parallax-element opacity-15"
            style={{ 
              transform: `translateY(${scrollY * 0.3}px)`,
              backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHRlYW0lMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc1NzAwODYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
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
            <Briefcase className="w-32 h-32" />
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
            <Users className="w-24 h-24" />
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
            <TrendingUp className="w-28 h-28" />
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
                <Briefcase className="w-12 h-12" />
                <div className="text-left">
                  <p className="text-sm text-gray-300 uppercase tracking-wide">Join Our Team</p>
                  <h1 className="text-5xl md:text-7xl font-bold">Careers</h1>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Be part of the fashion revolution! Join our growing team as we build the next generation 
              of streetwear, starting with premium t-shirts and expanding to complete fashion collections.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6 justify-center mb-16"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Briefcase className="w-5 h-5" />
                <span>6 Open Positions</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Users className="w-5 h-5" />
                <span>Remote Friendly</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <TrendingUp className="w-5 h-5" />
                <span>Growth Opportunities</span>
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
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-gray-900 dark:text-white">Build the Future of Fashion</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our mission to create premium t-shirts and expand into a complete fashion brand
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: contentLoaded ? 1 : 0, y: contentLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Tabs defaultValue="positions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 dark:bg-gray-800 h-16">
              <TabsTrigger value="positions" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                <Briefcase className="w-5 h-5" />
                Open Positions
              </TabsTrigger>
              <TabsTrigger value="benefits" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                <Star className="w-5 h-5" />
                Benefits
              </TabsTrigger>
              <TabsTrigger value="culture" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                <Heart className="w-5 h-5" />
                Culture
              </TabsTrigger>
            </TabsList>

            {/* Open Positions Tab */}
            <TabsContent value="positions" className="space-y-8">
              <div className="grid gap-6">
                {jobPositions.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:border-black">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <CardTitle className="text-xl text-gray-900 dark:text-white">{job.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-gray-600 dark:text-gray-300">
                                {job.department}
                              </Badge>
                              <Badge variant="outline" className="text-gray-600 dark:text-gray-300">
                                {job.type}
                              </Badge>
                              <Badge variant="outline" className="text-gray-600 dark:text-gray-300">
                                {job.experience}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{job.location}</span>
                            </div>
                            <Button className="bg-black text-white hover:bg-gray-800">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {job.description}
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements:</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, reqIndex) => (
                                  <li key={reqIndex} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits:</h4>
                              <ul className="space-y-2">
                                {job.benefits.map((benefit, benefitIndex) => (
                                  <li key={benefitIndex} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                    <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {companyBenefits.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                        <CardTitle className="text-gray-900 dark:text-white">{category.category}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {category.benefits.map((benefit, benefitIndex) => (
                            <motion.div 
                              key={benefitIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: benefitIndex * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                                {benefit.icon}
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">{benefit.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Culture Tab */}
            <TabsContent value="culture" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  These core values guide everything we do as we build the future of fashion
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companyValues.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:border-black h-full">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                          {value.icon}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-16"
              >
                <Card className="bg-gradient-to-br from-black to-gray-800 text-white border-0">
                  <CardContent className="p-12 text-center">
                    <h3 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h3>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                      Be part of our journey from premium t-shirts to a complete fashion empire. 
                      We're looking for passionate individuals who share our vision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg">
                        View Open Positions
                      </Button>
                      <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg">
                        Learn More About Us
                      </Button>
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
                <TrendingUp className="w-12 h-12 mx-auto mb-6" />
                <h3 className="mb-4">Growth Opportunities</h3>
                <p className="text-gray-300">
                  Join us early and grow with the company as we expand from t-shirts to complete fashion lines
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="mb-4 text-gray-900 dark:text-white">Remote First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Work from anywhere in the world with our flexible remote-first culture
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="mb-4 text-gray-900 dark:text-white">Innovation Focus</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Be part of cutting-edge fashion technology and sustainable design practices
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

export default Careers;
