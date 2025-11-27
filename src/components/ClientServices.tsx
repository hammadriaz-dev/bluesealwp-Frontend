'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link' 

interface Service {
  icon: React.ComponentType<any>
  title: string
  description: string
  features: string[]
  color: string
}

interface ClientServicesProps {
  services: Service[]
}

export default function ClientServices({ services }: ClientServicesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary-600">Expert Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions tailored to meet your unique business needs 
              and drive your success forward.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={0.1 * index}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300"
              >
                {/* Gradient top bar */}
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${service.color} text-white`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 ml-4">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={`/services/${service.title.toLowerCase().replace(' ', '-')}`}
                    className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Services CTA */}
        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-primary-600 bg-primary-50 hover:bg-primary-100 transition-all duration-300 border-2 border-primary-200 hover:border-primary-300"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}