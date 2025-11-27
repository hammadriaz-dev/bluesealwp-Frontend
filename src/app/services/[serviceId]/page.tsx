'use client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { 
  ArrowLeft, 
  CheckCircle, 
  Calendar,
  Users,
  Shield,
  Zap,
  Clock,
  Star,
  MessageCircle,
  Phone,
  Rocket,
  ArrowRight,
  Globe,
  Target,
  TrendingUp,
  HeadphonesIcon,
  Mail,
  Database,
  Cloud,
  Palette,
  Search,
  Droplets,
  Home,
  Thermometer,
  Building,
  Wrench,
  SprayCan,
  ShieldCheck
} from 'lucide-react'


// Waterproofing service data from PDF
const serviceDetails: { [key: string]: any } = {
  'green-roof-system': {
    title: 'Green Roof System (COMBO)',
    description: 'Comprehensive roofing system combining waterproofing, thermal insulation, and finishing with 40% energy savings.',
    heroDescription: 'Our technically advanced Green Roof System provides perfect waterproofing with exceptional thermal insulation, saving 40% in energy costs while offering a 25-year leakage warranty.',
    icon: Home,
    color: 'from-green-600 to-emerald-600',
    bgColor: 'bg-gradient-to-br from-green-50 via-emerald-50/20 to-teal-50/20',
    iconColor: 'text-green-600',
    badge: 'Popular',
    
    features: [
      {
        title: 'Energy Efficient',
        description: '40% reduction in energy consumption with superior thermal insulation',
        icon: Zap
      },
      {
        title: '25-Year Warranty',
        description: 'Comprehensive leakage warranty for long-term protection',
        icon: ShieldCheck
      },
      {
        title: 'Quick Execution',
        description: 'Fast curing system with timely project completion',
        icon: Clock
      },
      {
        title: 'Perfect Finish',
        description: 'State-of-the-art spray technology for seamless application',
        icon: SprayCan
      }
    ],
    technologies: [
      { name: 'Polyurethane Foam', category: 'Insulation', icon: Thermometer },
      { name: 'Acrylic Waterproofing', category: 'Protection', icon: Droplets },
      { name: 'DCL Certified', category: 'Certification', icon: ShieldCheck },
      { name: 'Spray Application', category: 'Method', icon: SprayCan },
      { name: 'Geotextile Layer', category: 'Separation', icon: Building },
      { name: 'Polysulphide Sealants', category: 'Sealing', icon: Wrench }
    ],
    process: [
      {
        step: 'Surface Preparation',
        description: 'Thorough cleaning and preparation of roof slab surface',
        icon: Wrench
      },
      {
        step: 'PU Foam Application',
        description: 'Spray polyurethane foam to desired thickness for insulation',
        icon: SprayCan
      },
      {
        step: 'Waterproofing Layer',
        description: 'Apply liquid acrylic waterproofing with UV protection',
        icon: Droplets
      },
      {
        step: 'Water Testing',
        description: 'Comprehensive water test to ensure perfect sealing',
        icon: ShieldCheck
      },
      {
        step: 'Screeding & Finishing',
        description: 'Custom screed application with power float finishing',
        icon: Building
      },
      {
        step: 'Final Coating',
        description: 'Spray final acrylic waterproofing coat and curing',
        icon: SprayCan
      }
    ],
    benefits: [
      'Most efficient thermal insulation reducing electricity bills',
      'Quick and timely project execution and handover',
      '25-year warranty against any leakage',
      'State-of-the-art spray technology',
      'Easy repair and maintenance',
      'Thermal shock resistance and multilayer waterproofing'
    ],
    caseStudy: {
      title: 'Commercial Building Roof Transformation',
      result: 'Achieved 40% energy savings with perfect waterproofing integrity',
      metrics: [
        { value: '40%', label: 'Energy Savings' },
        { value: '25 Years', label: 'Leakage Warranty' },
        { value: '100%', label: 'Waterproofing' }
      ]
    }
  },
  'membrane-waterproofing': {
    title: 'Membrane Waterproofing',
    description: 'Strong, flexible, tear-resistant waterproofing membranes for various building applications.',
    heroDescription: 'Our membrane waterproofing solutions provide durable, weather-resistant protection that stretches to cover cracks and moves with your building, ensuring long-lasting water tightness.',
    icon: Shield,
    color: 'from-blue-600 to-cyan-600',
    bgColor: 'bg-gradient-to-br from-blue-50 via-cyan-50/20 to-sky-50/20',
    iconColor: 'text-blue-600',
    badge: 'Expert',
    features: [
      {
        title: 'Highly Durable',
        description: 'Strong and tear-resistant membranes with long lifespan',
        icon: ShieldCheck
      },
      {
        title: 'Flexible Protection',
        description: 'Elastic membranes that stretch to cover cracks and movements',
        icon: TrendingUp
      },
      {
        title: 'Easy Repair',
        description: 'Simple maintenance and repair when needed',
        icon: Wrench
      },
      {
        title: 'Weather Resistant',
        description: 'UV stable and resistant to extreme weather conditions',
        icon: Cloud
      }
    ],
    technologies: [
      { name: 'Bituminous Membranes', category: 'Material', icon: Shield },
      { name: 'Polycot Primer', category: 'Primer', icon: SprayCan },
      { name: 'Propane Torching', category: 'Application', icon: Thermometer },
      { name: 'Factory Rolls', category: 'Quality', icon: Building },
      { name: 'Overlap Sealing', category: 'Installation', icon: Wrench },
      { name: 'UV Protection', category: 'Durability', icon: Cloud }
    ],
    process: [
      {
        step: 'Surface Preparation',
        description: 'Clean, dry surface free from dust and protrusions',
        icon: Wrench
      },
      {
        step: 'Primer Application',
        description: 'Apply Polycot primer for optimal adhesion',
        icon: SprayCan
      },
      {
        step: 'Membrane Alignment',
        description: 'Precise alignment with proper overlap specifications',
        icon: Building
      },
      {
        step: 'Torching & Bonding',
        description: 'Heat application for perfect bonding to substrate',
        icon: Thermometer
      },
      {
        step: 'Sealing & Finishing',
        description: 'Complete sealing of overlaps and edges',
        icon: ShieldCheck
      }
    ],
    benefits: [
      'Extremely long lifespan with global quality standards',
      'Flexible enough to take any shape and turn up walls',
      'Easy to repair and maintain over time',
      'Weather resistant and UV stable',
      'Factory manufactured for quality control',
      'Suitable for terraces, balconies, basements, and more'
    ],
    caseStudy: {
      title: 'High-Rise Terrace Waterproofing',
      result: 'Perfect waterproofing achieved with 20+ years expected lifespan',
      metrics: [
        { value: '20+ Years', label: 'Expected Lifespan' },
        { value: '100%', label: 'Water Protection' },
        { value: '0', label: 'Maintenance Issues' }
      ]
    }
  },
  'grp-lining': {
    title: 'GRP Lining',
    description: 'Fiberglass reinforced plastic lining for corrosion resistance, structural strengthening, and waterproofing.',
    heroDescription: 'GRP Lining completely and seamlessly seals cracks, leaks, and corrosion, offering decades-long protection at a fraction of replacement cost while withstanding chemicals and high temperatures.',
    icon: Database,
    color: 'from-purple-600 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-purple-50 via-indigo-50/20 to-violet-50/20',
    iconColor: 'text-purple-600',
    badge: 'Expert',
    features: [
      {
        title: 'Corrosion Resistant',
        description: 'Withstands strong acids, chemicals, and high temperatures',
        icon: Shield
      },
      {
        title: 'Structural Strength',
        description: 'Reinforces and strengthens existing structures',
        icon: Building
      },
      {
        title: 'Seamless Protection',
        description: 'Complete sealing of cracks, leaks, and flaking materials',
        icon: Droplets
      },
      {
        title: 'Cost Effective',
        description: 'Fraction of the cost of total rebuild with long lifespan',
        icon: TrendingUp
      }
    ],
    technologies: [
      { name: 'Fiberglass Mat', category: 'Reinforcement', icon: Database },
      { name: 'Special Grade Resin', category: 'Matrix', icon: Droplets },
      { name: 'Surface Grinding', category: 'Preparation', icon: Wrench },
      { name: 'Lamination Process', category: 'Application', icon: SprayCan },
      { name: 'Chemical Resistance', category: 'Durability', icon: Shield },
      { name: 'Custom Thickness', category: 'Flexibility', icon: Building }
    ],
    process: [
      {
        step: 'Surface Grinding',
        description: 'Remove irregularities and create porous surface for bonding',
        icon: Wrench
      },
      {
        step: 'Dust Removal',
        description: 'Thorough cleaning with acetone to remove impurities',
        icon: SprayCan
      },
      {
        step: 'Resin Application',
        description: 'First coat application to fill all voids and prevent bubbles',
        icon: Droplets
      },
      {
        step: 'Fiberglass Lamination',
        description: 'Multiple CSM layers with resin impregnation',
        icon: Database
      },
      {
        step: 'Air Removal',
        description: 'Metallic roller use to remove air entrapment',
        icon: Building
      },
      {
        step: 'Final Curing',
        description: 'Top coat application on cured lamination',
        icon: ShieldCheck
      }
    ],
    benefits: [
      'Decades-long protection with routine maintenance',
      'Customizable resin components for specific requirements',
      'Withstands chemicals, water, corrosion, fungi, and algae',
      'Costs far less than replacing existing infrastructure',
      'Quick installation minimizing downtime',
      'Suitable for tanks, sumps, manholes, and industrial applications'
    ],
    caseStudy: {
      title: 'Industrial Tank Lining Project',
      result: 'Extended tank lifespan by 20+ years with complete corrosion protection',
      metrics: [
        { value: '20+ Years', label: 'Lifespan Extension' },
        { value: '100%', label: 'Corrosion Protection' },
        { value: '70%', label: 'Cost Savings' }
      ]
    }
  },
  'cementitious-waterproofing': {
    title: 'Cementitious Waterproofing',
    description: 'Permanent, practical long-life flexibility waterproofing system for foundations, roofs, pools, and façades.',
    heroDescription: 'Our cementitious waterproofing system offers versatile application with superior bondability to new and old surfaces, providing one-time waterproofing solution that breathes and fills cracks.',
    icon: Building,
    color: 'from-gray-600 to-slate-600',
    bgColor: 'bg-gradient-to-br from-gray-50 via-slate-50/20 to-stone-50/20',
    iconColor: 'text-gray-600',
    badge: 'Expert',
    features: [
      {
        title: 'Permanent Solution',
        description: 'One-time waterproofing with long-life flexibility',
        icon: ShieldCheck
      },
      {
        title: 'Non-Toxic',
        description: 'Safe for use in water tanks and containers',
        icon: Droplets
      },
      {
        title: 'Weather Resistant',
        description: 'Excellent resistance to UV rays and atmospheric pollution',
        icon: Cloud
      },
      {
        title: 'Breathable',
        description: 'Allows moisture vapor transmission while blocking water',
        icon: Building
      }
    ],
    technologies: [
      { name: 'Cement-Based Powder', category: 'Base', icon: Building },
      { name: 'Acrylic Resin', category: 'Binder', icon: Droplets },
      { name: 'Brush/Spray Application', category: 'Method', icon: SprayCan },
      { name: 'UV Resistance', category: 'Durability', icon: Cloud },
      { name: 'Crack Bridging', category: 'Performance', icon: Shield },
      { name: 'Alkalinity Resistant', category: 'Chemical', icon: ShieldCheck }
    ],
    process: [
      {
        step: 'Surface Preparation',
        description: 'Remove dust, dirt, oil, and foreign matter from surfaces',
        icon: Wrench
      },
      {
        step: 'Mixing Components',
        description: 'Precise mixing of powder and resin components',
        icon: Droplets
      },
      {
        step: 'Application',
        description: 'Brush, roller, or spray application method',
        icon: SprayCan
      },
      {
        step: 'Multiple Coats',
        description: 'Apply successive coats with proper drying time',
        icon: Building
      },
      {
        step: 'Curing',
        description: 'Proper curing for optimal performance',
        icon: ShieldCheck
      }
    ],
    benefits: [
      'Provides one-time permanent waterproofing solution',
      'Abrasion and scuff resistant for high-traffic areas',
      'Non-toxic and safe for potable water applications',
      'Excellent weather resistance and inherent adhesiveness',
      'Breathes and fills cracks in application surfaces',
      'Versatile application on all building surfaces'
    ],
    caseStudy: {
      title: 'Swimming Pool Waterproofing',
      result: 'Perfect waterproofing achieved with non-toxic, durable protection',
      metrics: [
        { value: '100%', label: 'Waterproofing' },
        { value: 'Non-Toxic', label: 'Safety Certified' },
        { value: '10+ Years', label: 'Durability' }
      ]
    }
  },
  'polyurea-coating': {
    title: 'Polyurea Coating',
    description: 'Rapid-curing elastomeric coating system for waterproofing, deterioration protection, and containment.',
    heroDescription: 'Polyurea coating offers extremely fast reaction and cure times with seamless, jointless application that maintains flexibility while providing excellent adhesion to various substrates.',
    icon: SprayCan,
    color: 'from-orange-600 to-red-600',
    bgColor: 'bg-gradient-to-br from-orange-50 via-red-50/20 to-amber-50/20',
    iconColor: 'text-orange-600',
    badge: 'Trending',
    features: [
      {
        title: 'Rapid Curing',
        description: 'Extremely fast reaction and almost immediate return-to-service',
        icon: Clock
      },
      {
        title: 'Seamless Application',
        description: 'Jointless coating that maintains flexibility',
        icon: Shield
      },
      {
        title: 'Excellent Adhesion',
        description: 'Strong bond to concrete, steel, wood, and plastics',
        icon: Building
      },
      {
        title: 'Chemical Resistant',
        description: 'Withstands fuels, chemicals, and toxic substances',
        icon: Droplets
      }
    ],
    technologies: [
      { name: 'Two-Component System', category: 'Chemistry', icon: Droplets },
      { name: 'High-Pressure Spray', category: 'Application', icon: SprayCan },
      { name: 'Elastomeric Properties', category: 'Performance', icon: Shield },
      { name: '100% Solids', category: 'Environment', icon: Cloud },
      { name: 'UV Resistance', category: 'Durability', icon: Sun },
      { name: 'Various Thickness', category: 'Flexibility', icon: Building }
    ],
    process: [
      {
        step: 'Surface Preparation',
        description: 'Proper cleaning and preparation of substrate',
        icon: Wrench
      },
      {
        step: 'Equipment Setup',
        description: 'High-pressure plural component spray equipment',
        icon: SprayCan
      },
      {
        step: 'Component Mixing',
        description: 'Precise mixing of A and B components',
        icon: Droplets
      },
      {
        step: 'Spray Application',
        description: 'Even application to required thickness',
        icon: Cloud
      },
      {
        step: 'Rapid Curing',
        description: 'Almost immediate curing and return to service',
        icon: Clock
      }
    ],
    benefits: [
      'Extremely fast reaction and cure times',
      'Excellent adhesion to various substrates',
      'Seamless and jointless coating maintaining flexibility',
      '100% solids with no solvents or catalysts',
      'UV, atmospheric, and salt water resistance',
      'Wide choice of colors and thermal resistance'
    ],
    caseStudy: {
      title: 'Industrial Floor Coating Project',
      result: 'Completed 10,000 sqft in 2 days with immediate return to service',
      metrics: [
        { value: '2 Days', label: 'Project Duration' },
        { value: '10,000 sqft', label: 'Area Covered' },
        { value: '0', label: 'Downtime Days' }
      ]
    }
  },
  'thermal-insulation': {
    title: 'Thermal Insulation',
    description: 'Energy-efficient insulation systems to reduce cooling costs and create comfortable living conditions.',
    heroDescription: 'Our thermal insulation systems play an essential role in improving cooling conditions inside buildings, positively reflecting on power consumption and creating thermal comfort while protecting against intense thermal stress.',
    icon: Thermometer,
    color: 'from-cyan-600 to-blue-600',
    bgColor: 'bg-gradient-to-br from-cyan-50 via-blue-50/20 to-sky-50/20',
    iconColor: 'text-cyan-600',
    badge: 'Popular',
    features: [
      {
        title: 'Energy Saving',
        description: 'Significant reduction in heating and cooling costs',
        icon: TrendingUp
      },
      {
        title: 'Thermal Comfort',
        description: 'Creates optimal thermal comfort conditions',
        icon: Home
      },
      {
        title: 'Condensation Control',
        description: 'Prevents condensation on building elements',
        icon: Droplets
      },
      {
        title: 'Environmental',
        description: 'Reduces energy consumption and environmental impact',
        icon: Cloud
      }
    ],
    technologies: [
      { name: 'Insulation Boards', category: 'Material', icon: Building },
      { name: 'Spray Foam', category: 'Application', icon: SprayCan },
      { name: 'UV Resistant Coatings', category: 'Protection', icon: Shield },
      { name: 'Fibrous Materials', category: 'Type', icon: Database },
      { name: 'R-Value Optimization', category: 'Performance', icon: Thermometer },
      { name: 'Sound Insulation', category: 'Bonus', icon: HeadphonesIcon }
    ],
    process: [
      {
        step: 'Assessment',
        description: 'Evaluate building requirements and thermal needs',
        icon: Search
      },
      {
        step: 'Material Selection',
        description: 'Choose appropriate insulation materials and systems',
        icon: Building
      },
      {
        step: 'Surface Preparation',
        description: 'Prepare surfaces for optimal insulation application',
        icon: Wrench
      },
      {
        step: 'Installation',
        description: 'Professional installation of insulation systems',
        icon: SprayCan
      },
      {
        step: 'Quality Check',
        description: 'Verify insulation effectiveness and coverage',
        icon: ShieldCheck
      },
      {
        step: 'Protective Coating',
        description: 'Apply protective coatings where required',
        icon: Shield
      }
    ],
    benefits: [
      'Reduced heating and cooling costs significantly',
      'Creation of optimal thermal comfort conditions',
      'Avoidance of condensation on building elements',
      'Reduced possibility of moisture inside building elements',
      'Protection from intense thermal stress',
      'Additional sound insulation benefits'
    ],
    caseStudy: {
      title: 'Commercial Building Insulation',
      result: 'Achieved 40% reduction in cooling costs with improved comfort',
      metrics: [
        { value: '40%', label: 'Cost Reduction' },
        { value: '100%', label: 'Client Satisfaction' },
        { value: '5 Stars', label: 'Energy Rating' }
      ]
    }
  }
}

interface ServicePageProps {
  params: Promise<{
    serviceId: string
  }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceId } = await params
  const service = serviceDetails[serviceId]

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className={`relative py-16 md:py-24 ${service.bgColor} overflow-hidden`}>
        {/* Water-themed Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl" />
          {/* Water wave pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(59,130,246,0.03)_95%)] bg-[size:100%_40px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <AnimatedSection>
            <Link 
              href="/services" 
              className="group inline-flex items-center text-gray-600 hover:text-blue-700 mb-8 md:mb-12 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Services</span>
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Content */}
            <AnimatedSection delay={0.1}>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center space-x-4 md:space-x-6">
                  <div className={`relative p-4 md:p-5 rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-2xl shadow-blue-500/30`}>
                    <service.icon className="h-8 w-8 md:h-10 md:w-10" />
                    {/* Badge */}
                    <div className="absolute -top-2 -right-2">
                      <span className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-bold ${
                        service.badge === 'Popular' 
                          ? 'bg-orange-500 text-white' 
                          : service.badge === 'Trending'
                          ? 'bg-blue-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}>
                        {service.badge}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      {service.title}
                    </h1>
                    <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mt-3 md:mt-4" />
                  </div>
                </div>

                <p className="text-lg md:text-2xl text-gray-700 leading-relaxed font-light">
                  {service.heroDescription}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-6 py-4 md:px-10 md:py-5 text-base md:text-xl font-bold rounded-2xl overflow-hidden shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-700 transition-all duration-300" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    {/* Text content */}
                    <span className="relative z-10 text-white flex items-center">
                      Get Free Quote
                      <Rocket className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  
                  <a
                    href="#process"
                    className="group inline-flex items-center justify-center px-6 py-4 md:px-10 md:py-5 text-base md:text-xl font-bold rounded-2xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 border-2 border-gray-300 hover:border-blue-300 hover:text-blue-700 shadow-lg hover:shadow-xl"
                  >
                    Learn Process
                    <ArrowRight className="ml-2 md:ml-3 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Visual */}
            <AnimatedSection delay={0.2}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="w-64 h-64 md:w-96 md:h-96 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl flex items-center justify-center border border-white/60">
                    <service.icon className={`h-32 w-32 md:h-64 md:w-64 ${service.iconColor} opacity-20`} />
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className={`absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-gradient-to-r ${service.color} text-white px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-2xl`}
                  >
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <Star className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="font-bold text-sm md:text-base">Certified</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                    className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white/90 backdrop-blur-xl px-3 py-2 md:px-4 md:py-2 rounded-2xl shadow-2xl border border-white/60"
                  >
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <ShieldCheck className="h-3 w-3 md:h-4 md:w-4 text-green-500" />
                      <span className="font-semibold text-gray-700 text-xs md:text-sm">Guaranteed</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Enhanced Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {/* Description */}
            <AnimatedSection>
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                    Service Overview
                  </h2>
                  <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" />
                </div>
                
                <p className="text-base md:text-xl text-gray-700 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Key Benefits:</h3>
                  <div className="grid gap-3 md:gap-4">
                    {service.benefits.map((benefit: string, index: number) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-start p-3 md:p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:from-blue-50/30 hover:to-cyan-50/30 transition-all duration-300 border border-gray-200/50 hover:border-blue-200/50"
                      >
                        <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm md:text-lg text-gray-700 font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Key Features */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Key Features</h3>
                  <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" />
                </div>
                
                <div className="grid gap-4 md:gap-6">
                  {service.features.map((feature: any, index: number) => (
                    <motion.div
                      key={feature.title}
                      whileHover={{ scale: 1.02, y: -3 }}
                      className="flex items-start space-x-4 md:space-x-6 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 hover:from-blue-50/20 hover:to-cyan-50/20 transition-all duration-300 border border-gray-200/50 hover:border-blue-200/50 shadow-lg hover:shadow-xl"
                    >
                      <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-r ${service.color} text-white shadow-lg flex-shrink-0`}>
                        <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Enhanced Technologies Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-cyan-50/20 to-sky-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Technologies & Materials
              </h2>
              <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                We use industry-leading materials and application techniques to ensure 
                durable, reliable, and long-lasting waterproofing solutions.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {service.technologies.map((tech: any, index: number) => (
              <AnimatedSection key={tech.name} delay={0.1 * index}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${service.color} rounded-2xl text-white mb-4 md:mb-6 shadow-lg`}>
                    <tech.icon className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">
                    {tech.name}
                  </h3>
                  <span className="text-xs md:text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-blue-200">
                    {tech.category}
                  </span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process Section */}
      <section id="process" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Our Process
              </h2>
              <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                A systematic approach that ensures quality, precision, and successful 
                project completion from initial assessment to final inspection.
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Enhanced Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-gradient-to-b from-blue-500 to-cyan-500 h-full hidden lg:block rounded-full"></div>
            
            <div className="space-y-12 md:space-y-16 lg:space-y-0">
              {service.process.map((step: any, index: number) => (
                <AnimatedSection key={step.step} delay={0.1 * index}>
                  <div className={`relative flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}>
                    {/* Content */}
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'} mb-8 lg:mb-0`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/60 hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="flex items-center mb-4 md:mb-6">
                          <div className={`p-3 md:p-4 rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg mr-4 md:mr-6`}>
                            <step.icon className="h-5 w-5 md:h-6 md:w-6" />
                          </div>
                          <div>
                            <div className="text-xs md:text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 md:px-3 md:py-1 rounded-full mb-1 md:mb-2">
                              Step {index + 1}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                              {step.step}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Enhanced Step marker */}
                    <div className="flex-shrink-0 relative lg:absolute left-1/2 transform -translate-x-1/2">
                      <div className={`w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r ${service.color} rounded-full border-4 border-white shadow-2xl`}></div>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-blue-500/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="lg:w-1/2 hidden lg:block"></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Case Study Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50/30 via-cyan-50/20 to-sky-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-12 border border-white/60">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Content */}
                <div className="space-y-6 md:space-y-8">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs md:text-sm font-bold shadow-lg">
                    <Star className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Success Story
                  </div>
                  
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {service.caseStudy.title}
                  </h2>
                  
                  <p className="text-lg md:text-2xl text-gray-700 leading-relaxed">
                    {service.caseStudy.result}
                  </p>

                  <div className="grid grid-cols-3 gap-4 md:gap-6">
                    {service.caseStudy.metrics.map((metric: any, index: number) => (
                      <div key={index} className="text-center p-3 md:p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 shadow-lg border border-white/60">
                        <div className={`text-xl md:text-3xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-1 md:mb-2`}>
                          {metric.value}
                        </div>
                        <div className="text-xs md:text-sm font-semibold text-gray-600">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className={`w-48 h-48 md:w-80 md:h-80 ${service.bgColor} rounded-3xl flex items-center justify-center shadow-2xl border border-white/60`}>
                      <service.icon className={`h-24 w-24 md:h-48 md:w-48 ${service.iconColor} opacity-20`} />
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className={`absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-gradient-to-r ${service.color} text-white px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-2xl`}
                    >
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <Rocket className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="font-bold text-xs md:text-sm">Proven Results</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-40 h-40 md:w-80 md:h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 leading-tight">
              Ready to Protect Your Property?
            </h2>
            <p className="text-base md:text-xl text-blue-100 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Contact us for a free consultation and let our experts provide you with 
              the perfect waterproofing solution tailored to your specific needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-6 text-base md:text-xl font-bold rounded-2xl overflow-hidden shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                {/* Background layers */}
                <div className="absolute inset-0 bg-white group-hover:bg-gray-50 transition-all duration-300" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-blue-50 to-transparent" />
                
                {/* Text content */}
                <span className="relative z-10 text-blue-600 flex items-center">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                  Get Free Consultation
                </span>
              </Link>
              
              <a
                href="tel:+97142270123"
                className="group inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-6 text-base md:text-xl font-bold rounded-2xl text-white bg-transparent hover:bg-white/10 transition-all duration-300 border-2 border-white shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <Phone className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                Call +971 4 227 0123
              </a>
            </div>
            
            <div className="mt-6 md:mt-8 text-blue-200 text-sm md:text-lg font-medium">
              Free Site Assessment • Detailed Quotation • Quality Guarantee
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

// Add missing Sun icon component
function Sun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}