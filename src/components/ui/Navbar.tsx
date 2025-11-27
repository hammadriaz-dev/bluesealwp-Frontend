'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Droplets,
  Thermometer,
  Building,
  Wrench,
  SprayCan,
  ShieldCheck,
  Mail,
  Star,
  Sparkles,
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  ChevronDown,
  Phone,
  Home,
  Shield,
  Clock,
  Award,
  Globe,
  CheckCircle
} from 'lucide-react'

// Types
interface DropdownItem {
  name: string;
  href: string;
  badge?: 'Popular' | 'Trending' | 'Expert' | 'Specialized' | 'Versatile' | 'Advanced' | 'Efficient' | 'Modern' | 'Precise';
  description?: string;
}

interface NavItem {
  name: string
  href: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  dropdown?: DropdownItem[]
  preview?: {
    title: string
    description: string
    features?: string[]
    cta?: string
    stats?: { value: string; label: string }[]
  }
}

// Constants
const CONTACT_PHONE = '+971 4 227 0123'
const CONTACT_EMAIL = 'contact@blueseal.ae'

const navigation: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    description: 'Welcome to Blue Seal',
    icon: Home,
    preview: {
      title: 'Leading Waterproofing Contractors',
      description: 'Professional waterproofing and insulation solutions with unmatched quality and service excellence.',
      features: ['25+ Years Experience', 'Dubai Municipality Approved', 'Quality Guaranteed', 'Free Site Assessment'],
      stats: [
        { value: '25+', label: 'Years Exp' },
        { value: '500+', label: 'Projects' },
        { value: '100%', label: 'Satisfaction' },
      ],
      cta: 'Get Started',
    },
  },
  {
    name: 'About',
    href: '/about',
    description: 'Learn about our company',
    icon: Users,
    preview: {
      title: 'About Blue Seal',
      description: 'One of the leading combination insulation and waterproofing contractors in Dubai with proven expertise.',
      features: ['Expert Management Team', 'Safety First Approach', 'Quality Focused', 'Customer Centric'],
      stats: [
        { value: '50+', label: 'Team Members' },
        { value: '10+', label: 'Certifications' },
        { value: '24/7', label: 'Support' },
      ],
      cta: 'Learn More',
    },
  },
  {
    name: 'Services',
    href: '/services',
    description: 'Explore our waterproofing solutions',
    icon: Droplets,
    dropdown: [
      {
        name: 'Green Roof System (COMBO)',
        href: '/services/green-roof-system',
        badge: 'Popular' as const,
        description: 'Comprehensive waterproofing with 40% energy savings'
      },
      {
        name: 'Membrane Waterproofing',
        href: '/services/membrane-waterproofing',
        badge: 'Expert' as const,
        description: 'Strong, flexible membranes for various applications'
      },
      {
        name: 'GRP Lining',
        href: '/services/grp-lining',
        badge: 'Expert' as const,
        description: 'Fiberglass lining for corrosion resistance'
      },
      {
        name: 'Cementitious Waterproofing',
        href: '/services/cementitious-waterproofing',
        badge: 'Expert' as const,
        description: 'Permanent, flexible system for all surfaces'
      },
      {
        name: 'Polyurea Coating',
        href: '/services/polyurea-coating',
        badge: 'Trending' as const,
        description: 'Rapid-curing elastomeric coating'
      },
      {
        name: 'Thermal Insulation',
        href: '/services/thermal-insulation',
        badge: 'Popular' as const,
        description: 'Energy-efficient insulation systems'
      },
      {
        name: 'External Insulation Finishing System',
        href: '/services/eifs',
        badge: 'Expert' as const,
        description: 'Continuous insulation with design flexibility'
      },
      {
        name: 'Injection System',
        href: '/services/injection-system',
        badge: 'Expert' as const,
        description: 'Concrete repair and protective coatings'
      },
      {
        name: 'Pile Head Treatment',
        href: '/services/pile-head-treatment',
        badge: 'Expert' as const,
        description: 'Waterproofing for foundation pile heads'
      }
    ],
  },
  {
    name: 'Projects',
    href: '/projects',
    description: 'View our completed work',
    icon: Building,
    preview: {
      title: 'Our Projects Portfolio',
      description: 'Explore our successful waterproofing and insulation projects across Dubai and UAE.',
      features: ['Commercial Buildings', 'Residential Complexes', 'Industrial Facilities', 'Government Projects'],
      stats: [
        { value: '500+', label: 'Projects' },
        { value: '98%', label: 'Success Rate' },
        { value: '25Y', label: 'Warranty' },
      ],
      cta: 'View Projects',
    },
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Get in touch with us',
    icon: Mail,
    preview: {
      title: "Let's Start Your Project",
      description: 'Get a free consultation and quote for your waterproofing and insulation needs.',
      features: ['Free Site Assessment', 'Detailed Quotation', 'Expert Consultation', 'Quick Response'],
      stats: [
        { value: '1-2', label: 'Hours Response' },
        { value: 'Free', label: 'Assessment' },
        { value: '24/7', label: 'Support' },
      ],
      cta: 'Contact Now',
    },
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activePreview, setActivePreview] = useState<string | null>(null)
  const pathname = usePathname()

  const dropdownRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
    setActivePreview(null)
  }, [pathname])

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Optimized dropdown handlers
  const handleDropdownEnter = useCallback((itemName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (itemName === 'Services') {
      setActivePreview(null)
    }

    setActiveDropdown(itemName)
    const item = navigation.find((it) => it.name === itemName)

    if (item && pathname !== item.href && item.preview && itemName !== 'Services') {
      setActivePreview(itemName)
    }
  }, [pathname])

  const handleDropdownLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setActivePreview(null)
    }, 150)
  }, [])

  const handleDropdownClick = useCallback((itemName: string) => {
    if (activeDropdown === itemName) {
      setActiveDropdown(null)
      setActivePreview(null)
    } else {
      setActiveDropdown(itemName)
      const item = navigation.find((it) => it.name === itemName)
      if (item && pathname !== item.href && item.preview && itemName !== 'Services') {
        setActivePreview(itemName)
      }
    }
  }, [activeDropdown, pathname])

  const handlePreviewEnter = useCallback((itemName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const item = navigation.find((it) => it.name === itemName)
    if (item && pathname !== item.href && item.preview && itemName !== 'Services') {
      setActivePreview(itemName)
    }
  }, [pathname])

  const handlePreviewLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActivePreview(null)
    }, 150)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setActivePreview(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Check if item is active
  const isItemActive = useCallback((item: NavItem) => {
    if (pathname === item.href) return true
    if (item.dropdown && item.dropdown.some(d => 
      pathname === d.href || pathname.startsWith(`${d.href}/`)
    )) return true
    return false
  }, [pathname])

  return (
    <>
      {/* Spacer to prevent content jump */}
      <div className="h-[90px] sm:h-[100px]" />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-200/60'
            : 'bg-white/95 backdrop-blur-lg border-b border-gray-200/40'
        }`}
        ref={dropdownRef}
      >
        {/* Professional Top Bar - Waterproofing Company */}
        <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-700 text-white relative overflow-hidden">
          {/* Animated background effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] animate-pulse" />
          </div>
          
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center py-2 sm:py-2 text-sm">
              {/* Left side - Contact info */}
              <div className="flex items-center space-x-4 sm:space-x-6 mb-1 sm:mb-0">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span className="font-medium text-xs sm:text-sm">{CONTACT_PHONE}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="font-medium text-xs sm:text-sm">{CONTACT_EMAIL}</span>
                </div>
              </div>
              
              {/* Center - Professional Value Proposition */}
              <div className="flex flex-col sm:flex-row items-center gap-1 mb-1 sm:mb-0">
                <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm border border-white/30">
                  <Award className="h-3 w-3 text-yellow-300 animate-pulse" />
                  <span className="font-bold text-xs bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    DUBAI MUNICIPALITY APPROVED
                  </span>
                </div>
                <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-cyan-600 px-3 py-1 rounded-full shadow-lg">
                  <span className="font-extrabold text-white text-xs">25-YEAR WARRANTY</span>
                </div>
              </div>

              {/* Right side - Timing */}
              <div className="hidden md:flex items-center space-x-2 text-blue-100">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-medium text-xs sm:text-sm">Mon-Sat: 8:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Professional gradient underline */}
          <div className="h-1 bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-500 shadow-lg shadow-cyan-400/25" />
        </div>

        {/* Main navigation */}
        <div className="max-w-7xl mx-auto pl-3 pr-4 sm:pl-4 sm:pr-6 lg:pl-5 lg:pr-8 relative">
          <div className="flex items-center h-16 sm:h-18">
            {/* Logo */}
            <div className="flex items-center mr-4 sm:mr-6 -ml-2 sm:-ml-3 lg:-ml-4">
              <Link
                href="/"
                className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent leading-none">
                    Blue Seal
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 leading-none mt-0.5 sm:mt-1 font-medium">
                    Waterproofing & Insulation
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-end">
              {navigation.map((item) => {
                const IconComponent = item.icon
                const isActive = isItemActive(item)
                const showPreview = item.preview && activePreview === item.name && pathname !== item.href && item.name !== 'Services'

                return (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'text-blue-700 bg-blue-50 border border-blue-200'
                          : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="whitespace-nowrap">{item.name}</span>
                      {item.dropdown && (
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown - Only for Services */}
                    {item.dropdown && item.name === 'Services' && (
                      <div
                        className={`absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-xl shadow-xl shadow-blue-500/10 transition-all duration-200 transform origin-top ${
                          activeDropdown === item.name
                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                        }`}
                        onMouseEnter={() => handleDropdownEnter(item.name)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="p-2 space-y-1">
                          <div className="px-3 py-2 border-b border-gray-100">
                            <h3 className="font-bold text-gray-900 text-sm">Our Services</h3>
                            <p className="text-xs text-gray-600 mt-1">Professional waterproofing solutions</p>
                          </div>
                          {item.dropdown.map((dropdownItem) => {
                            const isDropdownActive = pathname === dropdownItem.href

                            return (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                                  isDropdownActive
                                    ? 'bg-blue-50 text-blue-700 font-semibold'
                                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                                      isDropdownActive ? 'bg-blue-600' : 'bg-gray-300 group-hover:bg-blue-600'
                                    }`}
                                  />
                                  <span className="whitespace-nowrap text-xs">{dropdownItem.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {dropdownItem.badge && (
                                    <span
                                      className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                        dropdownItem.badge === 'Popular'
                                          ? 'bg-orange-100 text-orange-600'
                                          : dropdownItem.badge === 'Trending'
                                          ? 'bg-blue-100 text-blue-600'
                                          : 'bg-green-100 text-green-600'
                                      }`}
                                    >
                                      {dropdownItem.badge}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Professional Preview Panel - Exclude Services */}
                    {showPreview && (
                      <div
                        ref={previewRef}
                        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-blue-500/20 transition-all duration-200 origin-top ${
                          activePreview === item.name
                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                        }`}
                        onMouseEnter={() => handlePreviewEnter(item.name)}
                        onMouseLeave={handlePreviewLeave}
                        style={{ zIndex: 1000, backdropFilter: 'blur(20px)' }}
                      >
                        {/* Preview Content */}
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-start space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <item.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">
                                {item.preview?.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">{item.preview?.description}</p>
                            </div>
                          </div>

                          {/* Features */}
                          {item.preview?.features && (
                            <div className="space-y-2 mb-4">
                              {item.preview.features.slice(0, 3).map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                  <span className="leading-relaxed text-xs">{feature}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Stats */}
                          {item.preview?.stats && (
                            <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                              {item.preview.stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                  <div className="font-bold text-gray-900 text-sm">{stat.value}</div>
                                  <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Enhanced CTA Button */}
                          <div className="flex gap-2">
                            <Link
                              href={item.href}
                              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 flex-1 rounded-xl overflow-hidden shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transform hover:-translate-y-1 transition-all duration-300"
                              onClick={() => {
                                setActiveDropdown(null)
                                setActivePreview(null)
                              }}
                            >
                              {/* Background layers */}
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300" />

                              {/* Shimmer effect */}
                              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent dark-shimmer" />

                              {/* Text content */}
                              <span className="relative z-10 text-white flex items-center text-sm font-semibold">
                                {item.preview?.cta}
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Desktop CTA */}
              <div className="ml-2">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold overflow-hidden shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transform hover:-translate-y-1 transition-all duration-300"
                  aria-label="Get free quote"
                >
                  {/* Background layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent dark-shimmer" />

                  {/* Text content */}
                  <span className="relative z-10 text-white flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Free Quote
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile actions */}
            <div className="lg:hidden flex items-center w-full justify-end gap-2">
              {/* Mobile CTA Button */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold overflow-hidden shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transform hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
                aria-label="Get free quote"
              >
                {/* Background layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent dark-shimmer" />

                {/* Text content */}
                <span className="relative z-10 text-white flex items-center text-xs font-bold">
                  <Phone className="h-3 w-3 mr-1" />
                  Free Quote
                </span>
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-gray-100 focus:outline-none transition-all duration-200 flex-shrink-0"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 -mx-4 -mb-4 px-4 pb-6 rounded-b-2xl shadow-lg max-h-[80vh] overflow-y-auto">
              <div className="py-4 space-y-1">
                {navigation.map((item) => {
                  const IconComponent = item.icon
                  const hasDropdown = !!item.dropdown?.length
                  const isActive = isItemActive(item)

                  return (
                    <div key={item.name}>
                      {hasDropdown ? (
                        <div className="space-y-1">
                          {/* Services Dropdown Button */}
                          <button
                            onClick={() => handleDropdownClick(item.name)}
                            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-base font-semibold transition-all duration-200 ${
                              isActive
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                            }`}
                            aria-expanded={activeDropdown === item.name}
                          >
                            <div className="flex items-center space-x-3">
                              <IconComponent className="h-4 w-4" />
                              <span>{item.name}</span>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                activeDropdown === item.name ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {/* Services Dropdown Content */}
                          {activeDropdown === item.name && (
                            <div className="ml-6 space-y-1 border-l-2 border-blue-200 pl-4">
                              {item.dropdown!.map((dropdownItem) => {
                                const isDropdownActive = pathname === dropdownItem.href

                                return (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                                      isDropdownActive
                                        ? 'bg-blue-50 text-blue-700 font-semibold'
                                        : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
                                    }`}
                                    onClick={() => {
                                      setIsOpen(false)
                                      setActiveDropdown(null)
                                    }}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                                          isDropdownActive ? 'bg-blue-600' : 'bg-gray-300 group-hover:bg-blue-600'
                                        }`}
                                      />
                                      <span className="text-xs">{dropdownItem.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 pl-2">
                                      {dropdownItem.badge && (
                                        <span
                                          className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${
                                            dropdownItem.badge === 'Popular'
                                              ? 'bg-orange-100 text-orange-600'
                                              : dropdownItem.badge === 'Trending'
                                              ? 'bg-blue-100 text-blue-600'
                                              : 'bg-green-100 text-green-600'
                                          }`}
                                        >
                                          {dropdownItem.badge}
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Regular Menu Items */
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold transition-all duration-200 ${
                            isActive
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            setIsOpen(false)
                            setActivePreview(null)
                          }}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Mobile contact info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg bg-gray-50">
                    <Phone className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-sm">{CONTACT_PHONE}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg bg-gray-50">
                    <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-sm">{CONTACT_EMAIL}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg bg-blue-50">
                    <Award className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="font-medium text-sm text-blue-700">Dubai Municipality Approved</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dark Shimmer CSS */}
        <style jsx>{`
          .dark-shimmer {
            mask-image: linear-gradient(
              75deg,
              transparent 0%,
              white 12%,
              white 22%,
              transparent 35%
            );
            filter: brightness(0.9);
          }
        `}</style>
      </nav>
    </>
  )
}