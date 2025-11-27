'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Building, Home, Droplets, Thermometer, Zap, Wrench } from 'lucide-react'

const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
)

function ClientServices({
  services = [
    {
      icon: Shield,
      title: "Green Roof System",
      description: "Comprehensive roofing system combining waterproofing, thermal insulation and finishing with 40% energy savings and 25-year leakage warranty.",
      features: ["40% Energy Saving", "25 Years Warranty", "UV Protection", "Seamless Application"],
      color: "from-green-500 to-emerald-500",
      projects: 120,
      timeline: "2-4 weeks",
      technologies: ["Polyurethane Foam", "Acrylic Coating", "Geotextile Layer"],
      benefits: ["Energy Efficient", "Long Warranty", "Cost Effective"],
      image: "/api/placeholder/400/250"
    },
    {
      icon: Droplets,
      title: "Membrane Waterproofing",
      description: "High-performance waterproofing membranes for terraces, balconies, basements, and water tanks with excellent durability and flexibility.",
      features: ["Extreme Durability", "Weather Resistant", "Easy Repair", "Long Lifespan"],
      color: "from-blue-500 to-cyan-500",
      projects: 85,
      timeline: "1-3 weeks",
      technologies: ["Polymer Modified", "Torch Application", "Self-Adhesive"],
      benefits: ["Water Tight", "Flexible", "Durable"],
      image: "/api/placeholder/400/250"
    },
    {
      icon: Zap,
      title: "GRP Lining",
      description: "Glass Reinforced Plastic lining for water tanks, chemical tanks, and sewage systems providing corrosion resistance and structural strengthening.",
      features: ["Corrosion Resistant", "Chemical Proof", "Seamless Finish", "Structural Strength"],
      color: "from-purple-500 to-pink-500",
      projects: 65,
      timeline: "3-5 weeks",
      technologies: ["Fiberglass Mat", "Polyester Resin", "Gel Coat"],
      benefits: ["Chemical Resistance", "Long Life", "Cost Effective"],
      image: "/api/placeholder/400/250"
    },
    {
      icon: Thermometer,
      title: "Thermal Insulation",
      description: "Advanced thermal insulation systems for buildings, warehouses, and industrial applications reducing energy consumption and costs.",
      features: ["Energy Saving", "Condensation Control", "Sound Insulation", "Environmental Protection"],
      color: "from-orange-500 to-red-500",
      projects: 95,
      timeline: "2-4 weeks",
      technologies: ["EPS Boards", "XPS Boards", "Polyurethane"],
      benefits: ["Reduced Bills", "Comfort", "Moisture Control"],
      image: "/api/placeholder/400/250"
    },
    {
      icon: Building,
      title: "External Insulation System",
      description: "Complete exterior wall insulation and finishing system providing continuous insulation with design flexibility and aesthetic appeal.",
      features: ["High R-Value", "Design Flexibility", "Condensation Reduction", "Low Maintenance"],
      color: "from-indigo-500 to-blue-500",
      projects: 70,
      timeline: "4-6 weeks",
      technologies: ["EPS Insulation", "Reinforcement Mesh", "Base Coat"],
      benefits: ["Energy Efficient", "Aesthetic", "Durable"],
      image: "/api/placeholder/400/250"
    },
    {
      icon: Wrench,
      title: "Injection Treatment",
      description: "Professional concrete repair and protective coating solutions using injection systems for bridges, buildings, and water structures.",
      features: ["Crack Sealing", "Structural Integrity", "Water Tightness", "Long-term Protection"],
      color: "from-yellow-500 to-orange-500",
      projects: 55,
      timeline: "1-2 weeks",
      technologies: ["PU Injection", "Epoxy Coating", "High Pressure"],
      benefits: ["Structural Repair", "Leak Prevention", "Durable"],
      image: "/api/placeholder/400/250"
    },
    {
      icon: Home,
      title: "Pile Head Treatment",
      description: "Specialized waterproofing and protection system for pile heads under foundation slabs preventing water absorption and structural damage.",
      features: ["Chloride Protection", "Sulphate Resistance", "Waterproofing", "Structural Protection"],
      color: "from-teal-500 to-green-500",
      projects: 40,
      timeline: "2-3 weeks",
      technologies: ["Micro-concrete", "Hydrophilic Waterstop", "Epoxy Primer"],
      benefits: ["Foundation Protection", "Durability", "Waterproof"],
      image: "/api/placeholder/400/250"
    },
    {
      icon: Droplets,
      title: "Cementitious Waterproofing",
      description: "Permanent, flexible waterproofing system for foundations, pools, and water tanks with excellent bondability and chemical resistance.",
      features: ["Permanent Solution", "Abrasion Resistant", "Non-toxic", "Excellent Adhesion"],
      color: "from-gray-500 to-blue-500",
      projects: 75,
      timeline: "2-4 weeks",
      technologies: ["Cement Based", "Acrylic Polymer", "Liquid Applied"],
      benefits: ["Permanent", "Safe", "Versatile"],
      image: "/api/placeholder/400/250"
    }
  ]
}: {
  services?: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    features: string[];
    color: string;
    projects?: number;
    timeline?: string;
    technologies?: string[];
    benefits?: string[];
    image?: string;
  }>;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredServices = services.slice(0, Math.ceil(services.length / 3) * 3);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const slidesPerView = getSlidesPerView();
  const totalSlides = Math.ceil(filteredServices.length / slidesPerView);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides, isMobile]);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    })
  };

  const navigateToServices = () => {
    window.location.href = '/services';
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideServices = () => {
    const startIndex = currentSlide * slidesPerView;
    return filteredServices.slice(startIndex, startIndex + slidesPerView);
  };

  const getServiceImage = (serviceTitle: string) => {
    const serviceImages: { [key: string]: string } = {
      'Green Roof System': 'images/GRP.png',
      'Membrane Waterproofing': 'images/Membrane.png',
      'GRP Lining': 'images/GRPlining.png',
      'Thermal Insulation': 'images/ETI.png',
      'External Insulation': 'images/ExternaInsulatuion.png',
      'Injection Treatment': 'images/IT.png',
      'Pile Head Treatment': 'images/PH.png',
      'Cementitious Waterproofing': 'images/WP.png'
    };

    return serviceImages[serviceTitle] || '/api/placeholder/400/250';
  };

  const renderServiceCard = (service: (typeof services)[number], globalIndex: number) => (
    <motion.div
      key={`${service.title}-${globalIndex}`}
      variants={item}
      className="group transition-all duration-500 w-full"
      onMouseEnter={() => setHoveredCard(globalIndex)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="relative h-[500px] sm:h-[520px] rounded-2xl md:rounded-3xl border border-white/60 bg-white/95 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden hover:border-blue-200/50 w-full">
        {/* Animated Gradient Border */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl md:rounded-3xl opacity-0 transition-all duration-500 blur ${hoveredCard === globalIndex ? 'opacity-100 scale-105' : 'group-hover:opacity-100'
            }`}
        />

        <div
          className={`relative bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl h-full flex flex-col transition-all duration-300 ${hoveredCard === globalIndex
            ? 'bg-gradient-to-br from-blue-50/80 via-white to-cyan-50/80 border border-blue-100/50'
            : 'group-hover:bg-white'
            }`}
        >
          {/* Top Gradient Bar */}
          <div
            className={`h-2 bg-gradient-to-r transition-all duration-500 ${hoveredCard === globalIndex
              ? 'from-blue-600 to-cyan-600'
              : `${service.color} group-hover:from-blue-600 group-hover:to-cyan-600`
              }`}
          />

          <div className="relative p-4 md:p-6 flex-1 flex flex-col overflow-hidden">
            {/* Icon & Title */}
            <div className="flex items-start mb-4">
              <motion.div
                className={`p-3 rounded-xl text-white shadow-2xl bg-gradient-to-r transition-all duration-500 flex-shrink-0 ${hoveredCard === globalIndex
                  ? 'from-blue-600 to-cyan-600 scale-110'
                  : `${service.color} group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:scale-110`
                  }`}
                whileHover={{ rotate: 5 }}
              >
                <service.icon className="h-5 w-5 md:h-6 md:w-6" />
              </motion.div>
              <div className="ml-3 flex-1 min-w-0">
                <h3
                  className={`text-lg md:text-xl font-bold transition-all duration-300 ${hoveredCard === globalIndex
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
                    : 'text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text'
                    }`}
                >
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Main Image - Larger and More Prominent */}
            <div className="mb-4 flex-1 min-h-[200px] bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-xl md:rounded-2xl border-2 border-blue-100/60 flex items-center justify-center overflow-hidden group/image relative shadow-lg hover:shadow-xl transition-all duration-500">
              <img
                src={getServiceImage(service.title)}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
              <div className="absolute inset-0 -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full transform translate-y-2 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-500 delay-200 shadow-lg">
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {service.projects}+ Projects
                </span>
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-500" />
            </div>

            {/* Description */}
            <p
              className={`leading-relaxed mb-4 text-sm flex-1 min-h-[60px] transition-colors duration-300 ${hoveredCard === globalIndex
                ? 'text-gray-700'
                : 'text-gray-600 group-hover:text-gray-700'
                }`}
            >
              {service.description}
            </p>

            {/* Technologies as Tags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {(service.technologies || [])
                  .slice(0, 3)
                  .map((tech, techIndex) => (
                    <motion.div
                      key={`${tech}-${techIndex}-${globalIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: techIndex * 0.1 }}
                      className="relative"
                      onMouseEnter={() => setHoveredTech(tech + '-' + globalIndex)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <div
                        className={`
                          relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 
                          flex items-center justify-center min-w-[70px] overflow-hidden
                          ${hoveredTech === tech + '-' + globalIndex
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                            : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-blue-200 hover:bg-blue-50 hover:text-blue-700'
                          }
                        `}
                      >
                        <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="relative z-10 whitespace-nowrap">
                          {tech}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Footer with CTA */}
            <div
              className={`flex items-center justify-between pt-4 border-t mt-auto transition-colors duration-300 ${hoveredCard === globalIndex
                ? 'border-blue-200/50'
                : 'border-gray-200/50 group-hover:border-blue-200/50'
                }`}
            >
              <button
                onClick={navigateToServices}
                className={`inline-flex items-center font-semibold text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-300 group/link px-4 py-2 rounded-xl hover:bg-blue-50 flex-shrink-0 ${hoveredCard === globalIndex ? 'bg-blue-50' : ''
                  }`}
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </button>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>⭐</span>
                <span>{service.projects}+ Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 selection:bg-blue-100 selection:text-blue-700 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-200/25 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <AnimatedSection>
          <div className="text-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl ring-2 ring-white/60 mb-8"
            >
              <motion.div
                className="flex -space-x-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              </motion.div>
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-wider uppercase">
                Premium Waterproofing Solutions
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Expert <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Waterproofing</span> & <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">Insulation</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Protecting your property with advanced waterproofing technologies and premium insulation solutions.
              Trusted by hundreds of clients for durable, long-lasting results.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Services Slider/Carousel */}
        <div className="relative">
          {/* Mobile Slider */}
          {isMobile && (
            <>
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 hover:text-blue-700 transition-all duration-300 disabled:opacity-30 group min-h-[48px]"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 flex items-center justify-center text-blue-600 hover:bg-white hover:scale-110 hover:text-blue-700 transition-all duration-300 disabled:opacity-30 group min-h-[48px]"
                disabled={currentSlide === totalSlides - 1}
              >
                <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="overflow-hidden px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    custom={currentSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="w-full"
                  >
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 gap-6 w-full"
                    >
                      {getCurrentSlideServices().map((service, index) =>
                        renderServiceCard(service, currentSlide * slidesPerView + index),
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-3">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative rounded-full transition-all duration-500 ease-out min-h-[12px] ${index === currentSlide
                      ? 'w-8 bg-gradient-to-r from-blue-600 to-cyan-600 scale-110'
                      : 'w-3 bg-gray-300 hover:bg-blue-400 hover:scale-110'
                      } h-3`}
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
            </>
          )}

          {/* Desktop Marquee */}
          {!isMobile && (
            <div className="overflow-hidden px-4">
              <motion.div
                className="flex gap-8 w-max"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  duration: 40,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                {[...filteredServices, ...filteredServices].map((service, index) => (
                  <div
                    key={`marquee-${service.title}-${index}`}
                    className="w-[380px] flex-shrink-0"
                  >
                    {renderServiceCard(service, index)}
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {/* Technology Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Materials & Technologies
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We use only the highest quality materials and cutting-edge technologies for lasting protection
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              'Polyurethane Foam',
              'Acrylic Coatings',
              'GRP Lining',
              'Cementitious',
              'Membrane Systems',
              'EPS/XPS Boards',
              'Injection Grouting',
              'Polyurea Coating',
              'Geotextile Layers',
              'Waterproof Membranes',
              'Chemical Grouting',
              'Thermal Insulation'
            ].map((tech) => (
              <motion.div
                key={tech}
                className="relative"
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div
                  className={`
                    relative px-6 py-3 rounded-2xl text-base font-semibold transition-all duration-300 
                    flex items-center justify-center min-w-[140px] overflow-hidden
                    ${hoveredTech === tech
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl shadow-blue-600/30 scale-105'
                      : 'bg-white/90 backdrop-blur-md text-gray-700 ring-1 ring-gray-200/50 hover:ring-blue-200 hover:bg-blue-50 hover:text-blue-700'
                    }
                  `}
                >
                  <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10 whitespace-nowrap">{tech}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Protect Your Property?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a free consultation and quote for your waterproofing and insulation needs
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
              Get Free Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ClientServices