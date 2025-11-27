'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Heart, 
  Zap,
  TrendingUp,
  Shield,
  Clock,
  Star,
  Rocket,
  Lightbulb,
  CheckCircle,
  Droplets,
  Home,
  ShieldCheck,
  Thermometer,
  Building
} from 'lucide-react'

export default function About() {
  const stats = [
    { number: '50+', label: 'Projects Completed', icon: Building },
    { number: '10+', label: 'Years Experience', icon: Clock },
    { number: '100%', label: 'Quality Guarantee', icon: ShieldCheck },
    { number: '25+', label: 'Team Members', icon: Users }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Our primary concern is safety. We implement comprehensive risk assessments and coordinated safety actions in all projects.'
    },
    {
      icon: Zap,
      title: 'Quality Excellence',
      description: 'We deliver unsurpassed levels of service using top-quality materials and proven waterproofing technologies.'
    },
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'We provide tailored waterproofing solutions that perfectly match the specific requirements of your property.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We continuously expand our product range and adopt advanced technologies to protect buildings and infrastructure.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our skilled workforce comes with years of experience in building and construction industry projects.'
    },
    {
      icon: Droplets,
      title: 'Waterproofing Specialists',
      description: 'Well-versed in every feature of waterproofing installation with comprehensive combination solutions.'
    }
  ]

  const services = [
    {
      name: 'Green Roof System (COMBO)',
      description: 'Comprehensive system with 40% energy savings and 25-year leakage warranty',
      features: ['Energy Efficient', 'Perfect Waterproofing', 'Cost Effective']
    },
    {
      name: 'Membrane Waterproofing',
      description: 'Strong, flexible, tear-resistant membranes for various building applications',
      features: ['Durable', 'Weather Resistant', 'Long Life Span']
    },
    {
      name: 'GRP Lining',
      description: 'Fiberglass lining for corrosion resistance and structural strengthening',
      features: ['Chemical Resistant', 'Seamless Protection', 'Cost Effective']
    },
    {
      name: 'Cementitious Waterproofing',
      description: 'Permanent, flexible system for foundations, roofs, pools, and façades',
      features: ['Non-Toxic', 'UV Resistant', 'Breathable']
    },
    {
      name: 'Polyurea Coating',
      description: 'Rapid-curing elastomeric coating for various industrial applications',
      features: ['Fast Curing', 'Seamless', 'Chemical Resistant']
    },
    {
      name: 'Thermal Insulation',
      description: 'Energy-efficient insulation systems to reduce cooling costs',
      features: ['Energy Saving', 'Cost Effective', 'Environmental']
    }
  ]

  const certifications = [
    'Dubai Municipality Approved',
    'Sharjah Municipality Certified',
    'Trakhees Approved',
    'DCL Certified',
    'BASF Approved Applicator'
  ]

  return (
    <div className="space-y-20 py-12">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50/30 to-sky-50/30">
        {/* Water-themed background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-sky-100/15 rounded-full blur-3xl animate-float" />
          
          {/* Water wave pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(59,130,246,0.03)_95%)] bg-[size:100%_40px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <AnimatedSection>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Droplets className="h-6 w-6" />
                    <span className="text-sm font-semibold">LEADING WATERPROOFING CONTRACTORS</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                    About <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">Blue Seal</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                    Blue Seal is proud to be one of the leading combination insulation and 
                    waterproofing contractors in Dubai, delivering unsurpassed levels of 
                    customer service since our inception.
                  </p>

                  <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                    We are well-versed in every feature of waterproofing installation, 
                    protecting your property using tailored combination waterproofing 
                    and insulation solutions that meet individual characteristics.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="bg-white/80 backdrop-blur-xl rounded-xl p-4 shadow-sm border border-white/60 text-center"
                    >
                      <stat.icon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-xs text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Waterproofing Visual */}
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/60">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-2xl text-blue-600 mb-4">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Quality Guarantee
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      Our combination insulation and waterproofing contractors hold 
                      all relevant accreditations, ensuring all work is completed 
                      to the highest standards.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {['25-Year Warranty', 'DCL Certified', 'DM Approved', 'Quality Materials'].map((item) => (
                        <div key={item} className="flex items-center justify-center p-2 bg-blue-50 rounded-lg">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                          <span className="text-blue-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-cyan-50/30 to-sky-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Mission */}
            <AnimatedSection>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center lg:justify-start p-3 bg-blue-100 rounded-2xl text-blue-600 mb-6">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
                  To make the process of waterproofing and insulating your property as easy as possible. 
                  We are fully committed to understanding our customers' needs and always exceeding their 
                  expectations with high-quality products and superior service.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-blue-800 text-sm font-medium italic">
                    "We aim to achieve exceptional service through strong local presence, 
                    smart logistics, innovative solutions, and a team of highly motivated employees."
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Vision */}
            <AnimatedSection delay={0.2}>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center lg:justify-start p-3 bg-cyan-100 rounded-2xl text-cyan-600 mb-6">
                  <Globe className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
                  To be the most trusted waterproofing and insulation specialist in the region, 
                  recognized for our technical expertise, commitment to safety, and dedication 
                  to delivering lasting protection for every structure.
                </p>
                <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                  <p className="text-cyan-800 text-sm font-medium italic">
                    "Through continuous innovation and unwavering quality standards, we protect 
                    investments and enhance building longevity across the UAE."
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50/30 to-sky-50/30">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Our <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">Core Values</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                The principles that guide our work and define our commitment to excellence 
                in waterproofing and insulation services.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={0.1 * index}>
                <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/60 hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Our <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">Services</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive waterproofing and insulation solutions using top-quality 
                materials and advanced application technologies.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.name} delay={0.1 * index}>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="inline-flex items-center justify-center p-3 bg-sky-100 rounded-xl text-sky-600 mb-4">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Approvals */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-cyan-50/30 to-sky-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <AnimatedSection>
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Certifications & <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">Approvals</span>
                </h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  Blue Seal holds all relevant accreditations and is approved by major 
                  authorities across the UAE, ensuring compliance with the highest 
                  industry standards.
                </p>
                
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={cert}
                      className="flex items-center p-3 bg-white/80 backdrop-blur-xl rounded-lg shadow-sm border border-white/60"
                    >
                      <Award className="h-4 w-4 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Approvals Visual */}
            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/60">
                  <div className="text-center">
                    <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Approved Applicator
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      We are approved applicators for leading manufacturers including 
                      BASF, Organix, Polychem, and other industry leaders.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      {['BASF MasterSeal', 'Organix Systems', 'Polychem GRP', 'Sheridan Products'].map((item) => (
                        <div key={item} className="bg-blue-50 rounded-lg p-3 text-center">
                          <div className="text-blue-800 font-medium">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Safety Commitment */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-2xl text-green-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Health & Safety Commitment
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Safety is our primary concern. We are fully committed to systematizing 
                safety procedures through intensive risk assessments and coordinated actions.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Provide and maintain healthy work settings at all times',
              'Secure competent control of health and safety risks',
              'Comprehensive training and supervision for all employees',
              'Regular consultation and updates on safety issues',
              'UAE laws and statutes compliance'
            ].map((item, index) => (
              <AnimatedSection key={index} delay={0.1 * index}>
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Protect Your Property with Blue Seal
            </h2>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Join numerous satisfied clients who trust Blue Seal for their 
              waterproofing and insulation needs across Dubai and the UAE.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="/contact"
                className="group inline-flex items-center px-6 py-3 text-base font-semibold rounded-xl text-blue-600 bg-white hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Free Consultation
                <Droplets className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/services"
                className="group inline-flex items-center px-6 py-3 text-base font-semibold rounded-xl text-white bg-transparent hover:bg-white/10 transition-all duration-300 border border-white"
              >
                View Our Services
              </a>
            </div>

            <div className="mt-8 text-white/60 text-sm">
              <p>Contact us: +971 4 227 0123 | contact@blueseal.ae</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  )
}