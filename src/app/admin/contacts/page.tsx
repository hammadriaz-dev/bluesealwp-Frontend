'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, Building, Calendar, Trash2, Eye, Search, Filter, Download } from 'lucide-react'
import { apiService } from '@/lib/api'
import { formatDate, formatRelativeTime, getServiceBgColor, getServiceTextColor, getInitials } from '@/lib/utils'

interface Contact {
  id: number
  name: string
  email: string
  company: string | null
  phone: string | null
  service: string
  budget: string | null
  message: string
  created_at: string
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterService, setFilterService] = useState('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadContacts()
  }, [])

const loadContacts = async () => {
  try {
    setError(null)
    setLoading(true)
    console.log('🔄 Loading contacts...')
    
    const result = await apiService.getContacts({
      search: searchTerm,
      service: filterService,
      sortBy: sortBy
    })
    
    console.log('📡 Contacts API response:', result)
    
    // Handle paginated Laravel response
    let contactsData: Contact[] = []

    if (result && result.success && result.data && Array.isArray(result.data.data)) {
      console.log('✅ Handling paginated Laravel response')
      contactsData = result.data.data
      console.log(`✅ Loaded ${contactsData.length} contacts from paginated response`)
    } else if (result && result.data && Array.isArray(result.data)) {
      console.log('✅ Handling simple data array response')
      contactsData = result.data
    } else if (Array.isArray(result)) {
      console.log('✅ Handling direct array response')
      contactsData = result
    } else {
      console.error('❌ Unexpected response format:', result)
      setError('Unexpected response format from server')
      setContacts([])
      return
    }
    
    console.log(`✅ Total loaded: ${contactsData.length} contacts`)
    setContacts(contactsData)
    
  } catch (error: any) {
    console.error('❌ Error loading contacts:', error)
    setError(error.message || 'Failed to load contacts')
    setContacts([])
  } finally {
    setLoading(false)
  }
}

  const deleteContact = async (id: number) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        const result = await apiService.deleteContact(id)
        console.log('🗑️ Delete response:', result)
        
        if (result && (result.success === true || result.success === undefined)) {
          loadContacts() // Reload the list
        } else {
          setError(result?.message || 'Failed to delete contact')
        }
      } catch (error: any) {
        console.error('Error deleting contact:', error)
        setError(error.message || 'Failed to delete contact')
      }
    }
  }

  const deleteMultipleContacts = async (ids: number[]) => {
    if (confirm(`Are you sure you want to delete ${ids.length} contacts?`)) {
      try {
        const result = await apiService.deleteMultipleContacts(ids)
        if (result && (result.success === true || result.success === undefined)) {
          loadContacts()
        } else {
          setError(result?.message || 'Failed to delete contacts')
        }
      } catch (error: any) {
        console.error('Error deleting contacts:', error)
        setError(error.message || 'Failed to delete contacts')
      }
    }
  }

  const exportContacts = async () => {
    try {
      const result = await apiService.exportContacts('csv')
      // Handle export result (download file)
      if (result && result.success) {
        // Create download link for the exported file
        const blob = new Blob([result.data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `contacts-export-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        setError('Failed to export contacts: Invalid response format')
      }
    } catch (error: any) {
      console.error('Error exporting contacts:', error)
      setError(error.message || 'Failed to export contacts')
    }
  }

  const markAsRead = async (id: number) => {
    try {
      await apiService.markContactAsRead(id)
      loadContacts() // Reload to update status
    } catch (error: any) {
      console.error('Error marking contact as read:', error)
      setError(error.message || 'Failed to update contact')
    }
  }

  const markAsUnread = async (id: number) => {
    try {
      await apiService.markContactAsUnread(id)
      loadContacts() // Reload to update status
    } catch (error: any) {
      console.error('Error marking contact as unread:', error)
      setError(error.message || 'Failed to update contact')
    }
  }

  // Get unique services for filter
  const services = ['all', ...new Set(contacts.map(contact => contact.service))]

  // Filter contacts locally if API doesn't support filtering
  const filteredContacts = contacts
    .filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.phone && contact.phone.includes(searchTerm)) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(contact => filterService === 'all' || contact.service === filterService)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      }
    })

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
        <p className="text-gray-600">Manage all contact form submissions</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
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

      {/* Search and Filter Bar */}
      <div className="mb-6 bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search contacts by name, email, phone, company, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && loadContacts()}
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <button
              onClick={loadContacts}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Apply
            </button>
            <button
              onClick={exportContacts}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Contact Submissions ({filteredContacts.length})
            </h3>
            <div className="text-sm text-gray-500">
              Showing {filteredContacts.length} of {contacts.length}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div key={contact.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {getInitials(contact.name)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-semibold text-gray-900">{contact.name}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getServiceBgColor(contact.service)} ${getServiceTextColor(contact.service)}`}>
                          {contact.service}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {contact.phone}
                          </div>
                        )}
                        {contact.company && (
                          <div className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            {contact.company}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatRelativeTime(contact.created_at)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
                
                {contact.message && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 line-clamp-2 bg-gray-50 p-3 rounded-lg">
                      {contact.message}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-500">
                {searchTerm || filterService !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Contact form submissions will appear here.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
                <p className="text-gray-600">Complete submission information</p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Header with Avatar */}
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">
                    {getInitials(selectedContact.name)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h3>
                  <p className="text-blue-600">{selectedContact.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="flex items-center text-gray-900 bg-gray-50 p-3 rounded-lg">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedContact.phone || 'Not provided'}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <div className="flex items-center text-gray-900 bg-gray-50 p-3 rounded-lg">
                      <Building className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedContact.company || 'Not provided'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                    <div className={`text-gray-900 ${getServiceBgColor(selectedContact.service)} p-3 rounded-lg border ${getServiceTextColor(selectedContact.service)} border-current`}>
                      <span className="font-medium">{selectedContact.service}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedContact.budget || 'Not specified'}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Submitted {formatDate(selectedContact.created_at)}
                </div>
                <div className="text-sm text-gray-500">
                  ID: #{selectedContact.id}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedContact(null)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedContact.email}?subject=Re: Your inquiry about ${selectedContact.service}&body=Dear ${selectedContact.name},%0D%0A%0D%0AThank you for your interest in our ${selectedContact.service} services.`}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg font-medium"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}