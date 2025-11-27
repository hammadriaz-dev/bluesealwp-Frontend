'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, Mail, MessageCircle } from 'lucide-react'

const navigation = [
  { 
    name: 'Home', 
    href: '/',
    description: 'Welcome to EZ Solutions'
  },
  { 
    name: 'About', 
    href: '/about',
    description: 'Learn about our mission and team'
  },
  { 
    name: 'Services', 
    href: '/services',
    description: 'Explore our service offerings',
    dropdown: [
      { name: 'Web Development', href: '/services/web-development', description: 'Custom web applications' },
      { name: 'Mobile Applications', href: '/services/mobile-apps', description: 'iOS & Android apps' },
      { name: 'Business Consulting', href: '/services/consulting', description: 'Strategic guidance' },
      { name: 'UI/UX Design', href: '/services/ui-ux-design', description: 'User-centered design' },
      { name: 'Cloud Solutions', href: '/services/cloud-solutions', description: 'Scalable infrastructure' }
    ]
  },
  { 
    name: 'Contact', 
    href: '/contact',
    description: 'Get in touch with us'
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Handle dropdown hover
  const handleDropdownEnter = (itemName: string) => {
    setActiveDropdown(itemName)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-200/30'
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <a href="tel:+15551234567" className="hover:text-primary-100 transition-colors">
                  (555) 123-4567
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <a href="mailto:info@ezsolutions.com" className="hover:text-primary-100 transition-colors">
                  info@ezsolutions.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-primary-100">Mon-Fri: 9:00 AM - 6:00 PM</span>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:inline-flex items-center px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-medium transition-colors"
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Free Consultation
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">EZ</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 leading-none">
                    EZ Solutions
                  </span>
                  <span className="text-xs text-gray-500 leading-none">
                    Technology Partners
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && handleDropdownEnter(item.name)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    pathname === item.href || (item.dropdown && pathname.startsWith(item.href))
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                  
                  {/* Active indicator */}
                  {(pathname === item.href || (item.dropdown && pathname.startsWith(item.href))) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Dropdown menu */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-md"
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="p-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className={`block px-4 py-3 rounded-lg text-sm transition-all duration-200 group ${
                                pathname === dropdownItem.href
                                  ? 'bg-primary-50 text-primary-600 font-medium'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{dropdownItem.name}</span>
                                <span className="text-xs text-gray-500 mt-1">
                                  {dropdownItem.description}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4"
            >
              <Link
                href="/contact"
                className="px-6 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-primary-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40"
              >
                Get Started
              </Link>
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Link
                href="/contact"
                className="px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-primary-700 hover:to-purple-700 transition-colors duration-200"
              >
                Contact
              </Link>
            </motion.div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 -mx-4 -mb-4 px-4 pb-4"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.dropdown ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => setActiveDropdown(
                            activeDropdown === item.name ? null : item.name
                          )}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                            pathname.startsWith(item.href)
                              ? 'bg-primary-50 text-primary-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 space-y-1 border-l-2 border-gray-200 pl-2"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className={`block px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                    pathname === dropdownItem.href
                                      ? 'bg-primary-50 text-primary-600 font-medium'
                                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className="flex flex-col">
                                    <span>{dropdownItem.name}</span>
                                    <span className="text-xs text-gray-500 mt-1">
                                      {dropdownItem.description}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                          pathname === item.href
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile contact info and CTA */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+15551234567" className="hover:text-primary-600 transition-colors">
                      (555) 123-4567
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:info@ezsolutions.com" className="hover:text-primary-600 transition-colors">
                      info@ezsolutions.com
                    </a>
                  </div>
                  <div className="text-gray-500">
                    Mon-Fri: 9:00 AM - 6:00 PM
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium rounded-lg hover:from-primary-700 hover:to-purple-700 transition-colors duration-200 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Start Your Project
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}