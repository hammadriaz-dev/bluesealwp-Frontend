'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { ArrowRight, TrendingUp, Rocket, Clock, Star, Shield } from 'lucide-react'
import Link from 'next/link'

interface ClientHeroProps {
  stats: Array<{
    number: string
    label: string
    icon: React.ComponentType<any>
  }>
}

export default function ClientHero({ stats }: ClientHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <AnimatedSection>
            <div className="space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trusted by 100+ businesses worldwide
              </motion.div>

              {/* Main heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Transform Your{' '}
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  Digital Vision
                </span>{' '}
                Into Reality
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We create <span className="font-semibold text-primary-600">innovative solutions</span> that drive growth, 
                enhance efficiency, and deliver exceptional user experiences for your business.
              </p>
            </div>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/services"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-primary-600 hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 transform hover:-translate-y-1"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-primary-600 bg-white hover:bg-gray-50 transition-all duration-300 border-2 border-primary-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Schedule a Call
              </Link>
            </div>
          </AnimatedSection>

          {/* Stats preview */}
          <AnimatedSection delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}