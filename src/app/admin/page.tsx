'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { apiService } from '@/lib/api'
import ApiDebugger from '@/components/ApiDebugger'
import { 
  Mail, 
  MessageCircle,
  RefreshCw,
  AlertCircle,
  User,
  Phone,
  Calendar,
  ArrowUpRight,
  Search,
  Filter,
  Download
} from 'lucide-react'

interface ContactSubmission {
  id: number
  name: string
  email: string
  phone?: string
  service: string
  message?: string
  created_at: string
}

interface DashboardStats {
  total_contacts: number
  recent_contacts: ContactSubmission[]
}

export default function AdminDashboard() {
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDebugger, setShowDebugger] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterService, setFilterService] = useState('all')
  const prevStatsRef = useRef<{ contacts: number } | null>(null)

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      loadDashboardStats()
      
      // Set up polling every 30 seconds for real-time updates
      const interval = setInterval(() => {
        loadDashboardStats()
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [isAuthenticated, authLoading])

  const loadDashboardStats = async () => {
    try {
      setError(null)
      console.log('🔄 Loading dashboard stats...')
      console.log('🔐 Auth state:', { isAuthenticated, authLoading })
      console.log('🔐 Token available:', !!localStorage.getItem('admin-token'))
      
      const data = await apiService.getDashboard()
      console.log('📊 API Response data:', data)
      
      // Handle different response formats
      let dashboardData: DashboardStats
      
      if (data && data.success && data.data) {
        // Format: { success: true, data: { ... } }
        dashboardData = data.data
      } else if (data && data.total_contacts !== undefined) {
        // Format: { total_contacts: number, recent_contacts: [...] }
        dashboardData = data
      } else if (Array.isArray(data)) {
        // If data is directly an array, assume it's recent_contacts
        dashboardData = {
          total_contacts: data.length,
          recent_contacts: data
        }
      } else {
        throw new Error('Unexpected response format from server')
      }

      // Check for new submissions for notifications
      const prevContacts = prevStatsRef.current?.contacts || 0
      
      if (prevStatsRef.current) {
        console.log('Stats comparison:', {
          prevContacts,
          newContacts: dashboardData.total_contacts,
        })
      }
      
      // Update previous stats reference
      prevStatsRef.current = {
        contacts: dashboardData.total_contacts || 0
      }
      
      setStats(dashboardData)
    } catch (error: unknown) {
      console.error('❌ Error loading dashboard stats:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to load dashboard'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Filter and search contacts
  const filteredContacts = stats?.recent_contacts?.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.phone && contact.phone.includes(searchTerm))
    
    const matchesFilter = filterService === 'all' || contact.service === filterService
    
    return matchesSearch && matchesFilter
  }) || []

  // Get unique services for filter
  const services = ['all', ...new Set(stats?.recent_contacts?.map(contact => contact.service) || [])]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return formatDate(dateString)
  }

  // Show auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  // Show unauthorized state
  if (!isAuthenticated && !authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Authentication Required</h2>
            <p className="text-red-700 mb-4">Please log in to access the dashboard</p>
            <Link 
              href="/admin/login"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-lg font-semibold text-red-800">Error Loading Dashboard</h2>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <div className="space-x-4">
              <button
                onClick={loadDashboardStats}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </button>
              <button
                onClick={() => setShowDebugger(!showDebugger)}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                {showDebugger ? 'Hide' : 'Show'} Debugger
              </button>
            </div>
          </div>

          {showDebugger && (
            <div className="mt-6">
              <ApiDebugger />
            </div>
          )}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
            <p className="text-gray-600 mt-2">Manage and review all contact form submissions</p>
            {user && (
              <p className="text-sm text-gray-500 mt-1">
                Welcome back, {user.name}
              </p>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={loadDashboardStats}
              className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={() => setShowDebugger(!showDebugger)}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
            >
              {showDebugger ? 'Hide Debugger' : 'Show Debugger'}
            </button>
          </div>
        </div>

        {/* Debugger */}
        {showDebugger && (
          <div className="mb-8">
            <ApiDebugger />
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Submissions Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_contacts ?? 0}</p>
                <p className="text-xs text-gray-500 mt-1">All time contact submissions</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Submissions</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats?.recent_contacts?.length ?? 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quick Actions</p>
                <p className="text-lg font-semibold text-gray-900 mt-2">Manage Submissions</p>
                <p className="text-xs text-gray-500 mt-1">View and respond to inquiries</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {services.map(service => (
                  <option key={service} value={service}>
                    {service === 'all' ? 'All Services' : service}
                  </option>
                ))}
              </select>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Recent Contacts Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Contact Submissions</h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  Showing {filteredContacts.length} of {stats?.recent_contacts?.length || 0}
                </span>
                <Link 
                  href="/admin/contacts" 
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div key={contact.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Contact Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {contact.name}
                            </p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {contact.service}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail className="h-3 w-3 mr-1" />
                              <span className="truncate">{contact.email}</span>
                            </div>
                            {contact.phone && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Phone className="h-3 w-3 mr-1" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {contact.message && (
                        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                          {contact.message}
                        </p>
                      )}
                    </div>

                    {/* Date and Actions */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatRelativeTime(contact.created_at)}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/contacts/${contact.id}`}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </Link>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Mark Read
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No contact submissions found</p>
                <p className="text-gray-400 text-sm">
                  {searchTerm || filterService !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'No submissions have been received yet'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/admin/contacts"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <Mail className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-700">All Messages</p>
                  <p className="text-sm text-gray-500">View all contact submissions</p>
                </div>
              </Link>
              
              <Link
                href="/admin/contacts/export"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
              >
                <Download className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-green-700">Export Data</p>
                  <p className="text-sm text-gray-500">Download submissions as CSV</p>
                </div>
              </Link>
              
              <Link
                href="/admin/settings"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
              >
                <Filter className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-purple-700">Settings</p>
                  <p className="text-sm text-gray-500">Configure contact forms</p>
                </div>
              </Link>
              
              <Link
                href="/"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors group"
              >
                <ArrowUpRight className="h-6 w-6 text-orange-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-orange-700">View Site</p>
                  <p className="text-sm text-gray-500">Go to main website</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}