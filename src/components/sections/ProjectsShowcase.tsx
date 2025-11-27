'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, Building, MapPin, Calendar } from 'lucide-react'

// Add these imports if they're missing
const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
)

function ProjectsShowcase() {
  const projects = [
    {
      title: 'Presidential Guard Command HQ',
      desc: 'Complete GRP lining works for water tanks and sewage systems with 10-year guarantee period.',
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      category: 'Government',
      tech: ['GRP Lining', '10-Year Warranty', 'Waterproofing'],
      location: 'Abu Dhabi, UAE',
      client: 'Presidential Guard Command',
      year: '2019',
      scope: 'Complete GRP Lining Works',
      liveLink: '#',
      detailsLink: '#'
    },
    {
      title: 'Al Waleed Thanaya Mall',
      desc: 'Advanced GRP lining installation for underground water tanks with 4mm thickness specification.',
      img: 'https://images.unsplash.com/photo-1486326658264-399238d01b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      category: 'Commercial',
      tech: ['GRP 4mm Lamination', 'Waterproofing', 'Tank Lining'],
      location: 'Umm Suqeim, Dubai',
      client: 'Al Waleed Thanaya Mall',
      year: '2020',
      scope: 'Water Tank GRP Lining',
      liveLink: '#',
      detailsLink: '#'
    },
    {
      title: 'Jebel Ali Labor Accommodation',
      desc: 'Large-scale waterproofing and insulation solutions for labor camp buildings and facilities.',
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      category: 'Residential',
      tech: ['Waterproofing', 'Thermal Insulation', 'GRP Lining'],
      location: 'Jebel Ali, Dubai',
      client: 'Multiple Clients',
      year: '2019',
      scope: 'Multiple Building Projects',
      liveLink: '#',
      detailsLink: '#'
    },
    {
      title: 'Cold Store & Office Complex',
      desc: 'Specialized thermal insulation and waterproofing for cold storage facility in Dubai.',
      img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      category: 'Industrial',
      tech: ['Thermal Insulation', 'Cold Storage', 'Waterproofing'],
      location: 'Al Qusais, Dubai',
      client: 'Space Max Contracting',
      year: '2019',
      scope: 'Cold Store Insulation',
      liveLink: '#',
      detailsLink: '#'
    },
    {
      title: 'Residential Tower Waterproofing',
      desc: 'Comprehensive waterproofing solutions for high-rise residential tower foundations and terraces.',
      img: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      category: 'Residential',
      tech: ['Membrane Waterproofing', 'Terrace', 'Foundation'],
      location: 'Dubai Marina',
      client: 'Private Developer',
      year: '2020',
      scope: 'Tower Waterproofing',
      liveLink: '#',
      detailsLink: '#'
    },
    {
      title: 'Industrial Tank Lining Project',
      desc: 'Chemical-resistant GRP lining for industrial storage tanks with specialized resin systems.',
      img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      category: 'Industrial',
      tech: ['Chemical Lining', 'GRP Coating', 'Tank Protection'],
      location: 'JAFZA, Dubai',
      client: 'Industrial Client',
      year: '2019',
      scope: 'Tank Lining System',
      liveLink: '#',
      detailsLink: '#'
    },
    {
      title: 'Green Roof System Installation',
      desc: 'Energy-efficient combo roofing system with 40% energy savings and 25-year warranty.',
      img: 'https://images.unsplash.com/photo-1486326658264-399238d01b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      category: 'Commercial',
      tech: ['Green Roof', 'Thermal Insulation', 'Energy Saving'],
      location: 'Business Bay, Dubai',
      client: 'Commercial Building',
      year: '2020',
      scope: 'Roof System Installation',
      liveLink: '#',
      detailsLink: '#'
    },
    {
      title: 'Mosque Waterproofing Project',
      desc: 'Complete waterproofing and GRP lining for mosque underground water tanks and facilities.',
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80',
      category: 'Institutional',
      tech: ['Waterproofing', 'GRP Lining', 'Tank Systems'],
      location: 'Nadd Al Hamar, Dubai',
      client: 'Mosque Committee',
      year: '2019',
      scope: 'Religious Building',
      liveLink: '#',
      detailsLink: '#'
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [slidesPerView, setSlidesPerView] = useState(3)

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1)
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(3)
      }
    }

    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  const totalSlides = Math.ceil(projects.length / slidesPerView)

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (hovered) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000)
    return () => clearInterval(interval)
  }, [hovered, totalSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Get current slide projects based on screen size
  const getCurrentSlideProjects = () => {
    const startIndex = currentSlide * slidesPerView;
    return projects.slice(startIndex, startIndex + slidesPerView);
  }

  // Smooth slide variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 sm:px-6 lg:px-8">
      {/* Enhanced Background Elements - Construction Theme */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Construction Pattern Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="constructionGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="constructionGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Construction Symbols */}
          <motion.path
            d="M20,30 L40,30 L40,50 L20,50 Z"
            stroke="url(#constructionGradient1)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.path
            d="M60,40 L80,40 L80,60 L60,60 Z"
            stroke="url(#constructionGradient2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 1 }}
          />

          {/* Construction Symbols */}
          {[...Array(8)].map((_, i) => (
            <motion.text
              key={i}
              x={15 + (i * 10)}
              y={20 + (i % 3) * 25}
              fontSize="4"
              fill="url(#constructionGradient1)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 0.8],
                y: [20 + (i % 3) * 25, 15 + (i % 3) * 25, 20 + (i % 3) * 25]
              }}
              transition={{ 
                duration: 4 + i * 0.5, 
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              {['🏗️', '🔧', '⚡', '🛠️', '🏢', '🌊', '🔄', '✅'][i]}
            </motion.text>
          ))}
        </svg>

        {/* Floating Construction Elements */}
        <motion.div
          className="absolute top-10 right-10% w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/15 rounded-lg rotate-12 blur-sm"
          animate={{
            y: [0, -20, 0],
            rotate: [12, 24, 12],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-15% w-6 h-6 md:w-12 md:h-12 bg-gradient-to-tr from-cyan-400/15 to-teal-400/20 rounded-full blur-sm"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/4 w-10 h-10 md:w-20 md:h-20 bg-gradient-to-br from-teal-400/15 to-blue-400/20 rounded-lg -rotate-12 blur-sm"
          animate={{
            y: [0, -15, 0],
            rotate: [-12, -24, -12],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Grid Pattern with Animation */}
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-br from-blue-300/10 to-cyan-300/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-tr from-cyan-300/10 to-teal-300/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100">
          <motion.path
            d="M10,50 Q50,30 90,50"
            stroke="url(#constructionGradient1)"
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.path
            d="M10,70 Q50,90 90,70"
            stroke="url(#constructionGradient2)"
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/80 backdrop-blur-xl shadow-lg ring-1 ring-white/50 mb-3 md:mb-4"
            >
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              </div>
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Our Portfolio
              </span>
            </motion.div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 md:mb-3">
              Completed <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto px-4">
              Showcasing our expertise in waterproofing, insulation, and construction solutions across Dubai and UAE
            </p>
          </div>
        </AnimatedSection>

        {/* Projects Slider */}
        <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Navigation Arrows - Wider positioning */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-xl shadow-lg border border-white/50 flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 hover:text-blue-700 transition-all duration-300 min-h-[40px]"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-xl shadow-lg border border-white/50 flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 hover:text-blue-700 transition-all duration-300 min-h-[40px]"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Main Projects Display */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                custom={currentSlide}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                className={`grid grid-cols-1 ${slidesPerView >= 2 ? 'md:grid-cols-2' : ''} ${slidesPerView >= 3 ? 'lg:grid-cols-3' : ''} gap-4 md:gap-6`}
              >
                {getCurrentSlideProjects().map((project, index) => (
                  <div
                    key={`${project.title}-${currentSlide}`}
                    className="relative rounded-xl md:rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                  >
                    {/* Enhanced Gradient Border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl md:rounded-2xl opacity-0 transition-all duration-500 blur-sm group-hover:opacity-100" />

                    <div className="relative bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-50/80 group-hover:via-white group-hover:to-cyan-50/80 h-full flex flex-col">
                      {/* Top Gradient Bar */}
                      <div className="h-1 md:h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 group-hover:from-blue-600 group-hover:to-cyan-600" />

                      {/* Image Section - Top */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={project.img}
                          alt={project.title}
                          className="w-full h-36 md:h-44 object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Category Badge with Gradient Text */}
                        <div className="absolute top-2 left-2 md:top-3 md:left-3">
                          <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-xs font-semibold ring-1 ring-slate-200/50 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Section - Bottom */}
                      <div className="p-3 md:p-4 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1 md:mb-2 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent">
                            {project.title}
                          </h3>
                          <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-2 md:mb-3 line-clamp-2">
                            {project.desc}
                          </p>

                          {/* Project Details */}
                          <div className="space-y-1 mb-3 md:mb-4">
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <Building className="h-3 w-3" />
                              <span className="font-medium">Client:</span>
                              <span>{project.client}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <MapPin className="h-3 w-3" />
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <Calendar className="h-3 w-3" />
                              <span>{project.year}</span>
                            </div>
                          </div>

                          {/* Tech Stack */}
                          <div className="mb-3 md:mb-4">
                            <h4 className="text-xs font-semibold text-slate-900 mb-1 md:mb-2 uppercase tracking-wide transition-colors duration-300 group-hover:text-blue-600">
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-1.5 py-1 md:px-2 md:py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium ring-1 ring-slate-200 transition-all duration-300 hover:scale-105 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:ring-blue-200"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons - Liquid Style */}
                        <div className="flex gap-1 md:gap-2 pt-2 md:pt-3 border-t border-slate-200/50">
                          {/* Liquid Details Button */}
                          <button className="group/btn relative flex-1 px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-white text-xs md:text-sm font-semibold transition-all duration-300 hover:scale-105 overflow-hidden flex items-center justify-center gap-1 min-h-[36px]">
                            {/* Background layers */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover/btn:from-blue-700 group-hover/btn:to-cyan-700 transition-all duration-300" />

                            {/* Liquid shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            {/* Text content */}
                            <Eye className="h-3 w-3 relative z-10" />
                            <span className="relative z-10">View Details</span>
                          </button>

                          {/* Liquid Gallery Button */}
                          <button className="group/btn relative flex-1 px-2 py-1.5 md:px-3 md:py-2 rounded-lg text-slate-700 text-xs md:text-sm font-semibold transition-all duration-300 hover:scale-105 overflow-hidden flex items-center justify-center gap-1 min-h-[36px]">
                            {/* Background layers */}
                            <div className="absolute inset-0 bg-slate-100 group-hover/btn:bg-slate-200 transition-all duration-300" />

                            {/* Liquid shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                            {/* Text content */}
                            <Building className="h-3 w-3 relative z-10" />
                            <span className="relative z-10">Gallery</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 md:mt-6 px-4">
            <div className="h-1 bg-slate-200/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: hovered ? "0%" : "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              />
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 md:mt-6 space-x-1 md:space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 min-h-[12px] ${index === currentSlide
                  ? 'w-6 md:w-8 bg-gradient-to-r from-blue-600 to-cyan-600 scale-110'
                  : 'w-2 md:w-3 bg-slate-300 hover:bg-blue-400 hover:scale-110'
                  } h-2 md:h-3`}
              >
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/20"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 md:mt-12 text-center"
        >
          <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-0.5 md:p-1">
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-xl md:rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">Have a Construction Project?</h3>
              <p className="text-white/80 text-sm mb-3 md:mb-4 max-w-2xl mx-auto">
                Let's protect your investment with our expert waterproofing and insulation solutions
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3">
                <button className="group/btn relative px-5 py-2 md:px-6 md:py-2.5 rounded-xl text-blue-600 font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 overflow-hidden min-h-[40px] w-full sm:w-auto">
                  {/* Background layers */}
                  <div className="absolute inset-0 bg-white group-hover/btn:bg-slate-100 transition-all duration-300" />

                  {/* Liquid shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  {/* Text content */}
                  <span className="relative z-10">Start Your Project</span>
                </button>
                <button className="group/btn relative px-5 py-2 md:px-6 md:py-2.5 rounded-xl border-2 border-white text-white font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 overflow-hidden min-h-[40px] w-full sm:w-auto">
                  {/* Liquid shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {/* Text content */}
                  <span className="relative z-10">View All Projects</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </section>
  )
}

export default ProjectsShowcase