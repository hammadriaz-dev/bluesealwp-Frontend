'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { apiService } from '@/lib/api'
import { 
  BarChart3, 
  Users, 
  Mail, 
  TrendingUp, 
  Calendar,
  Download,
  RefreshCw,
  AlertCircle
} from 'lucide-react'

interface AnalyticsData {
  total_contacts: number
  contacts_by_service: Array<{
    service: string
    count: number
  }>
  contacts_by_month: Array<{
    month: string
    count: number
  }>
  recent_activity: Array<{
    id: number
    name: string
    email: string
    service: string
    created_at: string
  }>
}

export default function AdminAnalytics() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>('30days')

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      loadAnalytics()
    }
  }, [isAuthenticated, authLoading, timeRange])

  const loadAnalytics = async () => {
    try {
      setError(null)
      setLoading(true)
      
      const result = await apiService.getContactTrends(timeRange)
      
      if (result && result.success && result.data) {
        setAnalytics(result.data)
      } else if (result && Array.isArray(result)) {
        // Handle direct data response
        setAnalytics(result as any)
      } else {
        throw new Error('Unexpected response format')
      }
    } catch (error: any) {
      console.error('Error loading analytics:', error)
      setError(error.message || 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  const exportAnalytics = async () => {
    try {
      // Implement export functionality
      console.log('Exporting analytics...')
    } catch (error: any) {
      console.error('Error exporting analytics:', error)
      setError(error.message || 'Failed to export analytics')
    }
  }

  if (authLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Authentication Required</h2>
          <p className="text-red-700">Please log in to access analytics</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track contact submissions and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <button
            onClick={loadAnalytics}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={exportAnalytics}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-600 font-medium">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Contacts */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Contacts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.total_contacts ?? 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">All time submissions</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Services</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.contacts_by_service?.length ?? 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">Active services</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Growth Indicator */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trend</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">+12%</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {analytics?.recent_activity?.length ?? 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">New submissions</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacts by Service</h3>
          <div className="space-y-3">
            {analytics?.contacts_by_service?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.service}</span>
                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              </div>
            )) || (
              <p className="text-gray-500 text-center py-4">No service data available</p>
            )}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <div className="space-y-3">
            {analytics?.contacts_by_month?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.month}</span>
                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              </div>
            )) || (
              <p className="text-gray-500 text-center py-4">No trend data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {analytics?.recent_activity?.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {contact.service}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )) || (
              <p className="text-gray-500 text-center py-8">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}