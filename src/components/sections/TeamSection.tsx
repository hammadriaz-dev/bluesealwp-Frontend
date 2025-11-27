'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Building, Users, FileText, Phone, Mail } from 'lucide-react'

interface TeamMember {
  name: string;
  role: string;
  img: string;
  color: string;
  department: string;
  experience: string;
  qualifications: string[];
  contact: {
    phone: string;
    email: string;
  };
}

const defaultTeam: TeamMember[] = [
  {
    name: 'Managing Director',
    role: 'Managing Director',
    img: '/images/management-director.jpg',
    color: 'from-blue-500 to-cyan-500',
    department: 'Executive Management',
    experience: '25+ Years in Construction',
    qualifications: ['Civil Engineering', 'Project Management', 'Business Administration'],
    contact: {
      phone: '+971 4 227 0123',
      email: 'director@blueseal.ac'
    }
  },
  {
    name: 'Operations Manager',
    role: 'Operations Manager',
    img: '/images/operations-manager.jpg',
    color: 'from-cyan-500 to-blue-500',
    department: 'Operations',
    experience: '18+ Years in Waterproofing',
    qualifications: ['Mechanical Engineering', 'Quality Control', 'Safety Management'],
    contact: {
      phone: '+971 4 227 0123',
      email: 'operations@blueseal.ac'
    }
  },
  {
    name: 'HR & Admin Manager',
    role: 'HR & Admin Manager',
    img: '/images/hr-manager.jpg',
    color: 'from-blue-500 to-teal-500',
    department: 'Human Resources',
    experience: '15+ Years in HR Management',
    qualifications: ['Human Resources', 'Administration', 'Labor Law'],
    contact: {
      phone: '+971 4 227 0123',
      email: 'hr@blueseal.ac'
    }
  },
  {
    name: 'Sales Manager',
    role: 'Sales Manager',
    img: '/images/sales-manager.jpg',
    color: 'from-teal-500 to-blue-500',
    department: 'Sales & Business Development',
    experience: '12+ Years in Construction Sales',
    qualifications: ['Business Development', 'Client Relations', 'Market Strategy'],
    contact: {
      phone: '+971 4 227 0123',
      email: 'sales@blueseal.ac'
    }
  },
  {
    name: 'Project Manager',
    role: 'Project Manager',
    img: '/images/project-manager.jpg',
    color: 'from-blue-500 to-cyan-500',
    department: 'Project Management',
    experience: '20+ Years in Construction',
    qualifications: ['Civil Engineering', 'Project Planning', 'Site Management'],
    contact: {
      phone: '+971 4 227 0123',
      email: 'projects@blueseal.ac'
    }
  },
  {
    name: 'Site Engineer',
    role: 'Senior Site Engineer',
    img: '/images/site-engineer.jpg',
    color: 'from-cyan-500 to-blue-500',
    department: 'Technical & Engineering',
    experience: '10+ Years in Waterproofing',
    qualifications: ['Civil Engineering', 'Technical Supervision', 'Quality Assurance'],
    contact: {
      phone: '+971 4 227 0123',
      email: 'engineering@blueseal.ac'
    }
  },
]

// Contact icons component
interface ContactIconsProps {
  contact: {
    phone: string;
    email: string;
  };
  direction?: 'vertical' | 'horizontal';
  isVisible?: boolean;
}

const ContactIcons = ({
  contact,
  direction = 'vertical',
  isVisible = false,
}: ContactIconsProps) => (
  <motion.div
    className={`flex ${
      direction === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-3'
    }`}
    initial={{ opacity: 0, x: direction === 'vertical' ? -20 : 0, y: direction === 'vertical' ? 0 : 20 }}
    animate={{
      opacity: isVisible ? 1 : 0,
      x: isVisible ? 0 : direction === 'vertical' ? -20 : 0,
      y: isVisible ? 0 : direction === 'vertical' ? 0 : 20,
    }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <motion.a
      href={`tel:${contact.phone}`}
      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-xl shadow-lg"
      whileHover={{ scale: 1.1, y: -2 }}
      initial={{ scale: 0 }}
      animate={{ scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Phone className="w-5 h-5 text-blue-600" />
    </motion.a>
    
    <motion.a
      href={`mailto:${contact.email}`}
      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-xl shadow-lg"
      whileHover={{ scale: 1.1, y: -2 }}
      initial={{ scale: 0 }}
      animate={{ scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Mail className="w-5 h-5 text-cyan-600" />
    </motion.a>
  </motion.div>
)

export default function TeamSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const team = defaultTeam
  const totalSlides = Math.ceil(team.length / slidesPerView)

  useEffect(() => {
    const updateSlidesPerView = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
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

  useEffect(() => {
    if (totalSlides <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides)
    }, 4000)
    return () => clearInterval(interval)
  }, [totalSlides])

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % totalSlides)
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)

  const getCurrentSlideMembers = () => {
    const startIndex = currentSlide * slidesPerView
    return team.slice(startIndex, startIndex + slidesPerView)
  }

  const openProfile = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const closeProfile = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMember(null), 200)
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50/40 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/25 to-cyan-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/25 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400/30 to-cyan-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-white/60 mb-6 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1"
          >
            <div className="flex space-x-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                animate={{ scale: [1.5, 1, 1.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-wider">
              LEADERSHIP TEAM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Management Team
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Experienced professionals dedicated to delivering exceptional waterproofing and insulation solutions across Dubai and UAE
          </motion.p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          {/* Arrows */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={prevSlide}
            className="absolute -left-6 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 hover:text-blue-700 hover:shadow-3xl transition-all duration-300 group"
          >
            <ChevronLeft className="h-6 w-6 md:h-7 md:w-7 group-hover:-translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={nextSlide}
            className="absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 hover:text-blue-700 hover:shadow-3xl transition-all duration-300 group"
          >
            <ChevronRight className="h-6 w-6 md:h-7 md:w-7 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Slides */}
          <div className="overflow-hidden px-4 sm:px-6 md:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className={`grid grid-cols-1 ${
                  slidesPerView >= 2 ? 'md:grid-cols-2' : ''
                } ${slidesPerView >= 3 ? 'lg:grid-cols-3' : ''} gap-10 md:gap-14`}
              >
                {getCurrentSlideMembers().map((member, index) => {
                  const globalIndex = currentSlide * slidesPerView + index

                  return (
                    <motion.div
                      key={`${member.name}-${currentSlide}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex flex-col items-center text-center relative"
                      onMouseEnter={() => !isMobile && setHoveredMember(globalIndex)}
                      onMouseLeave={() => !isMobile && setHoveredMember(null)}
                    >
                      {/* Avatar wrapper with padding so circle never clips */}
                      <div className="relative mb-6 group px-4 pt-4 pb-2">
                        {/* Vertical contact icons (desktop) */}
                        <div className="hidden md:block absolute -left-20 top-1/2 -translate-y-1/2 z-20">
                          <ContactIcons
                            contact={member.contact}
                            direction="vertical"
                            isVisible={hoveredMember === globalIndex && !isMobile}
                          />
                        </div>

                        {/* Centered glow behind avatar */}
                        <motion.div className="relative inline-flex items-center justify-center">
                          <motion.div
                            className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white shadow-2xl overflow-visible bg-white"
                            whileHover={!isMobile ? { scale: 1.06, translateY: -2 } : {}}
                            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                          >
                            {/* Glow layer - stays perfectly centered */}
                            <motion.div
                              className="absolute inset-0 -z-10 rounded-full pointer-events-none flex items-center justify-center"
                              initial={false}
                              animate={
                                hoveredMember === globalIndex && !isMobile
                                  ? { scale: 1.15, opacity: 0.22 }
                                  : { scale: 1, opacity: 0 }
                              }
                              transition={{ duration: 0.4, ease: 'easeOut' }}
                            >
                              <div
                                className={`w-full h-full rounded-full bg-gradient-to-r ${member.color} blur-xl`}
                              />
                            </motion.div>

                            <img
                              src={member.img}
                              alt={member.name}
                              className="w-full h-full rounded-full object-cover"
                              loading="lazy"
                            />
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Name / role / button */}
                      <div className="space-y-3 mb-4">
                        <motion.h3
                          className="text-2xl md:text-3xl font-bold text-slate-900"
                          whileHover={{ scale: 1.03 }}
                        >
                          {member.name}
                        </motion.h3>

                        {/* Department and Experience */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                            <Building className="w-4 h-4" />
                            <span>{member.department}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                            <Users className="w-4 h-4" />
                            <span>{member.experience}</span>
                          </div>
                        </div>

                        {/* View Profile button */}
                        <button
                          type="button"
                          onClick={() => openProfile(member)}
                          className="relative inline-flex items-center justify-center px-4 py-2 rounded-full text-sm md:text-base font-semibold text-slate-900 bg-white/90 border border-blue-100 shadow-lg shadow-blue-500/10 overflow-hidden group"
                        >
                          {/* shimmer layer */}
                          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/15 via-cyan-500/20 to-teal-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="pointer-events-none absolute inset-0 -skew-x-12 -translate-x-full bg-white/40 group-hover:translate-x-full transition-transform duration-700" />
                          <span className="relative flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm" />
                            <span>View Profile</span>
                          </span>
                        </button>
                      </div>

                      {/* Mobile contact icons (horizontal) */}
                      {isMobile && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                          className="mt-2"
                        >
                          <ContactIcons
                            contact={member.contact}
                            direction="horizontal"
                            isVisible={true}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-10 space-x-3"
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative rounded-full transition-all duration-500 transform hover:scale-125 ${
                  index === currentSlide
                    ? 'w-8 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/30'
                    : 'w-3 bg-slate-300 hover:bg-slate-400'
                } h-3`}
              >
                {index === currentSlide && (
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
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMember && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
              onClick={closeProfile}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <button
                type="button"
                className="absolute top-3 right-3 rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                onClick={closeProfile}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 rounded-full border-2 border-blue-100 overflow-hidden shadow-lg">
                  <img
                    src={selectedMember.img}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {selectedMember.name}
                  </h3>
                  <p className="text-lg font-semibold text-blue-600">
                    {selectedMember.role}
                  </p>
                  <p className="text-sm text-slate-500">
                    {selectedMember.department}
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                  <Users className="w-4 h-4" />
                  <span>{selectedMember.experience}</span>
                </div>
              </div>

              {/* Qualifications */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Qualifications & Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.qualifications.map((qualification, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-medium border border-cyan-200"
                    >
                      {qualification}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-slate-200 pt-4 mt-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <a href={`tel:${selectedMember.contact.phone}`} className="text-slate-700 hover:text-blue-600 transition-colors">
                      {selectedMember.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cyan-600" />
                    <a href={`mailto:${selectedMember.contact.email}`} className="text-slate-700 hover:text-cyan-600 transition-colors">
                      {selectedMember.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}