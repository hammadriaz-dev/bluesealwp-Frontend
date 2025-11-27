import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names and merges Tailwind CSS classes properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as currency (USD)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Formats a number with commas
 */
export function formatNumber(number: number): string {
  return new Intl.NumberFormat('en-US').format(number)
}

/**
 * Truncates text to a specified length and adds ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Debounce function to limit how often a function can be called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function to limit function execution rate
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Smooth scroll to an element with offset for fixed header
 */
export function smoothScrollTo(elementId: string, offset: number = 80): void {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Get current year for copyright
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString()
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '')
  
  // Check if the number is 10 digits (US number)
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  // Return original if not a standard US number
  return phoneNumber
}

/**
 * Validate email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (US format)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      return true
    } catch (fallbackErr) {
      return false
    } finally {
      document.body.removeChild(textArea)
    }
  }
}

/**
 * Generate gradient class based on service type for Blue Seal
 */
export function getServiceGradient(serviceType: string): string {
  const gradients: { [key: string]: string } = {
    'waterproofing': 'from-blue-500 to-blue-600',
    'thermal-insulation': 'from-green-500 to-green-600',
    'grp-lining': 'from-purple-500 to-purple-600',
    'roof-systems': 'from-orange-500 to-orange-600',
    'concrete-protection': 'from-teal-500 to-teal-600',
    'injection-treatment': 'from-indigo-500 to-indigo-600',
    'pile-head-treatment': 'from-amber-500 to-amber-600',
    'external-insulation': 'from-cyan-500 to-cyan-600',
    'default': 'from-blue-500 to-cyan-600'
  }
  
  return gradients[serviceType.toLowerCase()] || gradients.default
}

/**
 * Get service background color class for Blue Seal
 */
export function getServiceBgColor(serviceType: string): string {
  const colors: { [key: string]: string } = {
    'waterproofing': 'bg-blue-50',
    'thermal-insulation': 'bg-green-50',
    'grp-lining': 'bg-purple-50',
    'roof-systems': 'bg-orange-50',
    'concrete-protection': 'bg-teal-50',
    'injection-treatment': 'bg-indigo-50',
    'pile-head-treatment': 'bg-amber-50',
    'external-insulation': 'bg-cyan-50',
    'default': 'bg-blue-50'
  }
  
  return colors[serviceType.toLowerCase()] || colors.default
}

/**
 * Get service text color class for Blue Seal
 */
export function getServiceTextColor(serviceType: string): string {
  const colors: { [key: string]: string } = {
    'waterproofing': 'text-blue-600',
    'thermal-insulation': 'text-green-600',
    'grp-lining': 'text-purple-600',
    'roof-systems': 'text-orange-600',
    'concrete-protection': 'text-teal-600',
    'injection-treatment': 'text-indigo-600',
    'pile-head-treatment': 'text-amber-600',
    'external-insulation': 'text-cyan-600',
    'default': 'text-blue-600'
  }
  
  return colors[serviceType.toLowerCase()] || colors.default
}

/**
 * Get service icon based on service type for Blue Seal
 */
export function getServiceIcon(serviceType: string): string {
  const icons: { [key: string]: string } = {
    'waterproofing': '💧',
    'thermal-insulation': '🔥',
    'grp-lining': '🛡️',
    'roof-systems': '🏠',
    'concrete-protection': '🏗️',
    'injection-treatment': '💉',
    'pile-head-treatment': '⚓',
    'external-insulation': '❄️',
    'default': '🔧'
  }
  
  return icons[serviceType.toLowerCase()] || icons.default
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj)
}

/**
 * Format date relative to now (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(dateObj)
}

/**
 * Generate random color (for avatars, etc.) - Blue Seal theme
 */
export function getRandomColor(): string {
  const colors = [
    'bg-blue-500', 'bg-cyan-500', 'bg-teal-500', 'bg-indigo-500',
    'bg-sky-500', 'bg-blue-400', 'bg-cyan-400', 'bg-teal-400'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * Sanitize HTML content (basic)
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Get initial from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Delay function for async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Generate pagination range
 */
export function generatePagination(current: number, total: number): (number | string)[] {
  const delta = 2
  const range: (number | string)[] = []
  const rangeWithDots: (number | string)[] = []

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    }
  }

  let prev: number | null = null
  for (const item of range) {
    const currentItem = item as number
    if (prev !== null) {
      if (currentItem - prev === 2) {
        rangeWithDots.push(prev + 1)
      } else if (currentItem - prev !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(currentItem)
    prev = currentItem
  }

  return rangeWithDots
}

/**
 * Convert string to kebab case
 */
export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

/**
 * Convert string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  )
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.')
  if (lastDotIndex === -1) return ''
  return filename.slice(lastDotIndex + 1)
}

/**
 * Get file size in readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Check if device is iOS
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

/**
 * Check if device is Android
 */
export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false
  
  return /Android/.test(navigator.userAgent)
}

/**
 * Get browser information
 */
export function getBrowserInfo(): { name: string; version: string } {
  if (typeof window === 'undefined') return { name: 'Unknown', version: 'Unknown' }

  const userAgent = navigator.userAgent
  let browserName = 'Unknown'
  let browserVersion = 'Unknown'

  // Detect browser
  if (userAgent.includes('Firefox')) {
    browserName = 'Firefox'
    browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown'
  } else if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browserName = 'Chrome'
    browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown'
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browserName = 'Safari'
    browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown'
  } else if (userAgent.includes('Edg')) {
    browserName = 'Edge'
    browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown'
  }

  return { name: browserName, version: browserVersion }
}

/**
 * Generate a random integer between min and max
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Remove duplicates from array
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as { [key: string]: T[] })
}

/**
 * Sort array by key
 */
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Format budget range for display
 */
export function formatBudget(budget: string): string {
  if (!budget) return 'Not specified'
  
  const ranges: { [key: string]: string } = {
    'under-10k': 'Under $10,000',
    '10k-25k': '$10,000 - $25,000',
    '25k-50k': '$25,000 - $50,000',
    '50k-100k': '$50,000 - $100,000',
    'over-100k': 'Over $100,000',
    'custom': 'Custom Quote'
  }
  
  return ranges[budget] || budget
}

/**
 * Get priority color based on contact age
 */
export function getPriorityColor(createdAt: string): string {
  const created = new Date(createdAt)
  const now = new Date()
  const hoursDiff = (now.getTime() - created.getTime()) / (1000 * 60 * 60)
  
  if (hoursDiff < 24) return 'bg-red-100 text-red-800' // High priority (last 24 hours)
  if (hoursDiff < 72) return 'bg-orange-100 text-orange-800' // Medium priority (1-3 days)
  return 'bg-gray-100 text-gray-800' // Low priority (older than 3 days)
}

/**
 * Calculate response time in business hours
 */
export function calculateResponseTime(createdAt: string, respondedAt?: string): string {
  const created = new Date(createdAt)
  const responded = respondedAt ? new Date(respondedAt) : new Date()
  
  // Simple calculation for demo (in real app, consider business hours)
  const hoursDiff = (responded.getTime() - created.getTime()) / (1000 * 60 * 60)
  
  if (hoursDiff < 1) return '< 1 hour'
  if (hoursDiff < 24) return `${Math.floor(hoursDiff)} hours`
  return `${Math.floor(hoursDiff / 24)} days`
}

/**
 * Generate contact status badge
 */
export function getContactStatus(contact: any): { text: string; color: string } {
  if (contact.responded_at) {
    return { text: 'Responded', color: 'bg-green-100 text-green-800' }
  }
  
  const created = new Date(contact.created_at)
  const now = new Date()
  const hoursDiff = (now.getTime() - created.getTime()) / (1000 * 60 * 60)
  
  if (hoursDiff < 24) {
    return { text: 'New', color: 'bg-blue-100 text-blue-800' }
  } else if (hoursDiff < 72) {
    return { text: 'Pending', color: 'bg-orange-100 text-orange-800' }
  } else {
    return { text: 'Overdue', color: 'bg-red-100 text-red-800' }
  }
}

/**
 * Extract email domain for analytics
 */
export function getEmailDomain(email: string): string {
  return email.split('@')[1] || 'unknown'
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  service: string;
  message: string;
  phone?: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data.name?.trim()) errors.push('Name is required')
  if (!data.email?.trim()) errors.push('Email is required')
  if (!validateEmail(data.email)) errors.push('Valid email is required')
  if (!data.service?.trim()) errors.push('Service is required')
  if (!data.message?.trim()) errors.push('Message is required')
  if (data.phone && !validatePhone(data.phone)) errors.push('Valid phone number is required')
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Generate contact analytics data
 */
/**
 * Generate contact analytics data
 */
export function generateContactAnalytics(contacts: any[]) {
  // Fix for service counts - use string key
  const serviceCounts = groupBy(contacts, 'service')
  
  // Fix for monthly counts - create a monthYear property first, then group by it
  const contactsWithMonth = contacts.map(contact => ({
    ...contact,
    monthYear: new Date(contact.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })
  }))
  
  const monthlyCounts = groupBy(contactsWithMonth, 'monthYear')
  
  return {
    total: contacts.length,
    byService: Object.entries(serviceCounts).map(([service, items]) => ({
      service,
      count: items.length,
      percentage: Math.round((items.length / contacts.length) * 100)
    })),
    byMonth: Object.entries(monthlyCounts).map(([month, items]) => ({
      month,
      count: items.length
    })),
    withPhone: contacts.filter(c => c.phone).length,
    withCompany: contacts.filter(c => c.company).length
  }
}

// Export all utility functions
export default {
  cn,
  formatCurrency,
  formatNumber,
  truncateText,
  generateId,
  debounce,
  throttle,
  smoothScrollTo,
  isInViewport,
  getCurrentYear,
  formatPhoneNumber,
  validateEmail,
  validatePhone,
  copyToClipboard,
  getServiceGradient,
  getServiceBgColor,
  getServiceTextColor,
  getServiceIcon,
  calculateReadingTime,
  formatDate,
  formatRelativeTime,
  getRandomColor,
  sanitizeHtml,
  getInitials,
  delay,
  generatePagination,
  toKebabCase,
  toTitleCase,
  getFileExtension,
  formatFileSize,
  isMobileDevice,
  isIOS,
  isAndroid,
  getBrowserInfo,
  getRandomInt,
  shuffleArray,
  removeDuplicates,
  groupBy,
  sortBy,
  formatBudget,
  getPriorityColor,
  calculateResponseTime,
  getContactStatus,
  getEmailDomain,
  validateContactForm,
  generateContactAnalytics
}