'use client'

import { motion, Variants } from 'framer-motion' 
import { Shield, Users, Zap, Award, Clock, CheckCircle } from 'lucide-react'

// Add this import if it's missing
const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
)

function CoreValues({
  values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "We prioritize safety above all else, implementing rigorous safety procedures and risk assessments to protect our team, clients, and properties."
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "We provide tailored waterproofing solutions that perfectly match each client's specific requirements, ensuring complete confidence and satisfaction."
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "We hold all relevant accreditations and deliver work to the highest standards, backed by comprehensive warranties and quality assurance."
    },
    {
      icon: Zap,
      title: "Technical Excellence",
      description: "We combine expertise in waterproofing installation with advanced materials and techniques to deliver unsurpassed performance and durability."
    },
    {
      icon: Clock,
      title: "Long-Term Reliability",
      description: "Our solutions are built to last, with systems offering 25-year warranties and proven performance in Dubai's extreme climate conditions."
    },
    {
      icon: CheckCircle,
      title: "Regulatory Compliance",
      description: "We ensure all work meets Dubai Municipality standards and local authority approvals, providing peace of mind and regulatory compliance."
    }
  ]
}: {
  values?: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
  }>;
}) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-4 md:top-20 md:left-10 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-br from-blue-200/15 to-cyan-200/10 rounded-3xl rotate-12 blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-4 md:bottom-20 md:right-16 w-28 h-28 md:w-60 md:h-60 bg-gradient-to-tr from-cyan-200/15 to-blue-200/10 rounded-3xl -rotate-12 blur-2xl animate-pulse-slow" style={{ animationDelay: '3s' }} />

        {/* Water-themed SVG Background */}
        <svg className="absolute top-0 left-30 w-full h-full" viewBox="0 0 100 100">
          <motion.path
            d="M10,50 Q50,10 90,50 Q50,90 10,50"
            stroke="url(#waterGradient1)"
            strokeWidth="0.3"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M20,50 Q50,20 80,50 Q50,80 20,50"
            stroke="url(#waterGradient2)"
            strokeWidth="0.2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
          
          {/* Water Drop Symbols */}
          {[...Array(5)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${15 + i * 15},${30 + (i % 2) * 30} Q${15 + i * 15},${25 + (i % 2) * 30} ${20 + i * 15},${30 + (i % 2) * 30} Q${15 + i * 15},${35 + (i % 2) * 30} ${15 + i * 15},${30 + (i % 2) * 30}`}
              stroke="url(#waterGradient1)"
              strokeWidth="0.2"
              fill="none"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1, delay: i * 0.3 }}
            />
          ))}
          
          <defs>
            <linearGradient id="waterGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waterGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-400/30 to-cyan-400/30"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.sin(i) * 8, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <AnimatedSection>
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="inline-flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-3 rounded-xl bg-white/80 backdrop-blur-xl shadow-xl ring-1 ring-white/60 mb-4 md:mb-6"
            >
              <motion.div
                className="flex -space-x-1"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              </motion.div>
              <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-wider uppercase">
                Our Commitment
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4"
            >
              Our Core <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Values</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-4"
            >
              The principles that guide our work, ensuring exceptional waterproofing and insulation solutions 
              that stand the test of time in Dubai's challenging environment.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Values Grid - Equal height cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Values in Grid Arrangement */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={item}
                className="relative group"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                {/* Value Content - Fixed Height */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/60 group-hover:shadow-xl transition-all duration-300 h-full min-h-[200px] md:min-h-[240px] flex flex-col">
                  {/* Water-themed Icon Background */}
                  <div className="absolute top-4 right-4 opacity-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full" />
                  </div>

                  {/* Icon with Hover Effect on Card */}
                  <div className="mb-3 md:mb-4">
                    <motion.div
                      className="inline-flex items-center justify-center p-2 md:p-3 rounded-xl text-white shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <value.icon className="h-5 w-5 md:h-6 md:w-6" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base group-hover:text-slate-700 transition-colors duration-300 flex-1 line-clamp-3">
                    {value.description}
                  </p>

                  {/* Water-themed Animated Underline */}
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 md:mt-3 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300"
                    initial={{ width: "60%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>

                {/* Floating Water Drop Indicator - Hidden on mobile */}
                <motion.div
                  className="absolute -top-1 -right-1 md:-top-1.5 md:-right-1.5 w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hidden md:block"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.4,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Certifications & Approvals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12"
        >
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">
              Certified & Approved By
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
            {[
              { name: 'Dubai Municipality', color: 'from-blue-600 to-blue-700' },
              { name: 'Trakhees', color: 'from-cyan-600 to-cyan-700' },
              { name: 'Sharjah Municipality', color: 'from-blue-500 to-cyan-500' },
              { name: 'DCL Certified', color: 'from-cyan-500 to-teal-500' },
              { name: 'BASF Approved', color: 'from-blue-600 to-indigo-600' },
              { name: 'ISO Standards', color: 'from-cyan-600 to-blue-600' }
            ].map((authority, index) => (
              <motion.div
                key={authority.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-md border border-white/40"
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${authority.color}`} />
                <span className="text-xs font-medium text-slate-700 whitespace-nowrap">
                  {authority.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 md:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 md:gap-4 px-3 py-2 md:px-6 md:py-4 rounded-xl bg-white/60 backdrop-blur-xl shadow-lg border border-white/40">
            <motion.div
              className="flex space-x-1"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-500" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500" />
            </motion.div>
            <span className="text-xs md:text-sm font-semibold text-slate-700">
              Trusted by 100+ clients across Dubai and UAE
            </span>
            <motion.div
              className="flex space-x-1"
              animate={{ rotate: [360, 180, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-500" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        .animate-pulse-slow { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

export default CoreValues