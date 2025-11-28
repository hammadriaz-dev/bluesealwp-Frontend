'use client'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { apiService } from '@/lib/api'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  CheckCircle,
  Users,
  Zap,
  Star,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Building,
  Wrench,
  Droplets,
  Thermometer,
  Award,
  AlertCircle
} from 'lucide-react'

// Small helper for class names
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Frontend only quality of life: light validation and message counter
  const msgLen = formData.message.length

  const errors = useMemo(() => {
    const out: Partial<Record<keyof FormData, string>> = {}
    if (!formData.name.trim()) out.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) out.email = 'Valid email required'
    if (!formData.service) out.service = 'Please select a service'
    if (!formData.message.trim()) out.message = 'Tell us about your project requirements'
    if (formData.message.length > 1000) out.message = 'Message must be less than 1000 characters'
    return out
  }, [formData])

  const canSubmit = Object.keys(errors).length === 0 && !isSubmitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched to show errors
    setTouched({
      name: true,
      email: true,
      service: true,
      message: true,
      company: true,
      phone: true,
      budget: true
    })

    if (!canSubmit) {
      setError('Please fix the errors above before submitting.')
      return
    }

    setIsSubmitting(true)
    setError(null)
    
    try {
      console.log('Submitting form data:', formData)
      
      const result = await apiService.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        message: formData.message
      })
      
      console.log('API Response:', result)
      
      if (result.success) {
        setIsSubmitted(true)
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          budget: '',
          message: ''
        })
        setTouched({})
      } else {
        throw new Error(result.message || 'Failed to send message. Please try again.')
      }

    } catch (error: any) {
      console.error('Error submitting form:', error)
      setError(
        error.message || 
        'Failed to send message. Please try again or contact us directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleServiceChipClick = (service: string) => {
    setFormData(prev => ({ ...prev, service }))
    setTouched(prev => ({ ...prev, service: true }))
    if (error) setError(null)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }))
  }

  // Reset form when coming back from success state
  const handleSendAnother = () => {
    setIsSubmitted(false)
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      budget: '',
      message: ''
    })
    setTouched({})
    setError(null)
  }

  // Updated contact info for Blue Seal
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+971564821506',
      description: 'Sun-Thu: 8:00 AM - 6:00 PM',
      link: 'tel:+971564821506',
      color: 'from-blue-500 to-sky-600'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@blueseal.ae',
      description: 'We respond within 2 hours',
      link: 'mailto:contact@blueseal.ae',
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Office',
      content: 'Dubai Festival City',
      description: 'Dubai, United Arab Emirates',
      link: 'https://maps.google.com/?q=Blue+Seal+Dubai+Festival+City',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Sunday - Thursday: 8:00 AM - 6:00 PM',
      description: 'Friday & Saturday: Emergency services',
      link: null,
      color: 'from-orange-500 to-amber-600'
    }
  ]

  const services = [
    'GRP Lining',
    'Waterproofing',
    'Thermal Insulation',
    'Polyurea Coating',
    'Green Roof Systems',
    'EIFS Systems',
    'Other'
  ]

  const budgetRanges = [
    'AED 50,000 - AED 100,000',
    'AED 100,000 - AED 250,000',
    'AED 250,000 - AED 500,000',
    'AED 500,000 - AED 1,000,000',
    'AED 1,000,000+',
    'Request Quote'
  ]

  const reasonsToChoose = [
    { 
      icon: Award, 
      title: 'DCL Certified', 
      description: 'Dubai Central Laboratory approved materials and methods' 
    },
    { 
      icon: ShieldCheck, 
      title: '25-Year Warranty', 
      description: 'Comprehensive leakage protection guarantee' 
    },
    { 
      icon: Zap, 
      title: 'Fast Response', 
      description: 'Emergency services available 24/7 for urgent issues' 
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Floating quick action - WhatsApp */}
      <a
        href="https://wa.me/971564821506"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-white bg-green-600 hover:bg-green-700 shadow-xl transition-transform hover:-translate-y-0.5"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" /> Chat now
      </a>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimatedSection>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                Let's <span className="text-blue-600">Protect Your Property</span> Together
              </motion.h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
              >
                Get professional waterproofing and insulation solutions for your residential, commercial, or industrial projects in Dubai and across UAE.
              </motion.p>
            </AnimatedSection>

            {/* Trust badges */}
            <AnimatedSection delay={0.35}>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                  <Award className="w-4 h-4 text-blue-600" /> DCL Certified
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500" /> 25-Year Warranty
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                  <Clock className="w-4 h-4 text-blue-600" /> Emergency 24/7
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <AnimatedSection>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Contact us for professional waterproofing, insulation, and protective coating solutions. We serve clients across Dubai and the UAE.
                    </p>
                  </div>

                  {/* Contact Methods */}
                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <AnimatedSection key={item.title} delay={0.1 * index}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-start space-x-4 p-4 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                        >
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                            <item.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                            {item.link ? (
                              <a 
                                href={item.link} 
                                className="text-gray-600 hover:text-blue-600 transition-colors block mb-1 break-words"
                              >
                                {item.content}
                              </a>
                            ) : (
                              <p className="text-gray-600 mb-1">{item.content}</p>
                            )}
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </motion.div>
                      </AnimatedSection>
                    ))}
                  </div>

                  {/* Enhanced Google Map Card */}
                  <AnimatedSection delay={0.4}>
                    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-blue-600" /> Our Location in Dubai
                        </h3>
                        <p className="text-sm text-gray-600">Dubai Festival City, Dubai, United Arab Emirates</p>
                      </div>
                      <div className="h-80 w-full relative">
                        <iframe
                          title="Blue Seal Dubai Location"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.363365315752!2d55.33875731500848!3d25.12149908392995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d2a8b9b8b9b%3A0x9b9b9b9b9b9b9b9b!2sDubai%20Festival%20City!5e0!3m2!1sen!2sae!4v1630000000000!5m2!1sen!2sae"
                          loading="lazy"
                          className="w-full h-full border-0"
                          referrerPolicy="no-referrer-when-downgrade"
                          allowFullScreen
                          style={{ filter: 'saturate(1.1) contrast(1.1)' }}
                        />
                        {/* Map overlay for better appearance */}
                        <div className="absolute inset-0 pointer-events-none border-2 border-white/20 rounded-b-2xl" />
                      </div>
                      <div className="p-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-xs text-gray-600 text-center">
                          📍 Located in Dubai Festival City - Easy access from all major areas
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Why Choose Us */}
                  <AnimatedSection delay={0.5}>
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-blue-600" />
                        Why Choose Blue Seal?
                      </h3>
                      <div className="space-y-4">
                        {reasonsToChoose.map((reason) => (
                          <div key={reason.title} className="flex items-start space-x-3">
                            <div className="p-1 bg-blue-100 rounded-lg text-blue-600 mt-0.5">
                              <reason.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">{reason.title}</h4>
                              <p className="text-xs text-gray-600">{reason.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Your inquiry has been received. We'll contact you within 2 hours to discuss your project.
                        </p>
                        <div className="flex gap-4 justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSendAnother}
                            className="inline-flex items-center px-6 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl font-semibold transition-colors duration-200"
                          >
                            Send Another Inquiry
                          </motion.button>
                          <a
                            href="tel:+971564821506"
                            className="inline-flex items-center px-6 py-3 text-green-600 bg-green-50 hover:bg-green-100 rounded-xl font-semibold transition-colors duration-200"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="text-center mb-8">
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">Request a Free Quote</h2>
                          <p className="text-gray-600">Fill out the form below and we'll provide a detailed proposal for your project.</p>
                        </div>

                        {error && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start gap-3"
                          >
                            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Submission Error</p>
                              <p className="text-sm">{error}</p>
                            </div>
                          </motion.div>
                        )}

                        {/* Service selection chips */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Services Needed *
                            {touched.service && errors.service && (
                              <span className="text-red-600 text-sm ml-2">{errors.service}</span>
                            )}
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {services.map(s => (
                              <button
                                type="button"
                                key={s}
                                onClick={() => handleServiceChipClick(s)}
                                className={cx(
                                  'px-3 py-2 rounded-xl text-sm border transition-all duration-200 flex items-center gap-2',
                                  formData.service === s 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-md',
                                  touched.service && errors.service && formData.service !== s && 'border-red-300'
                                )}
                              >
                                {s === 'GRP Lining' && <Droplets className="w-3 h-3" />}
                                {s === 'Waterproofing' && <Droplets className="w-3 h-3" />}
                                {s === 'Thermal Insulation' && <Thermometer className="w-3 h-3" />}
                                {s === 'Polyurea Coating' && <Wrench className="w-3 h-3" />}
                                {s === 'Green Roof Systems' && <Building className="w-3 h-3" />}
                                {s === 'EIFS Systems' && <Building className="w-3 h-3" />}
                                {s === 'Other' && <Wrench className="w-3 h-3" />}
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                          {/* Personal Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                                {touched.name && errors.name && (
                                  <span className="text-red-600 text-sm ml-2">{errors.name}</span>
                                )}
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className={cx(
                                  'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                                  touched.name && errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                )}
                                placeholder="Your full name"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                                {touched.email && errors.email && (
                                  <span className="text-red-600 text-sm ml-2">{errors.email}</span>
                                )}
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className={cx(
                                  'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                                  touched.email && errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                )}
                                placeholder="your.email@example.com"
                              />
                            </div>
                          </div>

                          {/* Company & Phone */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                                Company/Project Name
                              </label>
                              <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                placeholder="Your company or project name"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                placeholder="+971 XX XXX XXXX"
                              />
                            </div>
                          </div>

                          {/* Service & Budget */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                                Service Interested In *
                                {touched.service && errors.service && (
                                  <span className="text-red-600 text-sm ml-2">{errors.service}</span>
                                )}
                              </label>
                              <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className={cx(
                                  'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
                                  touched.service && errors.service ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                )}
                              >
                                <option value="">Select a service</option>
                                {services.map((service) => (
                                  <option key={service} value={service}>{service}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                                Project Budget (AED)
                              </label>
                              <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                              >
                                <option value="">Select budget range</option>
                                {budgetRanges.map((range) => (
                                  <option key={range} value={range}>{range}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Message */}
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                              Project Details *
                              {touched.message && errors.message && (
                                <span className="text-red-600 text-sm ml-2">{errors.message}</span>
                              )}
                            </label>
                            <div className="relative">
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                rows={6}
                                maxLength={1000}
                                className={cx(
                                  'w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical pr-16',
                                  touched.message && errors.message ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                                )}
                                placeholder="Tell us about your project: building type, area size, specific requirements, timeline, and any issues you're facing..."
                              />
                              <div className="absolute bottom-3 right-3 flex items-center gap-1">
                                <span className={cx(
                                  "text-xs",
                                  msgLen > 1000 ? "text-red-600 font-medium" : "text-gray-500"
                                )}>
                                  {msgLen}/1000
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <motion.button
                            type="submit"
                            disabled={!canSubmit}
                            whileHover={canSubmit ? { scale: 1.02 } : {}}
                            whileTap={canSubmit ? { scale: 0.98 } : {}}
                            className={cx(
                              'w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center',
                              canSubmit
                                ? 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                                : 'bg-gray-400 cursor-not-allowed'
                            )}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Sending Inquiry...
                              </>
                            ) : (
                              <>
                                <Send className="h-5 w-5 mr-2" />
                                Get Free Quote
                              </>
                            )}
                          </motion.button>

                          <p className="text-center text-sm text-gray-500">
                            We'll contact you within 2 hours. Your information is secure and confidential.
                          </p>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/Quick Info Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Common questions about our waterproofing and insulation services.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { question: 'How soon can you start my project?', answer: 'We can typically begin within 3-5 days after site assessment and agreement.' },
              { question: 'Do you offer emergency leak repair?', answer: 'Yes, we provide 24/7 emergency services for water leakage and urgent issues.' },
              { question: "What's your warranty period?", answer: 'We offer up to 25-year warranty on our Green Roof Systems and comprehensive protection on all services.' },
              { question: 'Do you work on residential projects?', answer: 'Absolutely! We serve residential, commercial, and industrial clients across Dubai and UAE.' },
              { question: 'Are your materials DCL approved?', answer: 'Yes, all our materials are Dubai Central Laboratory certified and meet UAE standards.' },
              { question: 'Can you work during building occupancy?', answer: 'Yes, we follow strict safety protocols and minimize disruption to your daily operations.' }
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Need Immediate Assistance?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">For emergency leaks or urgent waterproofing issues, contact us immediately.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+971564821506" className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-blue-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Phone className="h-5 w-5 mr-2" />
                Call Emergency Line
              </a>
              <a href="mailto:contact@blueseal.ae" className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-transparent hover:bg-white/10 transition-all duration-300 border-2 border-white">
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </a>
            </div>
            
            <div className="mt-8 text-blue-200 text-sm">24/7 Emergency Service • Free Site Assessment • DCL Certified Solutions</div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}