'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { 
  LayoutDashboard, 
  Mail, 
  Settings,
  Menu,
  X,
  LogOut,
  MessageCircle,
  Users,
  BarChart3
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Contact Submissions', href: '/admin/contacts', icon: Mail },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    await logout()
    setSidebarOpen(false)
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    }
    if (user?.email) {
      return user.email[0].toUpperCase()
    }
    return 'A'
  }

  // Get current page title
  const getCurrentPageTitle = () => {
    return navigation.find(item => item.href === pathname || pathname.startsWith(`${item.href}/`))?.name || 'Admin'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-xl pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <span className="text-lg font-bold text-gray-900">Blue Seal</span>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>

          {/* User Info */}
          <div className="px-6 mt-6 mb-4">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-sm font-bold text-white">
                  {getUserInitials()}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {user?.email || 'admin@blueseal.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex-1 flex flex-col">
            <ul className="flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-100'
                      }`}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'
                      }`} />
                      {item.name}
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Logout */}
            <div className="px-4 mt-auto mb-4">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200 group"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
                Logout
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <LogOut className="h-4 w-4" />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 flex z-40">
            <div className="fixed inset-0 bg-blue-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl">
              <div className="absolute top-0 right-0 -mr-12 pt-4">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-6">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <span className="text-lg font-bold text-gray-900">Blue Seal</span>
                    <p className="text-xs text-gray-500">Admin Portal</p>
                  </div>
                </div>

                {/* Mobile User Info */}
                <div className="px-6 mt-6 mb-4">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-sm font-bold text-white">
                        {getUserInitials()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.name || 'Admin User'}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {user?.email || 'admin@blueseal.com'}
                      </p>
                    </div>
                  </div>
                </div>

                <nav className="mt-4 px-4 space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-100'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <item.icon className={`mr-3 h-5 w-5 ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'
                        }`} />
                        {item.name}
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                        )}
                      </Link>
                    )
                  })}
                  
                  {/* Mobile Logout */}
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 border border-transparent hover:border-red-200 group"
                  >
                    <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-20 bg-white/80 backdrop-blur-md border-b border-gray-200/50 lg:border-none shadow-sm">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden hover:bg-blue-50 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 flex justify-between px-6 sm:px-8 lg:px-8">
            <div className="flex-1 flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg shadow-lg mr-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {getCurrentPageTitle()}
                </h1>
                <p className="text-sm text-gray-600">
                  Manage contact submissions and customer inquiries
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {/* User menu */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex flex-col items-end">
                  <div className="text-sm font-semibold text-gray-900">
                    {user?.name || 'Admin User'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.email || 'admin@blueseal.com'}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    <span className="text-sm font-bold text-white">
                      {getUserInitials()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}