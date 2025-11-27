'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Facebook, 
  Linkedin, 
  Instagram,
  ArrowUp,
  MessageCircle,
  Shield,
  Award,
  Zap,
  Globe,
  Heart,
  Building,
  Home,
  Wrench,
  Droplets,
  Thermometer
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ]

  const services = [
    { name: 'GRP Lining', href: '/services/grp-lining' },
    { name: 'Waterproofing', href: '/services/waterproofing' },
    { name: 'Thermal Insulation', href: '/services/thermal-insulation' },
    { name: 'Polyurea Coating', href: '/services/polyurea-coating' },
    { name: 'Green Roof Systems', href: '/services/green-roof' },
    { name: 'EIFS Systems', href: '/services/eifs' }
  ]

  const company = [
    { name: 'Our Story', href: '/about' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Projects', href: '/projects' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Careers', href: '/careers' }
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/bluesealuae',
      icon: Facebook,
      color: 'hover:bg-blue-600 hover:shadow-blue-500/30'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/blueseal-insulation',
      icon: Linkedin,
      color: 'hover:bg-blue-700 hover:shadow-blue-700/30'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/bluesealuae',
      icon: Instagram,
      color: 'hover:bg-pink-600 hover:shadow-pink-600/30'
    }
  ]

  const contactInfo = [
    {
      icon: Phone,
      content: '+971 4 227 0123',
      href: 'tel:+97142270123'
    },
    {
      icon: Mail,
      content: 'contact@blueseal.ae',
      href: 'mailto:contact@blueseal.ae'
    },
    {
      icon: MapPin,
      content: 'Dubai Festival City\nDubai, United Arab Emirates',
      href: 'https://maps.google.com/?q=Blue+Seal+Dubai+Festival+City'
    },
    {
      icon: Clock,
      content: 'Sun-Thu: 8:00 AM - 6:00 PM\nFri-Sat: Emergency Services',
      href: null
    }
  ]

  const features = [
    {
      icon: Shield,
      title: '25-Year Warranty',
      description: 'Leakage protection guarantee'
    },
    {
      icon: Award,
      title: 'DCL Certified',
      description: 'Dubai Central Laboratory approved'
    },
    {
      icon: Zap,
      title: 'Energy Efficient',
      description: '40% energy savings solutions'
    },
    {
      icon: Globe,
      title: 'UAE Wide Service',
      description: 'Projects across Emirates'
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900/80 to-emerald-900/30 text-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Construction Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>
        
        {/* Floating Construction Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${
              i % 5 === 0 ? 'w-2 h-2 bg-blue-400/40' : 
              i % 5 === 1 ? 'w-1 h-1 bg-emerald-400/40' : 
              i % 5 === 2 ? 'w-3 h-3 bg-sky-400/40' : 
              'w-1 h-1 bg-white/40'
            } rounded-sm blur-sm`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 15, 0],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-sky-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Features Banner */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-r from-blue-600/20 via-sky-600/20 to-emerald-600/20 border-b border-white/10 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <motion.div
                  className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                  <p className="text-gray-300 text-xs">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Blue Seal Logo */}
              <Link href="/" className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 group"
                >
                  <motion.div
                    className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Shield className="h-6 w-6 text-white" />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-none">
                      Blue Seal
                    </span>
                    <span className="text-sky-300 text-sm leading-none font-medium">
                      Waterproofing & Insulation
                    </span>
                  </div>
                </motion.div>
              </Link>

              {/* Company Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-300 leading-relaxed max-w-md text-lg font-light"
              >
                Leading <span className="text-blue-300 font-semibold">waterproofing and insulation contractor</span> in Dubai, providing professional GRP lining, thermal insulation, and protective coating solutions for over a decade.
              </motion.p>

              {/* Contact Info */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group"
                  >
                    <motion.div
                      className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-blue-400/30 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <item.icon className="h-5 w-5 text-blue-400" />
                    </motion.div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-300 hover:text-white transition-all duration-300 text-base leading-relaxed group-hover:translate-x-1"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <div className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                        {item.content}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex space-x-3 pt-4"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.3, y: -5 }}
                    className={`p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-gray-300 transition-all duration-300 shadow-lg ${social.color} hover:shadow-xl hover:text-white`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-400" />
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 text-lg font-medium"
                    >
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                <Wrench className="h-5 w-5 text-emerald-400" />
                Our Services
              </h3>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={service.href}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 text-lg font-medium"
                    >
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {service.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center gap-2">
                <Building className="h-5 w-5 text-sky-400" />
                Company
              </h3>
              <ul className="space-y-4">
                {company.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 text-lg font-medium"
                    >
                      <motion.div
                        className="w-3 h-3 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {item.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Quick Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quick Quote
              </h3>
              <p className="text-gray-300 text-base font-light">
                Get a free consultation for your waterproofing and insulation needs.
              </p>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col space-y-3"
                >
                  <Link
                    href="/contact"
                    className="px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-base flex items-center justify-center group"
                  >
                    <MessageCircle className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                    Free Consultation
                  </Link>
                  
                  <a
                    href="tel:+97142270123"
                    className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-2xl font-semibold transition-all duration-300 text-base flex items-center justify-center group"
                  >
                    <Phone className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                    Call Now
                  </a>
                </motion.div>
              </div>

              {/* Emergency Services */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4" />
                    24/7 Emergency Services
                  </h4>
                  <p className="text-red-200 text-xs">
                    Water leakage emergencies? Call us anytime for immediate assistance.
                  </p>
                  <a
                    href="tel:+97142270123"
                    className="text-white font-bold text-sm hover:underline mt-2 inline-block"
                  >
                    +971 4 227 0123
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <motion.div
              className="flex items-center space-x-2 text-gray-300 text-base"
              whileHover={{ scale: 1.05 }}
            >
              <span>© {currentYear} Blue Seal Insulation Contracting LLC. Built with</span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
              </motion.div>
              <span>in Dubai.</span>
            </motion.div>

            {/* Legal Links */}
            <div className="flex space-x-8 text-base">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-white transition-all duration-300 font-medium hover:underline"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-gradient-to-br from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Contact Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
        viewport={{ once: true }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link
          href="/contact"
          className="group flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/10 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Droplets className="h-6 w-6" />
          </motion.div>
          <motion.span
            className="text-base font-semibold max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-500 group-hover:ml-2"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            Get Quote
          </motion.span>
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Link>
      </motion.div>
    </footer>
  )
}