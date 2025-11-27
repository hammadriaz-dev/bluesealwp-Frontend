'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Clock, Phone } from 'lucide-react'

interface WhatsAppButtonProps {
  phoneNumber: string
  message: string
  companyName: string
  workingHours?: {
    start: number
    end: number
  }
}

export default function WhatsAppButton({ 
  phoneNumber, 
  message, 
  companyName,
  workingHours = { start: 8, end: 18 }
}: WhatsAppButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isWorkingHours, setIsWorkingHours] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkWorkingHours = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentDay = now.getDay()
      
      const isWeekend = currentDay === 5 || currentDay === 6
      
      setIsWorkingHours(
        !isWeekend && 
        currentHour >= workingHours.start && 
        currentHour < workingHours.end
      )
    }

    checkWorkingHours()
    const interval = setInterval(checkWorkingHours, 60000)
    return () => clearInterval(interval)
  }, [workingHours])

  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  const handleClick = () => {
    if (isWorkingHours) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    } else {
      setIsOpen(true)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <>
      <motion.button
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isWorkingHours 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-orange-500 hover:bg-orange-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        
        {isWorkingHours && (
          <motion.div
            className="absolute inset-0 border-2 border-green-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Outside Working Hours
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4 p-3 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-semibold text-orange-900">
                    We're currently offline
                  </p>
                  <p className="text-xs text-orange-700">
                    Working hours: {workingHours.start}:00 - {workingHours.end}:00
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-4">
                Our team at {companyName} will respond to your message when we're back.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
                  }}
                  className="flex-1 bg-green-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Leave Message
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border border-slate-300 text-slate-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}