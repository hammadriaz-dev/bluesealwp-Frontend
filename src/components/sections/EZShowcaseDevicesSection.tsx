'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

function EZShowcaseDevicesSection({
  images,
  autoMs = 4000,
  height = 500,
}: {
  images?: { url: string; label?: string; message?: string; device?: 'desktop' | 'mobile' | 'tablet' }[];
  autoMs?: number;
  height?: number;
}) {
  const DATA = useMemo(
    () =>
      (images && images.length
        ? images
        : [
            {
              url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
              label: 'Dashboard Analytics',
              message: 'Real-time business insights and metrics with beautiful visualizations',
              device: 'desktop' as const,
            },
            {
              url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
              label: 'Mobile App',
              message: 'Seamless mobile experience with intuitive gestures',
              device: 'mobile' as const,
            },
            {
              url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop',
              label: 'Tablet Interface',
              message: 'Optimized for larger touch screens and productivity',
              device: 'tablet' as const,
            },
          ]) as { url: string; label?: string; message?: string; device?: 'desktop' | 'mobile' | 'tablet' }[],
    [images]
  )

  const [currentDevice, setCurrentDevice] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // 3D mouse interaction
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    damping: 30,
    stiffness: 200,
  })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    damping: 30,
    stiffness: 200,
  })

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  // Auto-rotate through devices
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentDevice((prev) => (prev + 1) % DATA.length)
        setIsAnimating(false)
      }, 600)
    }, autoMs)

    return () => clearInterval(interval)
  }, [DATA.length, autoMs, isAutoPlaying])

  const currentData = DATA[currentDevice]

  const getDeviceFrame = (device: string | undefined) => {
    const deviceComponents = {
      desktop: (
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Desktop Frame with 3D depth */}
          <motion.div 
            className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-2xl md:rounded-t-3xl p-3 md:p-4 mx-auto border border-gray-700 shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Camera */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full" />
            
            {/* Screen with glass effect */}
            <div className="relative bg-gray-900 rounded-lg md:rounded-xl overflow-hidden aspect-video border-2 border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 mix-blend-overlay" />
              <img
                src={currentData.url}
                alt={currentData.label || 'Device showcase'}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
                }`}
              />
              {/* Screen reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Desktop Stand with 3D effect */}
          <motion.div 
            className="mx-auto w-32 h-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg shadow-2xl"
            whileHover={{ scale: 1.05 }}
          />
          <motion.div 
            className="mx-auto w-16 h-3 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-md shadow-inner"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      ),

      mobile: (
        <motion.div 
          className="relative w-64 md:w-80 mx-auto"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Mobile Frame with metallic finish */}
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 border-2 border-gray-800 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-lg z-10" />
            
            {/* Dynamic Island */}
            <motion.div 
              className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full border border-gray-800 z-20"
              animate={{ width: ['24px', '96px', '24px'] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Screen */}
            <div className="relative bg-black rounded-2xl md:rounded-3xl overflow-hidden aspect-[9/19.5] border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 mix-blend-overlay" />
              <img
                src={currentData.url}
                alt={currentData.label || 'Device showcase'}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isAnimating ? 'scale-115 opacity-0' : 'scale-100 opacity-100'
                }`}
              />
              {/* Screen glare */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent transform skew-x-12 pointer-events-none" />
            </div>

            {/* Home Indicator with pulse */}
            <motion.div 
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Side buttons */}
          <div className="absolute -left-2 top-1/4 h-16 w-1 bg-gray-800 rounded-l" />
          <div className="absolute -left-2 top-2/4 h-16 w-1 bg-gray-800 rounded-l" />
          <div className="absolute -right-2 top-1/3 h-24 w-1 bg-gray-800 rounded-r" />
        </motion.div>
      ),

      tablet: (
        <motion.div 
          className="relative w-80 md:w-[28rem] mx-auto"
          whileHover={{ scale: 1.03, rotateX: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Tablet Frame */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-700 shadow-2xl">
            {/* Camera with lens effect */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border border-gray-500" />
            
            {/* Screen */}
            <div className="relative bg-gray-900 rounded-lg md:rounded-xl overflow-hidden aspect-[4/3] border-2 border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 mix-blend-overlay" />
              <img
                src={currentData.url}
                alt={currentData.label || 'Device showcase'}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isAnimating ? 'scale-108 opacity-0' : 'scale-100 opacity-100'
                }`}
              />
              {/* Animated scan line */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
              />
            </div>

            {/* Home Button with touch indicator */}
            <motion.div 
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-gray-600 bg-gradient-to-b from-gray-700 to-gray-800"
              whileHover={{ scale: 1.2, backgroundColor: "rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
        </motion.div>
      )
    }

    // Fallback to desktop if device is undefined
    const deviceType = device || 'desktop'
    return deviceComponents[deviceType as keyof typeof deviceComponents] || deviceComponents.desktop
  }

  return (
    <section 
      className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 px-4 sm:px-6 lg:px-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced Professional Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-40"
            animate={{
              background: [
                'radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 70%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0">
          {/* Animated Triangles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`triangle-${i}`}
              className="absolute"
              style={{
                left: `${(i * 15) % 100}%`,
                top: `${(i * 20) % 100}%`,
              }}
              animate={{
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400/20 to-pink-400/20 clip-path-triangle" />
            </motion.div>
          ))}

          {/* Floating Circles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${(i * 12) % 100}%`,
                top: `${(i * 15) % 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10 + i * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              <div className={`w-4 h-4 bg-gradient-to-r ${
                i % 3 === 0 ? 'from-blue-400/30 to-cyan-400/30' :
                i % 3 === 1 ? 'from-purple-400/30 to-pink-400/30' :
                'from-green-400/30 to-emerald-400/30'
              } rounded-full blur-sm`} />
            </motion.div>
          ))}
        </div>

        {/* Advanced Particle System */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
              }}
            >
              <div className={`w-full h-full rounded-full ${
                i % 4 === 0 ? 'bg-blue-400/60' :
                i % 4 === 1 ? 'bg-purple-400/60' :
                i % 4 === 2 ? 'bg-cyan-400/60' :
                'bg-pink-400/60'
              } blur-[1px]`} />
            </motion.div>
          ))}
        </div>

        {/* Enhanced Floating Orbs */}
        <motion.div
          className="absolute -top-40 -right-10 md:-right-24 w-72 h-72 md:w-96 md:h-96"
          animate={{ 
            x: [0, -60, 30, 0], 
            y: [0, 40, -25, 0], 
            scale: [1, 1.15, 0.9, 1],
            rotate: [0, 10, -5, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-400/30 via-indigo-400/20 to-sky-400/30 rounded-full blur-3xl" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          className="absolute -bottom-32 -left-16 md:-left-24 w-72 h-72 md:w-96 md:h-96"
          animate={{ 
            x: [0, 35, -45, 0], 
            y: [0, -45, 35, 0], 
            scale: [1.02, 0.85, 1.12, 1.02],
            rotate: [0, -8, 6, 0]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-sky-400/25 via-indigo-400/15 to-emerald-300/25 rounded-full blur-3xl" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-full"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </motion.div>

        {/* New Central Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-full h-full bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10 rounded-full blur-2xl" />
        </motion.div>

        {/* Animated Grid System */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            x: [-30, 30, -30],
            y: [20, -20, 20]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full opacity-30 bg-[linear-gradient(rgba(129,140,248,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.15)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_30%,transparent_70%)]" />
        </motion.div>

        {/* Dynamic Light Beams */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute top-0 w-1 h-64 bg-gradient-to-b from-transparent via-white/20 to-transparent"
              style={{
                left: `${25 + i * 25}%`,
                transform: 'rotate(45deg)',
              }}
              animate={{
                y: ['-100%', '200%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 1.5,
              }}
            />
          ))}
        </div>

        {/* Pulse Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute border-2 border-white/10 rounded-full"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
              }}
              animate={{
                scale: [0.8, 1.5, 0.8],
                opacity: [0.5, 0.1, 0.5],
              }}
              transition={{
                duration: 12 + i * 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2,
              }}
            />
          ))}
        </div>

        {/* Enhanced Glow Effect */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            background: [
              'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 20%, rgba(14, 165, 233, 0.4) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <style jsx>{`
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.7, type: 'spring' }}
            className="inline-flex items-center gap-2 md:gap-3 px-4 py-3 md:px-8 md:py-4 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-2 ring-white/60 mb-6 md:mb-8 hover:shadow-3xl transition-all duration-500 cursor-pointer"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            <div className="flex space-x-1 md:space-x-2">
              <motion.div
                className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
                animate={{ 
                  scale: isAutoPlaying ? [1, 1.4, 1] : 1,
                  opacity: isAutoPlaying ? [1, 0.5, 1] : 0.5
                }}
                transition={{ duration: 2, repeat: isAutoPlaying ? Infinity : 0 }}
              />
              <motion.div
                className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-purple-500 to-sky-500 shadow-lg"
                animate={{ 
                  scale: isAutoPlaying ? [1.4, 1, 1.4] : 1,
                  opacity: isAutoPlaying ? [0.5, 1, 0.5] : 0.5
                }}
                transition={{ duration: 2, repeat: isAutoPlaying ? Infinity : 0, delay: 0.5 }}
              />
            </div>
            <span className="text-xs md:text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 bg-clip-text text-transparent tracking-wider">
              {isAutoPlaying ? 'AUTO ROTATING' : 'CLICK TO PLAY'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-4 md:mb-6"
          >
            Perfect on{' '}
            <motion.span 
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              style={{ backgroundSize: '200% 100%' }}
            >
              Every Device
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 font-medium"
          >
            Experience seamless performance across all devices with our responsive design
            and optimized user interfaces. Interact with the devices below!
          </motion.p>
        </div>

        {/* Enhanced Device Showcase with 3D */}
        <div className="relative" style={{ height: `${height}px` }} ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring' }}
            className="h-full flex items-center justify-center"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Device Container */}
            <div className="relative w-full h-full flex items-center justify-center perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDevice}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.2, rotateY: -180 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {getDeviceFrame(currentData.device)}
                </motion.div>
              </AnimatePresence>

              {/* Enhanced Content Overlay */}
              <motion.div
                key={currentDevice}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center bg-white/95 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-2xl border border-white/60 max-w-md mx-4 transform-gpu"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-xl md:text-3xl font-bold text-slate-900 mb-2">
                  {currentData.label || 'Device Showcase'}
                </h3>
                <p className="text-sm md:text-base text-slate-600 mb-4 leading-relaxed">
                  {currentData.message || 'Experience the perfect design across all devices'}
                </p>

                {/* Enhanced Device Indicator */}
                <div className="flex items-center justify-center space-x-3">
                  {DATA.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setIsAnimating(true)
                        setTimeout(() => {
                          setCurrentDevice(index)
                          setIsAnimating(false)
                        }, 600)
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative p-2 rounded-full transition-all duration-300 ${
                        index === currentDevice
                          ? 'bg-indigo-100'
                          : 'bg-slate-100 hover:bg-slate-200'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        index === currentDevice
                          ? 'bg-indigo-600'
                          : 'bg-slate-400'
                      }`} />
                      {/* Device type indicator */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
                        {(item.device || 'desktop').charAt(0).toUpperCase() + (item.device || 'desktop')?.slice(1)}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Navigation Arrows */}
          <motion.button
            onClick={() => {
              setIsAnimating(true)
              setTimeout(() => {
                setCurrentDevice((prev) => (prev - 1 + DATA.length) % DATA.length)
                setIsAnimating(false)
              }, 600)
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 hover:bg-white transition-all duration-300 flex items-center justify-center group"
            whileHover={{ scale: 1.15, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              className="w-6 h-6 md:w-8 md:h-8 text-slate-700 group-hover:text-indigo-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: -2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>

          <motion.button
            onClick={() => {
              setIsAnimating(true)
              setTimeout(() => {
                setCurrentDevice((prev) => (prev + 1) % DATA.length)
                setIsAnimating(false)
              }, 600)
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 hover:bg-white transition-all duration-300 flex items-center justify-center group"
            whileHover={{ scale: 1.15, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              className="w-6 h-6 md:w-8 md:h-8 text-slate-700 group-hover:text-indigo-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>
        </div>

        {/* Enhanced Device Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24"
        >
          {[
            {
              icon: '💻',
              title: 'Desktop First',
              description: 'Optimized for large screens with full feature access and powerful tools',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: '📱',
              title: 'Mobile Responsive',
              description: 'Perfect touch experience on all mobile devices with smooth animations',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: '📟',
              title: 'Tablet Ready',
              description: 'Adaptive layouts for tablet-sized screens with enhanced productivity',
              color: 'from-green-500 to-emerald-500',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="relative text-center p-6 rounded-2xl bg-white/90 backdrop-blur-lg border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden"
            >
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon with floating animation */}
              <motion.div 
                className="text-4xl mb-4 relative z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
              >
                {feature.icon}
              </motion.div>
              
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 relative z-10">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed relative z-10">
                {feature.description}
              </p>
              
              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                <div className="absolute inset-[2px] rounded-2xl bg-white/90 backdrop-blur-lg" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12 md:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            Experience All Devices
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default EZShowcaseDevicesSection