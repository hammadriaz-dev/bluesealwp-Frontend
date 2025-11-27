'use client'

import { motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  once?: boolean
  amount?: number | 'some' | 'all'
  triggerOnce?: boolean
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = '',
  direction = 'up',
  duration = 0.6,
  once = true,
  amount = 0.3,
  triggerOnce = true
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: once || triggerOnce,
    amount: amount,
  })

  // Animation variants based on direction
  const getVariants = () => {
    const baseTransition = {
      duration: duration,
      ease: "easeOut" as const
    }

    const hiddenTransition = {
      ...baseTransition
    }

    const visibleTransition = {
      ...baseTransition,
      delay: delay
    }

    switch (direction) {
      case 'up':
        return {
          hidden: {
            opacity: 0,
            y: 40
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: visibleTransition
          }
        }
      case 'down':
        return {
          hidden: {
            opacity: 0,
            y: -40
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: visibleTransition
          }
        }
      case 'left':
        return {
          hidden: {
            opacity: 0,
            x: 40
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: visibleTransition
          }
        }
      case 'right':
        return {
          hidden: {
            opacity: 0,
            x: -40
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: visibleTransition
          }
        }
      case 'none':
        return {
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1,
            transition: visibleTransition
          }
        }
      default:
        return {
          hidden: {
            opacity: 0,
            y: 40
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: visibleTransition
          }
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Pre-configured animation components for common use cases
export function FadeInSection({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.6,
  once = true 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideUpSection({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.6,
  once = true 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideInLeftSection({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.6,
  once = true 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SlideInRightSection({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.6,
  once = true 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScaleInSection({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.6,
  once = true 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChildrenSection({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.6,
  once = true 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChild({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Typewriter effect component
export function TypewriterText({ 
  text, 
  delay = 0, 
  className = '',
  duration = 0.05,
  once = true 
}: { 
  text: string
  delay?: number
  className?: string
  duration?: number
  once?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay,
        staggerChildren: duration
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Bounce animation component
export function BounceInSection({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.8,
  once = true 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.68, -0.55, 0.265, 1.55],
        scale: {
          type: "spring",
          damping: 10,
          stiffness: 100
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Flip animation component
export function FlipInSection({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.8,
  once = true 
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateX: 90 }}
      animate={isInView ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: 90 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Custom hook for animation controls
export function useAnimationOnScroll(options: { once?: boolean; amount?: number | 'some' | 'all' } = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, options)

  return { ref, isInView }
}

// HOC for animated sections
export function withAnimation(
  Component: React.ComponentType<any>,
  animationProps: Partial<AnimatedSectionProps> = {}
) {
  return function AnimatedComponent(props: any) {
    return (
      <AnimatedSection {...animationProps}>
        <Component {...props} />
      </AnimatedSection>
    )
  }
}