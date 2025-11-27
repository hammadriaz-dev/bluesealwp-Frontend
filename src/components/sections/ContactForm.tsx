'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2, Send } from 'lucide-react'

// Add these imports if they're missing
const cx = (...classes: (string | undefined | null | false)[]) => 
  classes.filter(Boolean).join(' ')

const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
)

function ContactForm() {
  const [formData, setFormData] = useState({
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
  const msgLen = formData.message.length

  const errors = useMemo(() => {
    const out: Partial<Record<keyof typeof formData, string>> = {}
    if (!formData.name.trim()) out.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) out.email = 'Valid email required'
    if (!formData.service) out.service = 'Please select a service'
    if (!formData.message.trim()) out.message = 'Tell us a bit about the project'
    return out
  }, [formData])

  const canSubmit = Object.keys(errors).length === 0 && !isSubmitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, service: true, message: true })
    if (!canSubmit) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message')
      }

      setIsSubmitted(true)
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' })
        setIsSubmitted(false)
      }, 5000)

    } catch (error) {
      console.error('Error submitting form:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError(null)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }))
  }

  const services = [
    'Web Development',
    'Mobile Apps',
    'Consulting',
    'UI/UX Design',
    'Cloud Solutions',
    'Other'
  ]

  const budgetRanges = [
    '$5K - $15K',
    '$15K - $30K',
    '$30K - $50K',
    '$50K - $100K',
    '$100K+',
    'Not sure'
  ]

  return (
    <section className="relative py-8 md:py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/20 px-4 sm:px-6 lg:px-8">
      {/* Background Elements - Reduced on mobile */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-4 left-2 md:top-16 md:left-8 w-16 h-16 md:w-48 md:h-48 bg-gradient-to-br from-indigo-200/15 to-purple-200/10 rounded-3xl rotate-12 blur-xl md:blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-8 right-2 md:bottom-24 md:right-12 w-20 h-20 md:w-60 md:h-60 bg-gradient-to-tr from-purple-200/15 to-indigo-200/10 rounded-3xl -rotate-12 blur-xl md:blur-2xl animate-pulse-slow" style={{ animationDelay: '3s' }} />

        {/* Floating Orbs - Fewer on mobile */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30 hidden sm:block"
            style={{
              left: `${20 + (i * 30)}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.sin(i) * 8, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-2xl lg:max-w-3xl mx-auto">
        {/* Header - Mobile Optimized */}
        <AnimatedSection>
          <div className="text-center mb-6 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-white/80 backdrop-blur-xl shadow-lg ring-1 ring-white/60 mb-3 md:mb-6"
            >
              <motion.div
                className="flex -space-x-0.5"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                <div className="w-1.5 h-1.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
                <div className="w-1.5 h-1.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              </motion.div>
              <span className="text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wider uppercase">
                Get In Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-4xl font-bold text-slate-900 mb-2 md:mb-4 px-2"
            >
              Start Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Project</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed px-2"
            >
              Fill out the form below and we'll get back to you as soon as possible.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Contact Form - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          {/* Enhanced Gradient Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg md:rounded-2xl blur-sm opacity-75 transition-all duration-500 group-hover:opacity-100" />

          <div className="relative bg-white/80 backdrop-blur-xl rounded-lg md:rounded-2xl shadow-lg md:shadow-xl border border-white/60 p-3 sm:p-4 md:p-6">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 md:py-8"
              >
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-green-500 mx-auto mb-2 md:mb-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-1 md:mb-3">Thank You!</h3>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-3 md:mb-6 max-w-md mx-auto px-2">
                  Your message has been sent successfully. We'll get back to you within 24 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 text-primary-600 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-lg font-semibold transition-all duration-300 shadow-lg border border-white/60 min-h-[36px] sm:min-h-[40px] text-sm sm:text-base"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg mb-3 md:mb-6 shadow-lg text-xs sm:text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Service Chips - Mobile Optimized */}
                <div className="mb-3 md:mb-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 text-center">What service are you interested in?</h3>
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    {services.map(s => (
                      <motion.button
                        type="button"
                        key={s}
                        onClick={() => setFormData(prev => ({ ...prev, service: s }))}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={cx(
                          'px-2 py-1.5 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 rounded-lg text-xs font-semibold border-2 transition-all duration-300 shadow-sm sm:shadow-md min-h-[32px] flex-1 sm:flex-none',
                          formData.service === s
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-md sm:shadow-lg'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:shadow-md sm:hover:shadow-lg'
                        )}
                        style={{ minWidth: 'fit-content' }}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6" noValidate>
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-1">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={cx(
                          'w-full px-3 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border-2 rounded-lg focus:ring-2 sm:focus:ring-3 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm sm:shadow-md min-h-[38px] sm:min-h-[40px] text-sm',
                          touched.name && errors.name ? 'border-red-400 bg-red-50/50' : 'border-slate-200 hover:border-indigo-300'
                        )}
                        placeholder="Your full name"
                      />
                      {touched.name && errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-600 font-medium"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={cx(
                          'w-full px-3 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border-2 rounded-lg focus:ring-2 sm:focus:ring-3 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm sm:shadow-md min-h-[38px] sm:min-h-[40px] text-sm',
                          touched.email && errors.email ? 'border-red-400 bg-red-50/50' : 'border-slate-200 hover:border-indigo-300'
                        )}
                        placeholder="your.email@example.com"
                      />
                      {touched.email && errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-600 font-medium"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-1">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border-2 border-slate-200 rounded-lg focus:ring-2 sm:focus:ring-3 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm sm:shadow-md hover:border-indigo-300 min-h-[38px] sm:min-h-[40px] text-sm"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border-2 border-slate-200 rounded-lg focus:ring-2 sm:focus:ring-3 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm sm:shadow-md hover:border-indigo-300 min-h-[38px] sm:min-h-[40px] text-sm"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Service & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-slate-900 mb-1">Service Interested In *</label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={cx(
                          'w-full px-3 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border-2 rounded-lg focus:ring-2 sm:focus:ring-3 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm sm:shadow-md appearance-none min-h-[38px] sm:min-h-[40px] text-sm',
                          touched.service && errors.service ? 'border-red-400 bg-red-50/50' : 'border-slate-200 hover:border-indigo-300'
                        )}
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                      {touched.service && errors.service && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-xs text-red-600 font-medium"
                        >
                          {errors.service}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-semibold text-slate-900 mb-1">Project Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border-2 border-slate-200 rounded-lg focus:ring-2 sm:focus:ring-3 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm sm:shadow-md appearance-none hover:border-indigo-300 min-h-[38px] sm:min-h-[40px] text-sm"
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
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-1">Project Details *</label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        rows={3}
                        className={cx(
                          'w-full px-3 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 border-2 rounded-lg focus:ring-2 sm:focus:ring-3 focus:ring-indigo-200/50 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm sm:shadow-md resize-vertical pr-10 sm:pr-12 md:pr-14 text-sm',
                          touched.message && errors.message ? 'border-red-400 bg-red-50/50' : 'border-slate-200 hover:border-indigo-300'
                        )}
                        placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      />
                      <span className="absolute bottom-2 right-2 text-xs text-slate-500 font-medium bg-white/80 px-1 py-0.5 rounded">
                        {msgLen}/500
                      </span>
                    </div>
                    {touched.message && errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs text-red-600 font-medium"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={!canSubmit}
                    whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                    whileTap={{ scale: canSubmit ? 0.98 : 1 }}
                    className={cx(
                      'w-full py-2.5 sm:py-3 md:py-3.5 px-4 rounded-lg font-semibold text-sm sm:text-base text-white transition-all duration-300 shadow-lg sm:shadow-xl relative overflow-hidden group min-h-[40px] sm:min-h-[44px]',
                      canSubmit
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl'
                        : 'bg-slate-400 cursor-not-allowed'
                    )}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </div>

                    {/* Animated gradient overlay */}
                    {canSubmit && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-slate-600 font-medium px-2">
                    We'll get back to you within 24 hours. Your information is secure and confidential.
                  </p>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .animate-pulse-slow { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </section>
  )
}

export default ContactForm