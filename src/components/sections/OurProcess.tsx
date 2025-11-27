'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Search, Palette, Code, TestTube, Rocket } from 'lucide-react'

function OurProcess({
  processes = [
    {
      step: 1,
      icon: Search,
      title: "Discovery & Research",
      description: "We begin by understanding your business goals, target audience, and project requirements through comprehensive research and analysis.",
      duration: "1-2 weeks",
      deliverables: ["Project Brief", "User Personas", "Competitive Analysis"],
      tools: ["Figma", "Miro", "Google Analytics", "Hotjar"]
    },
    {
      step: 2,
      icon: Palette,
      title: "UI/UX Design",
      description: "Our design team creates intuitive user interfaces and engaging user experiences that align with your brand and business objectives.",
      duration: "2-3 weeks",
      deliverables: ["Wireframes", "Mockups", "Prototypes", "Design System"],
      tools: ["Figma", "Adobe XD", "Sketch", "Illustrator"]
    },
    {
      step: 3,
      icon: Code,
      title: "Development",
      description: "Our developers bring designs to life using the latest technologies and best practices to ensure high performance and scalability.",
      duration: "4-8 weeks",
      deliverables: ["Frontend Development", "Backend API", "Database Setup"],
      tools: ["React", "Next.js", "TypeScript", "Node.js"]
    },
    {
      step: 4,
      icon: TestTube,
      title: "Testing & Quality Assurance",
      description: "Rigorous testing across multiple devices and browsers to ensure flawless performance and user experience.",
      duration: "1-2 weeks",
      deliverables: ["Test Reports", "Bug Fixes", "Performance Optimization"],
      tools: ["Jest", "Cypress", "Lighthouse", "BrowserStack"]
    },
    {
      step: 5,
      icon: Rocket,
      title: "Launch & Deployment",
      description: "Smooth deployment to production environment with ongoing monitoring and support to ensure optimal performance.",
      duration: "1 week",
      deliverables: ["Live Website", "Documentation", "Training"],
      tools: ["Vercel", "AWS", "GitHub Actions", "Sentry"]
    }
  ]
}: {
  processes?: Array<{
    step: number;
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    duration: string;
    deliverables?: string[];
    tools?: string[];
  }>;
}) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
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
    <section className="relative py-10 md:py-14 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 overflow-hidden">
      {/* Background: soft + unique process particles */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft radial glow */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px] md:w-[520px] md:h-[520px] bg-gradient-to-b from-primary-100/70 via-indigo-50/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-[-220px] right-[-80px] w-[260px] h-[260px] bg-gradient-to-tr from-purple-100/60 via-indigo-100/40 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Tiny floating dots – very subtle */}
        <motion.div
          className="absolute top-10 left-[12%] w-2 h-2 rounded-full bg-primary-300/60"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-24 right-[10%] w-2 h-2 rounded-full bg-purple-300/60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-[18%] w-1.5 h-1.5 rounded-full bg-sky-300/60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Process orbit SVG - desktop / tablet only */}
        <div
          aria-hidden
          className="hidden md:flex absolute inset-0 items-center justify-center opacity-70"
        >
          <svg
            viewBox="0 0 900 900"
            className="w-[820px] h-[820px] lg:w-[980px] lg:h-[980px]"
            style={{ animation: 'processOrbitSpin 55s linear infinite' }}
          >
            <defs>
              <radialGradient id="processHalo" cx="50%" cy="45%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.24" />
                <stop offset="55%" stopColor="#a855f7" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="processStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            <g transform="translate(450,450)">
              {/* Soft halo */}
              <circle r="260" fill="url(#processHalo)" />

              {/* Orbits */}
              <g stroke="url(#processStroke)" fill="none" strokeLinecap="round">
                <circle r="260" strokeWidth="1.4" strokeDasharray="6 18" strokeOpacity="0.45" />
                <circle r="190" strokeWidth="1.2" strokeDasharray="4 14" strokeOpacity="0.35" />
                <circle r="130" strokeWidth="1" strokeDasharray="3 12" strokeOpacity="0.25" />
              </g>

              {/* Flow lines */}
              <g stroke="url(#processStroke)" strokeWidth="0.9" strokeOpacity="0.45" fill="none">
                <path d="M-230 -80 Q 0 -220 230 -60" />
                <path d="M-260 40 Q 0 0 260 -20" />
                <path d="M-200 140 Q 0 220 210 130" />
              </g>

              {/* Floating "step" nodes around the orbit */}
              {Array.from({ length: 5 }).map((_, i) => {
                const angle = (i / 5) * Math.PI * 2 + Math.PI / 6
                const radius = i % 2 === 0 ? 260 : 210
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <g key={i} transform={`translate(${x},${y})`}>
                    <rect
                      x={-26}
                      y={-12}
                      rx={8}
                      ry={8}
                      width={52}
                      height={24}
                      fill="#ffffff"
                      fillOpacity="0.83"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                    <rect
                      x={-22}
                      y={-6}
                      width={18}
                      height={12}
                      rx={4}
                      fill="#eef2ff"
                    />
                    <rect
                      x={-2}
                      y={-3}
                      width={18}
                      height={6}
                      rx={3}
                      fill="#e5e7eb"
                    />
                    <rect
                      x={-2}
                      y={4}
                      width={12}
                      height={4}
                      rx={2}
                      fill="#d4d4d8"
                    />
                    {/* small connector dot */}
                    <circle cx={-26} cy={0} r={3} fill="#6366f1" fillOpacity="0.75" />
                  </g>
                )
              })}
            </g>
          </svg>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Process
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto"
          >
            A streamlined workflow designed for exceptional results
          </motion.p>
        </div>

        {/* Zig-Zag Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Desktop connector line */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 hidden md:block">
            <svg className="w-full h-12" viewBox="0 0 1000 100" preserveAspectRatio="none">
              <motion.path
                d={`M0,50 ${processes
                  .map((_, i) => {
                    const x = (i * 1000) / (processes.length - 1);
                    const y = i % 2 === 0 ? 30 : 70;
                    return `L${x},${y}`;
                  })
                  .join(' ')} L1000,50`}
                stroke="url(#zigzagGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,4"
                initial={{ pathLength: 0, opacity: 0.25 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="zigzagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Process Steps */}
          <div className="relative space-y-5 md:space-y-10">
            {processes.map((process, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={process.step}
                  variants={item}
                  className={`flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-4 md:gap-8`}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onTouchStart={() => setHoveredStep(index)}
                  onTouchEnd={() => setHoveredStep(null)}
                >
                  {/* Content Card */}
                  <div className="flex-1 w-full">
                    <motion.div
                      className={`relative process-card rounded-xl md:rounded-2xl p-4 md:p-5 border-2 transition-all duration-300 cursor-pointer group h-full bg-white/90 backdrop-blur-sm ${
                        hoveredStep === index
                          ? 'border-primary-500/30 shadow-lg bg-gradient-to-br from-primary-50/80 via-white to-purple-50/80'
                          : 'border-transparent shadow-md'
                      }`}
                      animate={{
                        y: hoveredStep === index ? -4 : 0,
                        scale: hoveredStep === index ? 1.02 : 1,
                      }}
                    >
                      {/* Step Header */}
                      <div
                        className={`flex items-center gap-3 md:gap-4 mb-3 md:mb-4 ${
                          isEven ? 'flex-row' : 'md:flex-row-reverse flex-row'
                        }`}
                      >
                        <motion.div
                          className="relative flex-shrink-0"
                          animate={{
                            rotate: hoveredStep === index ? [0, 4, -4, 0] : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Step Number */}
                          <div
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md transition-all duration-300 ${
                              hoveredStep === index
                                ? 'bg-gradient-to-br from-primary-600 to-purple-600 shadow-primary-600/30'
                                : 'bg-gradient-to-br from-gray-400 to-gray-500'
                            }`}
                          >
                            {process.step}
                          </div>

                          {/* Icon Badge */}
                          <div
                            className={`absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white flex items-center justify-center shadow-sm transition-all duration-300 ${
                              hoveredStep === index ? 'bg-purple-500' : 'bg-gray-400'
                            }`}
                          >
                            <process.icon className="h-2.5 w-2.5 md:h-3 md:w-3 text-white" />
                          </div>

                          {/* Pulse Effect on Hover */}
                          {hoveredStep === index && (
                            <motion.div
                              className="absolute inset-0 rounded-lg md:rounded-xl border-2 border-primary-400/50"
                              initial={{ scale: 1, opacity: 0.6 }}
                              animate={{ scale: 1.3, opacity: 0 }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.div>

                        <div
                          className={`flex-1 ${
                            isEven ? 'text-left' : 'md:text-right text-left'
                          }`}
                        >
                          <h3
                            className={`text-base md:text-lg font-bold mb-1 md:mb-2 transition-all duration-300 ${
                              hoveredStep === index
                                ? 'text-transparent bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text'
                                : 'text-gray-900'
                            }`}
                          >
                            {process.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                              hoveredStep === index
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}
                          >
                            ⏱️ {process.duration}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                        {process.description}
                      </p>

                      {/* Tools on Hover */}
                      {hoveredStep === index && process.tools && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                            Tools & Technologies
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {process.tools.slice(0, 3).map((tool, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 border border-gray-200"
                              >
                                {tool}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Connection Point - Desktop only */}
                  <div className="hidden md:block relative flex-shrink-0">
                    <motion.div
                      className="w-4 h-4 bg-white border-2 rounded-full shadow-md flex items-center justify-center"
                      animate={{
                        scale: hoveredStep === index ? [1, 1.2, 1] : 1,
                        borderColor: hoveredStep === index ? '#6366f1' : '#d1d5db',
                        backgroundColor: hoveredStep === index ? '#6366f1' : '#ffffff',
                      }}
                      transition={{
                        scale: {
                          duration: 2,
                          repeat: hoveredStep === index ? Infinity : 0,
                        },
                        borderColor: { duration: 0.3 },
                        backgroundColor: { duration: 0.3 },
                      }}
                    >
                      {hoveredStep === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </motion.div>

                    {/* Line to timeline */}
                    <div
                      className={`absolute top-1/2 w-12 h-0.5 bg-gradient-to-r transform -translate-y-1/2 ${
                        isEven
                          ? 'left-full from-primary-500 to-transparent'
                          : 'right-full from-transparent to-primary-500'
                      } transition-all duration-300 ${
                        hoveredStep === index ? 'opacity-100' : 'opacity-30'
                      }`}
                    />
                  </div>

                  {/* Spacer - Desktop only */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
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

        @keyframes processOrbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Light grid inside cards */
        .process-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0.28;
          background-image:
            linear-gradient(
              to right,
              rgba(148, 163, 184, 0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(148, 163, 184, 0.28) 1px,
              transparent 1px
            );
          background-size: 22px 22px;
          mix-blend-mode: normal;
        }

        .process-card:hover::before {
          opacity: 0.42;
        }
      `}</style>
    </section>
  )
}

export default OurProcess
