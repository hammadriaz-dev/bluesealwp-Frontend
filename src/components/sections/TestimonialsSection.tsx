'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Quote, Star, Building, Shield, Award } from 'lucide-react'

// --- Updated Interface and Data based on Blue Seal Profile ---
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  color: string;
  projectType?: string;
  location?: string;
}

// Updated testimonials data based on Blue Seal's actual business
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Presidential Guard Command',
    role: 'Government Project',
    company: 'UAE Government',
    content: 'Blue Seal delivered exceptional GRP lining works for our critical infrastructure project. Their technical expertise and adherence to timelines were impressive.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=150&h=150&fit=crop&crop=face',
    color: 'from-green-500 to-emerald-500',
    projectType: 'GRP Lining Works',
    location: 'Abu Dhabi'
  },
  {
    id: 2,
    name: 'Al Ghaith Design & Engineering',
    role: 'Consulting Engineers',
    company: 'Al Ghaith Consultants',
    content: 'Professional waterproofing services for underground water tanks. Blue Seal\'s attention to detail and quality workmanship exceeded our expectations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face',
    color: 'from-blue-500 to-cyan-500',
    projectType: 'Waterproofing',
    location: 'Dubai'
  },
  {
    id: 3,
    name: 'Mott MacDonald',
    role: 'International Consultants',
    company: 'Mott MacDonald',
    content: 'Blue Seal provided excellent GRP lining solutions for our industrial waste storage facility. Their technical submissions were comprehensive and professional.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop&crop=face',
    color: 'from-purple-500 to-indigo-500',
    projectType: 'Industrial Lining',
    location: 'JAFZA'
  },
  {
    id: 4,
    name: 'Bader Al Sayegh Contracting',
    role: 'Main Contractor',
    company: 'Bader Al Sayegh LLC',
    content: 'Reliable thermal insulation and waterproofing services for our residential tower project. Blue Seal team demonstrated excellent coordination and quality.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    color: 'from-orange-500 to-red-500',
    projectType: 'Thermal Insulation',
    location: 'Al Qusais'
  },
  {
    id: 5,
    name: 'Azizi Developments',
    role: 'Property Developer',
    company: 'Azizi',
    content: 'Outstanding EIFS and waterproofing work on our residential buildings. Blue Seal\'s expertise in external insulation systems is remarkable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&h=150&fit=crop&crop=face',
    color: 'from-teal-500 to-green-500',
    projectType: 'EIFS & Waterproofing',
    location: 'Meydan District'
  },
  {
    id: 6,
    name: 'Total Lubricants ME',
    role: 'Industrial Client',
    company: 'Total Middle East',
    content: 'Professional polyurea coating and protective solutions for our storage facilities. The quality and durability of their work is exceptional.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=150&h=150&fit=crop&crop=face',
    color: 'from-indigo-500 to-purple-500',
    projectType: 'Protective Coatings',
    location: 'Jebel Ali'
  }
]

// --- Updated SVG Animation Component for Construction Theme ---
const AnimatedConstructionSvg = () => (
  <svg 
      className="w-full h-full opacity-30 absolute top-0 left-0" 
      viewBox="0 0 1440 320" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
  >
      {/* Construction-themed background */}
      <defs>
          <linearGradient id="constructionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1"/>
          </pattern>
      </defs>
      
      {/* Grid background */}
      <rect width="100%" height="100%" fill="url(#grid)" className="text-slate-300"/>
      
      {/* Construction elements */}
      {[0, 200, 400, 600, 800, 1000, 1200].map((x, index) => (
          <motion.g 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.1, y: -10 }}
              transition={{ repeat: Infinity, duration: 20, delay: index * 3, ease: "linear" }}
          >
              {/* Building shapes */}
              <rect x={x + 50} y="150" width="60" height="80" fill="#6366F1" opacity="0.05"/>
              <rect x={x + 70} y="130" width="20" height="20" fill="#0EA5E9" opacity="0.05"/>
              
              {/* Crane elements */}
              <line x1={x + 30} y1="250" x2={x + 30} y2="100" stroke="#64748B" strokeWidth="2" opacity="0.05"/>
              <line x1={x + 30} y1="120" x2={x + 80} y2="120" stroke="#64748B" strokeWidth="2" opacity="0.05"/>
          </motion.g>
      ))}

      {/* Floating certificates and approvals */}
      {[100, 300, 500, 700, 900, 1100].map((delay, index) => (
          <motion.g 
              key={index}
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              animate={{ opacity: 0.08, y: -30, rotate: 5 }}
              transition={{ repeat: Infinity, duration: 25, delay: index * 4, ease: "linear" }}
          >
              <rect x={100 + index * 200} y="80" width="40" height="30" rx="2" fill="#10B981" opacity="0.1"/>
              <Award x={110 + index * 200} y="85" width="20" height="20" stroke="#10B981" opacity="0.2"/>
          </motion.g>
      ))}

  </svg>
);

// --- Start of Updated Component ---
export default function TestimonialsSection() {
    const testimonials = defaultTestimonials;
    const [currentTestimonial, setCurrentTestimonial] = useState(0)
    const [currentMiniTestimonial, setCurrentMiniTestimonial] = useState(0) 
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [isMiniAutoPlaying, setIsMiniAutoPlaying] = useState(true)
    
    const VISIBLE_MINI_CARDS = 3;

    const maxMiniIndex = useMemo(() => {
        return testimonials.length - (testimonials.length % VISIBLE_MINI_CARDS === 0 
            ? VISIBLE_MINI_CARDS 
            : (testimonials.length - (testimonials.length % VISIBLE_MINI_CARDS)));
    }, [testimonials.length]);

    // --- Auto-Play Logic ---
    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [isAutoPlaying, testimonials.length])

    useEffect(() => {
        if (!isMiniAutoPlaying) return
        const interval = setInterval(() => {
            setCurrentMiniTestimonial((prev) => {
                const nextIndex = prev + VISIBLE_MINI_CARDS;
                return nextIndex < testimonials.length ? nextIndex : 0;
            })
        }, 5000)
        return () => clearInterval(interval)
    }, [isMiniAutoPlaying, testimonials.length, VISIBLE_MINI_CARDS])

    // --- Navigation Functions ---
    const handleAutoPlayPause = (setter: React.Dispatch<React.SetStateAction<boolean>>, duration = 10000) => {
        setter(false)
        setTimeout(() => setter(true), duration)
    }

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        handleAutoPlayPause(setIsAutoPlaying)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
        handleAutoPlayPause(setIsAutoPlaying)
    }
    
    const nextMiniTestimonial = () => {
        setCurrentMiniTestimonial((prev) => {
            const nextIndex = prev + VISIBLE_MINI_CARDS;
            return nextIndex < testimonials.length ? nextIndex : 0;
        })
        handleAutoPlayPause(setIsMiniAutoPlaying, 8000)
    }

    const prevMiniTestimonial = () => {
        setCurrentMiniTestimonial((prev) => {
            if (prev === 0) return maxMiniIndex;
            return prev - VISIBLE_MINI_CARDS;
        })
        handleAutoPlayPause(setIsMiniAutoPlaying, 8000)
    }

    const goToTestimonial = (index: number) => {
        setCurrentTestimonial(index)
        handleAutoPlayPause(setIsAutoPlaying)
    }

    const goToMiniTestimonial = (index: number) => {
        setCurrentMiniTestimonial(index)
        handleAutoPlayPause(setIsMiniAutoPlaying, 8000)
    }

    // --- Star Rating Component ---
    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex justify-center gap-1 mb-3 md:mb-5">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                    <Star
                        className={`w-4 h-4 md:w-5 md:h-5 ${i < rating ? 'text-yellow-400 fill-current drop-shadow-sm' : 'text-gray-300'}`}
                    />
                </motion.div>
            ))}
        </div>
    )
    
    // --- Updated Mini Testimonial Card Component ---
    const MiniTestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 p-5 md:p-6 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 w-full">
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${testimonial.color} rounded-t-2xl`} />
            
            <div className="flex items-start gap-3 md:gap-4">
                <div className="relative">
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-lg flex-shrink-0"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r ${testimonial.color} border-2 border-white flex items-center justify-center`}>
                        <Building className="w-2 h-2 md:w-3 md:h-3 text-white" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h5 className="font-bold text-slate-900 text-base md:text-lg truncate">
                            {testimonial.name}
                        </h5>
                        <div className="flex gap-0.5 flex-shrink-0">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < testimonial.rating 
                                        ? 'text-yellow-400 fill-current drop-shadow-sm' 
                                        : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-slate-600 text-xs mb-1">
                        {testimonial.role} • {testimonial.company}
                    </p>
                    {testimonial.projectType && (
                        <div className="flex items-center gap-1 mb-2">
                            <Shield className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-700 text-xs font-medium bg-slate-100 px-2 py-1 rounded-full">
                                {testimonial.projectType}
                            </span>
                        </div>
                    )}
                    <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                        "{testimonial.content}"
                    </p>
                </div>
            </div>
        </div>
    );

    // --- Main Render ---
    return (
        <section className="relative py-12 md:py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/30 overflow-hidden">
            {/* Construction-themed SVG Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <AnimatedConstructionSvg />
            </div>
            
            {/* Main Content Container */}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Updated Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10 md:mb-14 lg:mb-18"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl bg-white/90 backdrop-blur-xl shadow-lg md:shadow-xl ring-1 ring-white/60 mb-4 md:mb-6 hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 hover:-translate-y-0.5 md:hover:-translate-y-1"
                    >
                        <div className="flex space-x-1 md:space-x-2">
                            <motion.div
                                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-500 to-sky-500"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500"
                                animate={{ scale: [1.5, 1, 1.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                            />
                            <motion.div
                                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                            />
                        </div>
                        <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-blue-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent tracking-wider">
                            CLIENT TESTIMONIALS
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 md:mb-6 px-4"
                    >
                        Trusted by <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">Leading Companies</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4"
                    >
                        Discover why government entities, contractors, and developers across UAE trust Blue Seal for premium waterproofing, insulation, and protective coating solutions.
                    </motion.p>
                </motion.div>

                {/* Main Testimonial Carousel */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        onClick={prevTestimonial}
                        className="absolute -left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl md:rounded-2xl bg-white/95 backdrop-blur-xl shadow-lg md:shadow-xl border border-white/60 flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 hover:text-blue-700 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 group"
                    >
                        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 group-hover:-translate-x-0.5 transition-transform" />
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        onClick={nextTestimonial}
                        className="absolute -right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl md:rounded-2xl bg-white/95 backdrop-blur-xl shadow-lg md:shadow-xl border border-white/60 flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 hover:text-blue-700 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 group"
                    >
                        <ChevronRight className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 group-hover:translate-x-0.5 transition-transform" />
                    </motion.button>

                    {/* Main Testimonial Card */}
                    <div className="overflow-hidden px-2 sm:px-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={testimonials[currentTestimonial].id}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="flex justify-center"
                            >
                                <div className="w-full max-w-4xl">
                                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-white/60 p-6 md:p-8 lg:p-10 relative overflow-hidden group hover:shadow-xl md:hover:shadow-3xl transition-all duration-500">
                                        <div className={`absolute top-0 left-0 w-full h-1.5 md:h-2 bg-gradient-to-r ${testimonials[currentTestimonial].color} rounded-t-2xl md:rounded-t-3xl`} />
                                        <motion.div
                                            className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-100 group-hover:text-slate-200 transition-colors duration-500"
                                            animate={{ rotate: [0, 5, 0] }}
                                            transition={{ duration: 5, repeat: Infinity }}
                                        >
                                            <Award className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16" />
                                        </motion.div>

                                        <div className="relative z-10">
                                            <StarRating rating={testimonials[currentTestimonial].rating} />

                                            {/* Project Details */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.1 }}
                                                className="mb-6 md:mb-8 rounded-xl md:rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/50 p-4 md:p-6 border border-slate-200/50"
                                            >
                                                <div className="flex flex-wrap gap-4 justify-center">
                                                    {testimonials[currentTestimonial].projectType && (
                                                        <div className="flex items-center gap-2">
                                                            <Shield className="w-4 h-4 text-blue-600" />
                                                            <span className="text-sm font-semibold text-slate-700">
                                                                {testimonials[currentTestimonial].projectType}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {testimonials[currentTestimonial].location && (
                                                        <div className="flex items-center gap-2">
                                                            <Building className="w-4 h-4 text-emerald-600" />
                                                            <span className="text-sm font-semibold text-slate-700">
                                                                {testimonials[currentTestimonial].location}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>

                                            <motion.blockquote
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                className="text-lg md:text-xl lg:text-2xl text-slate-800 leading-relaxed mb-4 md:mb-6 lg:mb-8 text-center font-light italic px-1 sm:px-2"
                                            >
                                                "{testimonials[currentTestimonial].content}"
                                            </motion.blockquote>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                                className="flex flex-col items-center text-center"
                                            >
                                                <div className="relative mb-3 md:mb-4">
                                                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 md:border-4 border-white shadow-lg md:shadow-xl overflow-hidden">
                                                        <img
                                                            src={testimonials[currentTestimonial].avatar}
                                                            alt={testimonials[currentTestimonial].name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-r ${testimonials[currentTestimonial].color} border-2 border-white flex items-center justify-center`}>
                                                        <Building className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-0.5 md:mb-1">
                                                        {testimonials[currentTestimonial].name}
                                                    </h4>
                                                    <p className="text-slate-700 font-semibold mb-0.5 md:mb-1 text-sm md:text-base">
                                                        {testimonials[currentTestimonial].role}
                                                    </p>
                                                    <p className="text-slate-600 text-xs md:text-sm">
                                                        {testimonials[currentTestimonial].company}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Testimonial Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex justify-center mt-6 md:mt-8 lg:mt-10 space-x-2 md:space-x-3"
                    >
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToTestimonial(index)}
                                className={`relative rounded-full transition-all duration-500 transform hover:scale-110 ${index === currentTestimonial
                                    ? 'w-6 md:w-8 bg-gradient-to-r from-blue-600 to-emerald-600 shadow-md md:shadow-lg shadow-blue-500/30'
                                    : 'w-2 md:w-3 bg-slate-300 hover:bg-slate-400'
                                    } h-2 md:h-3`}
                            >
                                {index === currentTestimonial && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-white/40"
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Mini Testimonials Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="relative mt-12 md:mt-16 lg:mt-20"
                >
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 text-center mb-6 md:mb-8">
                        More <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Satisfied Clients</span>
                    </h3>
                    
                    {/* Mini Carousel Navigation */}
                    <div className="flex justify-center gap-4 mb-6">
                        <motion.button
                            onClick={prevMiniTestimonial}
                            disabled={currentMiniTestimonial === 0} 
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/90 backdrop-blur-xl shadow-lg border border-white/60 flex items-center justify-center text-blue-600 transition-all duration-300 ${currentMiniTestimonial === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:scale-110 hover:text-blue-700'}`}
                            whileHover={{ scale: currentMiniTestimonial !== 0 ? 1.1 : 1 }}
                            whileTap={{ scale: currentMiniTestimonial !== 0 ? 0.95 : 1 }}
                        >
                            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                        </motion.button>
                        
                        <motion.button
                            onClick={nextMiniTestimonial}
                            disabled={currentMiniTestimonial >= maxMiniIndex} 
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/90 backdrop-blur-xl shadow-lg border border-white/60 flex items-center justify-center text-blue-600 transition-all duration-300 ${currentMiniTestimonial >= maxMiniIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:scale-110 hover:text-blue-700'}`}
                            whileHover={{ scale: currentMiniTestimonial < maxMiniIndex ? 1.1 : 1 }}
                            whileTap={{ scale: currentMiniTestimonial < maxMiniIndex ? 0.95 : 1 }}
                        >
                            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                        </motion.button>
                    </div>

                    {/* Mini Testimonials Carousel Container */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${currentMiniTestimonial / testimonials.length * 100}%` }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={testimonial.id}
                                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2 flex justify-center"
                                >
                                    <MiniTestimonialCard testimonial={testimonial} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Mini Carousel Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="flex justify-center mt-6 space-x-2"
                    >
                        {testimonials.map((_, index) => {
                            if (index % VISIBLE_MINI_CARDS === 0 && index <= maxMiniIndex) {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => goToMiniTestimonial(index)}
                                        className={`relative rounded-full transition-all duration-300 transform hover:scale-110 ${index === currentMiniTestimonial
                                            ? 'w-4 bg-gradient-to-r from-sky-600 to-emerald-600 shadow-md shadow-sky-500/30'
                                            : 'w-2 bg-slate-300 hover:bg-slate-400'
                                            } h-2`}
                                    />
                                );
                            }
                            return null;
                        })}
                    </motion.div>
                </motion.div>
            </div> 
        </section>
    )
}