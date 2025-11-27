'use client'

import { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import { Check, Clock, Shield, MessageCircle, Users, Code, Settings } from 'lucide-react'

interface Plan {
  title: string;
  originalPrice: number;
  discountedPrice: number;
  description: string;
  features: string[];
  popular: boolean;
  color: string;
  icon: React.ComponentType<any>;
}

// Default plans data
const defaultPlans: Plan[] = [
  {
    title: 'Lead Generation',
    originalPrice: 20,
    discountedPrice: 10,
    description: 'Ideal for data scraping, lead generation, and automation services',
    features: [
      'Data Scraping & Extraction',
      'Lead List Generation',
      'Automation Scripts',
      'Data Cleaning & Processing',
      'Custom Crawlers',
      'Regular Data Updates',
    ],
    popular: true,
    color: 'from-purple-500 to-sky-500',
    icon: Users,
  },
  {
    title: 'Web Developer',
    originalPrice: 30,
    discountedPrice: 15,
    description: 'Perfect for website development, frontend/backend work, and web applications',
    features: [
      'Custom Website Development',
      'Frontend & Backend Development',
      'Responsive Design',
      'API Integration',
      'Performance Optimization',
      'Technical Support',
    ],
    popular: true,
    color: 'from-indigo-500 to-purple-500',
    icon: Code,
  },
  {
    title: 'Basic Service',
    originalPrice: 10,
    discountedPrice: 5,
    description: 'Great for small tasks, maintenance, and basic development work',
    features: [
      'Website Maintenance',
      'Bug Fixes',
      'Content Updates',
      'Small Features',
      'Code Review',
      'Basic Consultation',
    ],
    popular: true,
    color: 'from-sky-500 to-indigo-500',
    icon: Settings,
  },
]

export default function PricingPlans() {
  const plans = defaultPlans;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  }

  const featuredTitle = 'Web Developer'

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Layer 1: drifting soft blobs */}
        <div
          className="absolute inset-[-25%] blur-3xl opacity-[0.65]"
          style={{
            background:
              'radial-gradient(30% 40% at 15% 20%, rgba(99,102,241,0.28) 0%, transparent 60%),' +
              'radial-gradient(28% 36% at 85% 20%, rgba(168,85,247,0.26) 0%, transparent 60%),' +
              'radial-gradient(32% 38% at 50% 90%, rgba(14,165,233,0.24) 0%, transparent 60%)',
            animation: 'smokeDrift 28s ease-in-out infinite',
          }}
        />

        {/* Layer 2: light grid mask */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_85%_60%_at_50%_50%,black,transparent)]" />

        {/* Persuasive background banner text */}
        <div className="absolute inset-x-0 top-4 md:top-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0.0, y: -10 }}
            animate={{ opacity: [0.25, 0.5, 0.25], y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/30 backdrop-blur-xl ring-1 ring-white/50 text-xs md:text-sm font-semibold text-slate-800"
          >
            <span className="mr-1 md:mr-2">💥</span>
            Come on - avail it at a limited price!
            <span className="ml-1 md:ml-2">⏳</span>
          </motion.div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg ring-1 ring-white/50 mb-4 md:mb-6"
          >
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-purple-500 to-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            </div>
            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Limited Time Offer
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4"
          >
            Affordable <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 bg-clip-text text-transparent">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-slate-700/90 max-w-2xl mx-auto px-4"
          >
            Get 50% off on all our services. Professional quality at unbeatable prices
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 relative px-4"
        >
          {/* Centered Rotating Circle - Positioned behind cards */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              viewBox="0 0 500 500"
              className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-60"
              style={{ animation: 'spinSlow 18s linear infinite' }}
            >
              <defs>
                <linearGradient id="ring2" x1="0" x2="1">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle cx="250" cy="250" r="200" fill="none" stroke="url(#ring2)" strokeWidth="12" strokeDasharray="15 25" />
            </svg>
          </div>

          {plans.map((plan) => {
            const Icon = plan.icon
            const isFeatured = plan.title === featuredTitle

            return (
              <motion.div
                key={plan.title}
                variants={item}
                className={[
                  'relative group',
                  isFeatured ? 'lg:scale-[1.04]' : '',
                ].join(' ')}
              >
                {/* Featured aura + EMOJI layer (visible on hover) */}
                {isFeatured && (
                  <div aria-hidden className="absolute -inset-2 md:-inset-4 rounded-[24px] md:rounded-[28px] pointer-events-none">
                    <div className="absolute inset-0 rounded-[24px] md:rounded-[28px] bg-gradient-to-r from-indigo-500/22 via-purple-500/22 to-sky-500/22 blur-2xl" />

                    {/* EMOJIS - they show when user hovers the Web Developer card */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="absolute left-[12%] top-[20%] text-xl md:text-2xl animate-emojiFloat">✨</span>
                      <span className="absolute right-[12%] top-[26%] text-xl md:text-2xl animate-emojiFloat2">🚀</span>
                      <span className="absolute left-[20%] bottom-[18%] text-xl md:text-2xl animate-emojiFloat3">🔥</span>
                      <span className="absolute right-[22%] bottom-[14%] text-xl md:text-2xl animate-emojiFloat">💡</span>
                    </div>
                  </div>
                )}

                {/* Badge */}
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full text-white text-xs md:text-sm font-semibold shadow-lg min-h-[28px] flex items-center justify-center min-w-[120px] ${isFeatured ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-sky-700' : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                      }`}
                  >
                    {isFeatured ? 'Recommended' : 'Most Popular'}
                  </div>
                </div>

                {/* Card */}
                <div
                  className={[
                    'relative h-full rounded-xl md:rounded-2xl border bg-white/80 backdrop-blur-xl transition-all duration-500 overflow-hidden min-h-[500px]',
                    isFeatured
                      ? 'border-indigo-200/60 shadow-2xl ring-1 ring-indigo-200/60 lg:-translate-y-1 hover:lg:-translate-y-2'
                      : 'border-white/60 shadow-xl',
                  ].join(' ')}
                >
                  {/* Stronger hover gradient border on featured */}
                  <div
                    className={[
                      'absolute -inset-0.5 rounded-xl md:rounded-2xl opacity-0 transition-all duration-500 blur-sm group-hover:opacity-100',
                      isFeatured
                        ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-sky-700'
                        : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500',
                    ].join(' ')}
                  />

                  <div
                    className={[
                      'relative rounded-xl md:rounded-2xl h-full flex flex-col transition-all duration-300',
                      isFeatured ? 'bg-gradient-to-br from-indigo-50/85 via-white to-sky-50/85' : 'bg-white/95',
                      'group-hover:shadow-2xl',
                    ].join(' ')}
                  >
                    {/* Top bar */}
                    <div
                      className={[
                        'h-1 md:h-1.5 bg-gradient-to-r transition-all duration-500',
                        plan.color,
                        isFeatured
                          ? 'group-hover:from-indigo-800 group-hover:via-purple-800 group-hover:to-sky-800'
                          : 'group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-sky-600',
                      ].join(' ')}
                    />

                    <div className="p-4 md:p-7 flex-1 flex flex-col">
                      {/* Header */}
                      <div className="text-center mb-4 md:mb-6">
                        <div
                          className={[
                            'inline-flex items-center justify-center p-2 md:p-3 rounded-xl md:rounded-2xl mb-3 md:mb-4 min-w-[44px] min-h-[44px]',
                            isFeatured
                              ? 'bg-gradient-to-r from-indigo-100 to-sky-100 text-indigo-700'
                              : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600',
                          ].join(' ')}
                        >
                          <Icon className="h-5 w-5 md:h-6 md:w-6" />
                        </div>

                        <h3
                          className={[
                            'text-lg md:text-xl font-bold mb-1 md:mb-2 transition-all duration-300',
                            isFeatured
                              ? 'bg-gradient-to-r from-indigo-800 via-purple-800 to-sky-800 bg-clip-text text-transparent'
                              : 'text-slate-900 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-sky-600 group-hover:bg-clip-text group-hover:text-transparent',
                          ].join(' ')}
                        >
                          {plan.title}
                        </h3>

                        <p className={`text-xs md:text-sm ${isFeatured ? 'text-slate-700/95' : 'text-slate-600'}`}>{plan.description}</p>
                      </div>

                      {/* Pricing */}
                      <div className="text-center mb-4 md:mb-6">
                        <div className="flex items-center justify-center gap-1 md:gap-2 mb-1 md:mb-2">
                          <span className={`text-2xl md:text-3xl font-extrabold ${isFeatured ? 'text-slate-900 drop-shadow-[0_1px_0_rgba(79,70,229,0.18)]' : 'text-slate-900'}`}>
                            ${plan.discountedPrice}
                          </span>
                          <span className="text-sm text-slate-500">/ hour</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 md:gap-2">
                          <span className="text-base md:text-lg text-slate-400 line-through">${plan.originalPrice}</span>
                          <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-semibold ${isFeatured ? 'bg-green-200 text-green-800' : 'bg-green-100 text-green-700'}`}>
                            50% OFF
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex-1 mb-4 md:mb-6">
                        <ul className="space-y-2 md:space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 md:gap-3">
                              <div
                                className={[
                                  'flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center min-w-[16px]',
                                  isFeatured ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-sky-700' : 'bg-gradient-to-r from-indigo-500 to-purple-500',
                                ].join(' ')}
                              >
                                <Check className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
                              </div>
                              <span className="text-xs md:text-sm text-slate-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <button className={`group relative inline-flex items-center justify-center gap-2 rounded-lg md:rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 text-sm shadow-lg hover:from-indigo-700 hover:via-purple-700 hover:to-sky-700 transition-all duration-300 shadow-indigo-600/10 hover:shadow-indigo-600/25 overflow-hidden w-full py-2.5 md:py-3 text-base hover:scale-105 hover:shadow-lg min-h-[44px] ${isFeatured ? 'ring-1 ring-indigo-200/70' : ''}`}>
                        <span className="pointer-events-none absolute inset-0 -skew-x-12 translate-x-[-120%] bg-white/25 group-hover:translate-x-[120%] transition-transform duration-700" />
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Extra Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 md:mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 md:gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg ring-1 ring-white/50">
            <div className="flex items-center gap-1 md:gap-2">
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
              <span className="text-xs md:text-sm font-semibold text-slate-700">Flexible Hours</span>
            </div>
            <div className="hidden sm:block w-px h-4 md:h-6 bg-slate-300" />
            <div className="flex items-center gap-1 md:gap-2">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
              <span className="text-xs md:text-sm font-semibold text-slate-700">Quality Guaranteed</span>
            </div>
            <div className="hidden sm:block w-px h-4 md:h-6 bg-slate-300" />
            <div className="flex items-center gap-1 md:gap-2">
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
              <span className="text-xs md:text-sm font-semibold text-slate-700">24/7 Support</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 p-0.5 md:p-1">
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-xl md:rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">Ready to Get Started?</h3>
              <p className="text-white/80 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto">
                Don't miss this limited time offer. Get professional services at 50% off
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                <button className="group relative inline-flex items-center justify-center gap-2 rounded-lg md:rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 text-sm shadow-lg hover:from-indigo-700 hover:via-purple-700 hover:to-sky-700 transition-all duration-300 shadow-indigo-600/10 hover:shadow-indigo-600/25 overflow-hidden px-6 py-2.5 md:px-8 md:py-3 text-base hover:scale-105 hover:shadow-xl min-h-[44px] w-full sm:w-auto">
                  <span className="pointer-events-none absolute inset-0 -skew-x-12 translate-x-[-120%] bg-white/25 group-hover:translate-x-[120%] transition-transform duration-700" />
                  Book a Call
                </button>
                <button
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3 rounded-lg md:rounded-xl text-base font-semibold text-white/90 border-2 border-white/70 bg-white/0 hover:bg-white/10 transition-all duration-300 overflow-hidden min-h-[44px] w-full sm:w-auto"
                >
                  <span className="pointer-events-none absolute inset-0 -skew-x-12 translate-x-[-120%] bg-white/25 group-hover:translate-x-[120%] transition-transform duration-700" />
                  View All Services
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        /* Soft smoke drift for blobs */
        @keyframes smokeDrift {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0.6; }
          50% { transform: translate3d(0,-24px,0) scale(1.03); opacity: 0.75; }
          100% { transform: translate3d(0,0,0) scale(1); opacity: 0.6; }
        }
        /* Emoji float variants */
        @keyframes emojiFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.95; }
          50% { transform: translateY(-10px) rotate(6deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.95; }
        }
        .animate-emojiFloat { animation: emojiFloat 3.2s ease-in-out infinite; }
        .animate-emojiFloat2 { animation: emojiFloat 2.8s ease-in-out 0.2s infinite; }
        .animate-emojiFloat3 { animation: emojiFloat 3.6s ease-in-out 0.15s infinite; }
      `}</style>
    </section>
  )
}