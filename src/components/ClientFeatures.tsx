'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface Feature {
  icon: React.ComponentType<any>
  title: string
  description: string
}

interface ClientFeaturesProps {
  features: Feature[]
}

export default function ClientFeatures({ features }: ClientFeaturesProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <AnimatedSection>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Why <span className="text-primary-600">Choose EZ Solutions</span>?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We combine technical expertise with business understanding to deliver 
                solutions that not only work flawlessly but also drive real business value.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Visual/Stats */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary-600 mb-2">98%</div>
                  <div className="text-gray-600">Client Retention Rate</div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Project Success</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>On-Time Delivery</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Budget Adherence</span>
                      <span>96%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-primary-500 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                🚀 Fast Delivery
              </motion.div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                💡 Innovative
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}