'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  Home,
  Shield,
  Database,
  Building,
  SprayCan,
  Thermometer,
  ArrowRight,
  CheckCircle,
  Award,
  Star,
  MapPin,
  Droplets,
  Wrench,
  Clock,
  Zap,
  ShieldCheck
} from 'lucide-react'

const services = [
  {
    id: 'green-roof-system',
    title: 'Green Roof System (COMBO)',
    description: 'Comprehensive roofing system with 40% energy savings and 25-year leakage warranty. DCL certified Polyurethane Foam system.',
    icon: Home,
    color: 'from-green-600 to-emerald-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    features: ['40% Energy Savings', '25-Year Warranty', 'DCL Certified', 'Fast Curing'],
    badge: 'Popular',
    image: '/images/GRP.png',
  },
  {
    id: 'membrane-waterproofing',
    title: 'Membrane Waterproofing',
    description: 'Strong, flexible, tear-resistant membranes for terraces, balconies, basements, and water tanks.',
    icon: Shield,
    color: 'from-blue-600 to-cyan-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    features: ['20+ Year Lifespan', 'UV Resistant', 'Easy Installation', 'Weather Proof'],
    badge: 'Expert',
    image: '/images/Membrane.png'
  },
  {
    id: 'grp-lining',
    title: 'GRP Lining',
    description: 'Fiberglass reinforced plastic lining for corrosion resistance, structural strengthening, and waterproofing.',
    icon: Database,
    color: 'from-purple-600 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    features: ['Corrosion Resistant', 'Structural Strength', 'Chemical Proof', '70% Cost Savings'],
    badge: 'Industrial',
    image: '/images/GRPlining.png'
  },
  {
    id: 'cementitious-waterproofing',
    title: 'Cementitious Waterproofing',
    description: 'Permanent, practical long-life flexibility waterproofing system for foundations, roofs, pools, and façades.',
    icon: Building,
    color: 'from-gray-600 to-slate-600',
    bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50',
    features: ['Permanent Solution', 'Non-Toxic', 'Weather Resistant', 'Breathable'],
    badge: 'Versatile',
    image: '/images/WP.png'
  },
  {
    id: 'polyurea-coating',
    title: 'Polyurea Coating',
    description: 'Rapid-curing elastomeric coating system for waterproofing, deterioration protection, and containment.',
    icon: SprayCan,
    color: 'from-orange-600 to-red-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
    features: ['Rapid Curing', 'Seamless Application', 'Chemical Resistant', '30+ Year Track'],
    badge: 'Fast-Cure',
    image: '/images/PUC.png' // Using GRP.png as placeholder since no specific image provided
  },
  {
    id: 'thermal-insulation',
    title: 'Thermal Insulation',
    description: 'Energy-efficient insulation systems to reduce cooling costs in UAE climate. Mandatory for Dubai buildings.',
    icon: Thermometer,
    color: 'from-cyan-600 to-blue-600',
    bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-50',
    features: ['40% Cost Saving', 'Regulatory Compliance', 'Thermal Comfort', 'Condensation Control'],
    badge: 'Mandatory',
    image: '/images/ETI.png'
  },
  {
    id: 'external-insulation',
    title: 'External Insulation',
    description: 'Advanced external thermal insulation systems for building envelopes and facades.',
    icon: Thermometer,
    color: 'from-amber-600 to-orange-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    features: ['Energy Efficient', 'Weather Protection', 'Aesthetic Finish', 'Long Lasting'],
    badge: 'Premium',
    image: '/images/ExternaInsulatuion.png'
  },
  {
    id: 'injection-treatment',
    title: 'Injection Treatment',
    description: 'Professional injection treatments for cracks, joints, and structural waterproofing.',
    icon: Droplets,
    color: 'from-indigo-600 to-purple-600',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
    features: ['Deep Penetration', 'Structural Repair', 'Leakage Control', 'Non-Destructive'],
    badge: 'Specialized',
    image: '/images/IT.png'
  },
  {
    id: 'pile-head-treatment',
    title: 'Pile Head Treatment',
    description: 'Specialized waterproofing treatments for pile heads and foundation structures.',
    icon: Wrench,
    color: 'from-red-600 to-pink-600',
    bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
    features: ['Foundation Protection', 'Corrosion Prevention', 'Structural Integrity', 'Long Term Durability'],
    badge: 'Structural',
    image: '/images/PH.png'
  }
]

const features = [
  {
    icon: Award,
    title: 'DCL Certified',
    description: 'All materials Dubai Central Laboratory approved'
  },
  {
    icon: ShieldCheck,
    title: '25-Year Warranty',
    description: 'Comprehensive leakage protection guarantee'
  },
  {
    icon: Zap,
    title: 'Energy Efficient',
    description: 'Up to 40% reduction in cooling costs'
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: '24/7 emergency services across UAE'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-cyan-50/20 to-emerald-50/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimatedSection>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              >
                Our <span className="text-blue-600">Professional Services</span>
              </motion.h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
              >
                Comprehensive waterproofing and insulation solutions for residential, commercial, 
                and industrial projects across Dubai and UAE.
              </motion.p>
            </AnimatedSection>

            {/* Trust badges */}
            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                  <Award className="w-4 h-4 text-blue-600" /> DCL Certified
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500" /> 25-Year Warranty
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm">
                  <MapPin className="w-4 h-4 text-blue-600" /> UAE Wide Service
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Blue Seal?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Trusted by leading contractors and developers across the UAE for quality and reliability.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={0.1 * index}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl text-white mb-4 shadow-lg">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Professional Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive waterproofing and insulation solutions tailored for the UAE climate.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={0.1 * index}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Image */}
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        service.badge === 'Popular' 
                          ? 'bg-orange-500 text-white' 
                          : service.badge === 'Expert'
                          ? 'bg-blue-500 text-white'
                          : service.badge === 'Industrial'
                          ? 'bg-purple-500 text-white'
                          : service.badge === 'Mandatory'
                          ? 'bg-red-500 text-white'
                          : service.badge === 'Premium'
                          ? 'bg-amber-500 text-white'
                          : service.badge === 'Specialized'
                          ? 'bg-indigo-500 text-white'
                          : service.badge === 'Structural'
                          ? 'bg-red-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}>
                        {service.badge}
                      </span>
                    </div>

                    {/* Service Icon */}
                    <div className={`absolute bottom-4 left-4 p-3 rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/services/${service.id}`}
                      className="group inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get a free site assessment and detailed quotation from our waterproofing experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-blue-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
              >
                <MessageCircle className="h-5 w-5 mr-3" />
                Get Free Assessment
              </Link>
              
              <a
                href="tel:+97142270123"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-transparent hover:bg-white/10 transition-all duration-300 border-2 border-white"
              >
                <Phone className="h-5 w-5 mr-3" />
                Call +971 4 227 0123
              </a>
            </div>
            
            <div className="mt-8 text-blue-200 text-lg font-medium">
              Free Consultation • DCL Certified • Quality Guarantee
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

// Add missing icons
function MessageCircle(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}