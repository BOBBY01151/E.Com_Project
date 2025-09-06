import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, FileText, Mail } from 'lucide-react'
import LoadingScreen from '../components/LoadingScreen'

const PrivacyPolicy = () => {
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const privacySections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Database className="w-6 h-6" />,
      content: [
        'Personal Information: Name, email address, phone number, shipping and billing addresses',
        'Account Information: Username, password, profile preferences, and purchase history',
        'Payment Information: Credit card details, billing information (processed securely through third-party providers)',
        'Usage Data: Website interactions, browsing patterns, and device information',
        'Communication Data: Customer service interactions, feedback, and survey responses'
      ]
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <Eye className="w-6 h-6" />,
      content: [
        'Process and fulfill your orders and transactions',
        'Provide customer support and respond to your inquiries',
        'Send you important updates about your orders and account',
        'Improve our products, services, and website functionality',
        'Personalize your shopping experience and recommend products',
        'Send marketing communications (with your consent)',
        'Comply with legal obligations and protect our rights'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: <UserCheck className="w-6 h-6" />,
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'We may share information with trusted service providers who assist in our operations',
        'We may disclose information when required by law or to protect our rights',
        'We may share aggregated, non-personal information for business purposes',
        'In case of business transfers, customer information may be transferred as part of the assets'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className="w-6 h-6" />,
      content: [
        'We implement industry-standard security measures to protect your information',
        'All sensitive data is encrypted during transmission and storage',
        'We use secure payment processors that comply with PCI DSS standards',
        'Access to personal information is restricted to authorized personnel only',
        'We regularly review and update our security practices',
        'In case of a data breach, we will notify affected users as required by law'
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: <Shield className="w-6 h-6" />,
      content: [
        'Access: Request a copy of the personal information we hold about you',
        'Correction: Update or correct any inaccurate personal information',
        'Deletion: Request deletion of your personal information (subject to legal requirements)',
        'Portability: Request transfer of your data to another service provider',
        'Objection: Object to certain processing of your personal information',
        'Withdrawal: Withdraw consent for marketing communications at any time'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: <FileText className="w-6 h-6" />,
      content: [
        'We use cookies to enhance your browsing experience and analyze website traffic',
        'Essential cookies are necessary for the website to function properly',
        'Analytics cookies help us understand how visitors interact with our website',
        'Marketing cookies are used to deliver relevant advertisements',
        'You can control cookie settings through your browser preferences',
        'Disabling certain cookies may affect website functionality'
      ]
    }
  ]

  if (isPageLoading) {
    return <LoadingScreen title="LUXE" subtitle="Privacy & Protection" />
  }

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <section className="relative py-24 bg-black text-white overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                  <Shield className="w-5 h-5 fill-white" />
                  <span className="text-sm font-medium">Privacy & Protection</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Privacy Policy
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Your privacy is our priority. Learn how we collect, use, and protect your personal information.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex justify-center"
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Last Updated */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-black" />
                <div>
                  <h3 className="font-semibold text-black">Last Updated</h3>
                  <p className="text-gray-600">December 2024</p>
                </div>
              </div>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>
                  At LUXE, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website or make a purchase from us.
                </p>
                <p>
                  By using our website and services, you consent to the collection and use of information in accordance 
                  with this policy. We encourage you to read this Privacy Policy carefully to understand our practices 
                  regarding your personal information.
                </p>
              </div>
            </motion.div>

            {/* Privacy Sections */}
            <div className="space-y-16">
              {privacySections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white">
                      {section.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-black">{section.title}</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mt-16 bg-black rounded-2xl p-8 text-white"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Questions About This Policy?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please don't hesitate to contact us.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:privacy@luxe.com"
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    privacy@luxe.com
                  </a>
                  <Link
                    to="/contactus"
                    className="inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Changes to Policy */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6"
            >
              <h4 className="font-semibold text-black mb-2">Changes to This Policy</h4>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
                We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">LUXE</h2>
              <p className="text-gray-400 mb-6">
                Premium fashion for the modern individual
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/contactus" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
              <div className="mt-6 text-gray-500 text-sm">
                © {new Date().getFullYear()} LUXE. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  )
}

export default PrivacyPolicy
