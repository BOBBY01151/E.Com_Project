import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Ruler, 
  ShirtIcon, 
  Footprints, 
  ArrowDown,
  CheckCircle,
  Info,
  HelpCircle
} from "lucide-react";

const SizeGuide = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Size data for each category
  const shoeSizes = [
    { us: "6", uk: "5.5", eu: "39", cm: "24.1" },
    { us: "6.5", uk: "6", eu: "39.5", cm: "24.5" },
    { us: "7", uk: "6.5", eu: "40", cm: "24.9" },
    { us: "7.5", uk: "7", eu: "40.5", cm: "25.4" },
    { us: "8", uk: "7.5", eu: "41", cm: "25.8" },
    { us: "8.5", uk: "8", eu: "42", cm: "26.2" },
    { us: "9", uk: "8.5", eu: "42.5", cm: "26.7" },
    { us: "9.5", uk: "9", eu: "43", cm: "27.1" },
    { us: "10", uk: "9.5", eu: "44", cm: "27.5" },
    { us: "10.5", uk: "10", eu: "44.5", cm: "27.9" },
    { us: "11", uk: "10.5", eu: "45", cm: "28.4" },
    { us: "11.5", uk: "11", eu: "45.5", cm: "28.8" },
    { us: "12", uk: "11.5", eu: "46", cm: "29.2" }
  ];

  const clothingSizes = [
    { size: "XS", chest: "32-34", waist: "26-28", length: "26", shoulder: "15.5" },
    { size: "S", chest: "35-37", waist: "29-31", length: "27", shoulder: "16.5" },
    { size: "M", chest: "38-40", waist: "32-34", length: "28", shoulder: "17.5" },
    { size: "L", chest: "41-44", waist: "35-38", length: "29", shoulder: "18.5" },
    { size: "XL", chest: "45-48", waist: "39-42", length: "30", shoulder: "19.5" },
    { size: "XXL", chest: "49-52", waist: "43-46", length: "31", shoulder: "20.5" }
  ];

  const denimSizes = [
    { size: "XS", waist: "26-27", hip: "34-35", inseam: "30-32" },
    { size: "S", waist: "28-29", hip: "36-37", inseam: "30-32" },
    { size: "M", waist: "30-32", hip: "38-40", inseam: "30-34" },
    { size: "L", waist: "33-35", hip: "41-43", inseam: "30-34" },
    { size: "XL", waist: "36-38", hip: "44-46", inseam: "30-34" },
    { size: "XXL", waist: "39-42", hip: "47-50", inseam: "30-34" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Enhanced Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        {/* Background Images with Parallax */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 parallax-element opacity-20"
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`,
              backgroundImage: `url('https://images.unsplash.com/photo-1700734211614-f9091eb4b5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduJTIwc3R1ZGlvfGVufDF8fHx8MTc1NzAwODYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div 
            className="absolute inset-0 parallax-element opacity-15"
            style={{ 
              transform: `translateY(${scrollY * 0.3}px)`,
              backgroundImage: `url('https://images.unsplash.com/photo-1753164597442-ae97e3cb3dca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWlsb3IlMjBtZWFzdXJpbmclMjBjbG90aGVzfGVufDF8fHx8MTc1NzA2MTgyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
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
            <Ruler className="w-32 h-32" />
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
            <ShirtIcon className="w-24 h-24" />
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
            <Footprints className="w-28 h-28" />
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
                <Ruler className="w-12 h-12" />
                <div className="text-left">
                  <p className="text-sm text-gray-300 uppercase tracking-wide">Perfect Fit Guarantee</p>
                  <h1 className="text-5xl md:text-7xl font-bold">Size Guide</h1>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Discover your perfect fit with our comprehensive sizing charts for shoes, clothing, and denim. 
              Professional measurements for the modern wardrobe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-6 justify-center mb-16"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Footprints className="w-5 h-5" />
                <span>Shoes</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <ShirtIcon className="w-5 h-5" />
                <span>Clothing</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Ruler className="w-5 h-5" />
                <span>Denim</span>
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4 font-bold text-gray-900 dark:text-white">Find Your Perfect Fit</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Accurate measurements for every body type and style preference
            </p>
          </motion.div>

          <Tabs defaultValue="shoes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 dark:bg-gray-800 h-16">
              <TabsTrigger value="shoes" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                <Footprints className="w-5 h-5" />
                Shoes
              </TabsTrigger>
              <TabsTrigger value="clothing" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                <ShirtIcon className="w-5 h-5" />
                Clothing
              </TabsTrigger>
              <TabsTrigger value="denim" className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white h-full text-base">
                <Ruler className="w-5 h-5" />
                Denim
              </TabsTrigger>
            </TabsList>

            {/* Shoes Tab */}
            <TabsContent value="shoes" className="space-y-8">
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
                      <Footprints className="w-6 h-6" />
                      Shoe Size Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">US</th>
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">UK</th>
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">EU</th>
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">CM</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shoeSizes.map((size, index) => (
                            <motion.tr 
                              key={index} 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.us}</td>
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.uk}</td>
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.eu}</td>
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.cm}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">How to Measure Your Feet</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      {[
                        "Place a piece of paper on the floor against a wall",
                        "Stand on the paper with your heel against the wall", 
                        "Mark the longest point of your foot on the paper",
                        "Measure the distance from the wall to the mark"
                      ].map((step, index) => (
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
                      <h4 className="mb-3 text-gray-900 dark:text-white">Fitting Tips</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• Measure feet in the evening when they're largest</li>
                        <li>• Always measure both feet and use the larger measurement</li>
                        <li>• Consider the thickness of socks you'll wear</li>
                        <li>• If between sizes, choose the larger size</li>
                      </ul>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Clothing Tab */}
            <TabsContent value="clothing" className="space-y-8">
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
                      <ShirtIcon className="w-6 h-6" />
                      Clothing Size Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">Size</th>
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">Chest (inches)</th>
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">Waist (inches)</th>
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">Length (inches)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clothingSizes.map((size, index) => (
                            <motion.tr 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.size}</td>
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.chest}</td>
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.waist}</td>
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.length}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">How to Measure for Clothing</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      {[
                        { title: "Chest", desc: "Measure around the fullest part of your chest" },
                        { title: "Waist", desc: "Measure around the narrowest part of your waist" },
                        { title: "Length", desc: "Measure from shoulder seam to bottom hem" }
                      ].map((measurement, index) => (
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
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{measurement.title}</p>
                            <p className="text-gray-600 dark:text-gray-300">{measurement.desc}</p>
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
                      <h4 className="mb-4 text-gray-900 dark:text-white">Clothing Fit Guide</h4>
                      <div className="space-y-3">
                        {[
                          { name: "Slim Fit", desc: "Close to body, modern cut" },
                          { name: "Regular Fit", desc: "Classic comfortable fit" },
                          { name: "Relaxed Fit", desc: "Loose and casual" },
                          { name: "Oversized", desc: "Deliberately loose streetwear style" }
                        ].map((fit, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="font-medium text-gray-900 dark:text-white">{fit.name}:</span>
                            <span className="text-gray-600 dark:text-gray-300">{fit.desc}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Denim Tab */}
            <TabsContent value="denim" className="space-y-8">
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
                      <Ruler className="w-6 h-6" />
                      Denim Size Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">Size</th>
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">Waist (inches)</th>
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">Hip (inches)</th>
                            <th className="text-left py-3 font-medium text-gray-900 dark:text-white">Inseam (inches)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {denimSizes.map((size, index) => (
                            <motion.tr 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.size}</td>
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.waist}</td>
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.hip}</td>
                              <td className="py-3 text-gray-700 dark:text-gray-300">{size.inseam}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
                    <CardTitle className="text-gray-900 dark:text-white">How to Measure for Denim</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      {[
                        { title: "Waist", desc: "Measure around the narrowest part of your waist" },
                        { title: "Hip", desc: "Measure around the fullest part of your hips" },
                        { title: "Inseam", desc: "Measure from crotch to desired hem length" }
                      ].map((measurement, index) => (
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
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{measurement.title}</p>
                            <p className="text-gray-600 dark:text-gray-300">{measurement.desc}</p>
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
                      <h4 className="mb-4 text-gray-900 dark:text-white">Denim Fit Guide</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: "Skinny Fit", desc: "Tight through leg, tapered ankle" },
                          { name: "Slim Fit", desc: "Close to body, not tight" },
                          { name: "Regular Fit", desc: "Relaxed through thigh and leg" },
                          { name: "Relaxed Fit", desc: "Loose and comfortable" }
                        ].map((fit, index) => (
                          <div key={index}>
                            <p className="font-medium text-gray-900 dark:text-white">{fit.name}</p>
                            <p className="text-gray-600 dark:text-gray-300">{fit.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Additional Information with Parallax */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 grid md:grid-cols-3 gap-8"
          >
            <Card className="bg-gradient-to-br from-black to-gray-800 text-white border-0 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <HelpCircle className="w-12 h-12 mx-auto mb-6" />
                <h3 className="mb-4">Need Help?</h3>
                <p className="text-gray-300">
                  Contact our customer service team for personalized sizing assistance
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  ↺
                </div>
                <h3 className="mb-4 text-gray-900 dark:text-white">Easy Returns</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Free returns within 30 days if the size doesn't fit perfectly
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="mb-4 text-gray-900 dark:text-white">Size Guarantee</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We guarantee the accuracy of our sizing charts for all products
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
