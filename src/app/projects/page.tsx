'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Award,
  CheckCircle,
  ExternalLink,
  Filter,
  Search,
  ChevronDown,
  Droplets,
  Thermometer,
  Wrench,
  SprayCan,
  Home,
  Globe,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react'

// Project data from PDF
const projectsData = [
  {
    id: 1,
    title: 'Presidential Guard Command (PGC)',
    description: 'Complete GRP Lining Works for presidential facilities with 10-year guarantee and maintenance.',
    category: 'grp-lining',
    client: 'Presidential Guard Command',
    contractor: 'Emirates CODE Contracting Company',
    consultant: 'Al Salaam Consulting Architects',
    location: 'Abu Dhabi',
    year: '2019',
    duration: '6 months',
    scope: 'Complete GRP Lining Works and associated works',
    warranty: '10 Years',
    features: [
      'GRP Lining Installation',
      'Structural Strengthening',
      'Corrosion Protection',
      '10-Year Maintenance'
    ],
    technologies: ['GRP Lamination', 'Chemical Resistant Coating', 'Structural Reinforcement'],
    image: '/images/projects/project-1.jpeg',
    status: 'completed',
    size: 'Large',
    value: 'Premium'
  },
  {
    id: 2,
    title: 'Al Waleed Thanaya Mall',
    description: 'GRP Lining for water tanks and waterproofing systems in commercial mall complex.',
    category: 'grp-lining',
    client: 'Al Waleed Thanaya Mall',
    contractor: 'SAM Building Contracting LLC',
    consultant: 'Al Maktab Al Asri Engineering Consultant',
    location: 'Umm Suqeim Second',
    year: '2020',
    duration: '4 months',
    scope: 'GRP Lining for Water Tanks',
    warranty: '5 Years',
    features: [
      'Non-toxic Certified Materials',
      '4mm GRP Thickness',
      'Water Tank Lining',
      'Quality Assurance'
    ],
    technologies: ['4mm GRP Lamination', 'Non-toxic Resin', 'Quality Certification'],
    image: '/images/projects/project-2.jpeg',
    status: 'completed',
    size: 'Large',
    value: 'High'
  },
  {
    id: 3,
    title: 'Jebel Ali Labour Accommodation',
    description: 'Multiple labour accommodation projects with comprehensive GRP lining and waterproofing solutions.',
    category: 'grp-lining',
    client: 'Various Clients',
    contractor: 'Multiple Contractors',
    consultant: 'Al Aimi Engineering Consultants',
    location: 'Jebel Ali',
    year: '2019',
    duration: '3-6 months',
    scope: 'GRP Lining for Water Tanks & Holding Tanks',
    warranty: '5 Years',
    features: [
      'Internal Waterproofing',
      'Water Tank Protection',
      'Holding Tank Lining',
      'Quality Workmanship'
    ],
    technologies: ['GRP Lining', 'Waterproofing', 'Tank Protection'],
    image: '/images/projects/project-3.jpeg',
    status: 'completed',
    size: 'Medium',
    value: 'Standard'
  },
  {
    id: 4,
    title: 'Cold Store and Office Complex',
    description: 'Specialized GRP lining works for cold storage facility with temperature resistance.',
    category: 'grp-lining',
    client: 'Confidential',
    contractor: 'Space Max Contracting LLC',
    consultant: 'Arktion Engineering Consultants',
    location: 'Dubai',
    year: '2019',
    duration: '5 months',
    scope: 'GRP Lining for Industrial Application',
    warranty: '7 Years',
    features: [
      'Temperature Resistance',
      'Industrial Grade Lining',
      'Chemical Protection',
      'Long-term Durability'
    ],
    technologies: ['Industrial GRP', 'Temperature Resistant', 'Chemical Protection'],
    image: '/images/projects/project-4.jpeg',
    status: 'completed',
    size: 'Medium',
    value: 'High'
  },
  {
    id: 5,
    title: 'Residential Tower Waterproofing',
    description: 'Comprehensive waterproofing solutions for high-rise residential tower.',
    category: 'waterproofing',
    client: 'Private Developer',
    contractor: 'Multiple Contractors',
    consultant: 'Various Consultants',
    location: 'Dubai',
    year: '2018-2020',
    duration: 'Various',
    scope: 'Complete Building Waterproofing',
    warranty: '10 Years',
    features: [
      'Membrane Waterproofing',
      'Injection Systems',
      'Terrace Protection',
      'Basement Waterproofing'
    ],
    technologies: ['Membrane Systems', 'Injection Treatment', 'Cementitious Coating'],
    image: '/images/projects/project-5.jpeg',
    status: 'completed',
    size: 'Large',
    value: 'Premium'
  },
  {
    id: 6,
    title: 'Industrial Tank Lining Projects',
    description: 'Multiple industrial tank lining projects for chemical and water storage facilities.',
    category: 'grp-lining',
    client: 'Various Industrial Clients',
    contractor: 'Multiple Contractors',
    consultant: 'Engineering Consultants',
    location: 'Across UAE',
    year: '2018-2021',
    duration: '2-4 months',
    scope: 'Tank Lining & Protection',
    warranty: '5-10 Years',
    features: [
      'Chemical Resistance',
      'Structural Integrity',
      'Long-term Protection',
      'Custom Solutions'
    ],
    technologies: ['GRP Lining', 'Chemical Resistant', 'Custom Engineering'],
    image: '/images/projects/project-6.jpeg',
    status: 'completed',
    size: 'Various',
    value: 'High'
  },
  {
    id: 7,
    title: 'Green Roof System Installation',
    description: 'COMBO roof system installation with energy savings.',
    category: 'green-roof',
    client: 'Commercial Building Owners',
    contractor: 'Various Contractors',
    consultant: 'Multiple Consultants',
    location: 'Dubai & Northern Emirates',
    year: '2019-2022',
    duration: '3-6 months',
    scope: 'Complete Roofing System',
    warranty: '25 Years',
    features: [
      '40% Energy Savings',
      'Perfect Waterproofing',
      'Thermal Insulation',
      'Cost Effective'
    ],
    technologies: ['Polyurethane Foam', 'Acrylic Waterproofing', 'Spray Technology'],
    image: '/images/projects/project-7.jpeg',
    status: 'completed',
    size: 'Large',
    value: 'Premium'
  },
  {
    id: 8,
    title: 'Mosque Construction Projects',
    description: 'Waterproofing and GRP lining works for mosque projects.',
    category: 'waterproofing',
    client: 'Various Mosque Committees',
    contractor: 'Local Contractors',
    consultant: 'Engineering Consultants',
    location: 'Across Dubai',
    year: '2018-2020',
    duration: '2-4 months',
    scope: 'Religious Building Protection',
    warranty: '5 Years',
    features: [
      'Cultural Sensitivity',
      'Quality Materials',
      'Timely Completion',
      'Community Focus'
    ],
    technologies: ['GRP Lining', 'Membrane Waterproofing', 'Quality Assurance'],
    image: '/images/projects/project-8.jpeg',
    status: 'completed',
    size: 'Medium',
    value: 'Standard'
  }
]


const categories = [
  { id: 'all', name: 'All Projects', icon: Building, count: projectsData.length },
  { id: 'grp-lining', name: 'GRP Lining', icon: ShieldCheck, count: projectsData.filter(p => p.category === 'grp-lining').length },
  { id: 'waterproofing', name: 'Waterproofing', icon: Droplets, count: projectsData.filter(p => p.category === 'waterproofing').length },
  { id: 'green-roof', name: 'Green Roof Systems', icon: Thermometer, count: projectsData.filter(p => p.category === 'green-roof').length }
]

const filters = {
  size: ['All', 'Small', 'Medium', 'Large'],
  value: ['All', 'Standard', 'High', 'Premium'],
  year: ['All', '2018', '2019', '2020', '2021', '2022']
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedValue, setSelectedValue] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Filter projects based on selections
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const matchesSize = selectedSize === 'All' || project.size === selectedSize
      const matchesValue = selectedValue === 'All' || project.value === selectedValue
      const matchesYear = selectedYear === 'All' || project.year === selectedYear
      const matchesSearch = searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSize && matchesValue && matchesYear && matchesSearch
    })
  }, [selectedCategory, selectedSize, selectedValue, selectedYear, searchQuery])

  const resetFilters = () => {
    setSelectedCategory('all')
    setSelectedSize('All')
    setSelectedValue('All')
    setSelectedYear('All')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/30 to-sky-50/30">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-700">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center text-white">
              <Link
                href="/"
                className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Our <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Projects</span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Explore our portfolio of successful waterproofing and insulation projects
                across the UAE, showcasing our expertise and commitment to quality.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                {[
                  { value: '50+', label: 'Projects Completed' },
                  { value: '25+', label: 'Years Experience' },
                  { value: '100%', label: 'Client Satisfaction' },
                  { value: '10+', label: 'Cities Covered' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Filter Toggle for Mobile */}
            <div className="lg:hidden w-full">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Filter className="h-4 w-4" />
                  Filters
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Filters - Desktop */}
            <div className="hidden lg:flex items-center gap-4 flex-wrap">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {filters.size.map(size => (
                  <option key={size} value={size}>Size: {size}</option>
                ))}
              </select>

              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {filters.value.map(value => (
                  <option key={value} value={value}>Value: {value}</option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                {filters.year.map(year => (
                  <option key={year} value={year}>Year: {year}</option>
                ))}
              </select>

              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="lg:hidden mt-4 space-y-4"
            >
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {filters.size.map(size => (
                  <option key={size} value={size}>Size: {size}</option>
                ))}
              </select>

              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {filters.value.map(value => (
                  <option key={value} value={value}>Value: {value}</option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {filters.year.map(year => (
                  <option key={year} value={year}>Year: {year}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 border border-gray-300 rounded-xl"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="font-medium">{category.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${selectedCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                    }`}>
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No projects found</h3>
                <p className="text-gray-600 mb-8">Try adjusting your filters or search terms</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  Reset Filters
                </button>
              </div>
            </AnimatedSection>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Projects' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <span className="text-gray-600">{filteredProjects.length} projects</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <AnimatedSection key={project.id} delay={0.1 * index}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/60"
                    >
                      {/* Project Image */}
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-cyan-100 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.value === 'Premium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : project.value === 'High'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                            {project.value}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                            {project.size}
                          </span>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {project.title}
                          </h3>
                          <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Project Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{project.year} • {project.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <ShieldCheck className="h-4 w-4 mr-2 text-blue-600" />
                            <span>Warranty: {project.warranty}</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                          <div className="space-y-1">
                            {project.features.slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex items-center text-xs text-gray-600">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Client Info */}
                        <div className="border-t border-gray-200 pt-4">
                          <div className="text-xs text-gray-500 space-y-1">
                            <div><strong>Client:</strong> {project.client}</div>
                            <div><strong>Contractor:</strong> {project.contractor}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your waterproofing and insulation needs. Get a free consultation
              and quote for your next project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-blue-600 bg-white hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Project
                <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-transparent hover:bg-white/10 transition-all duration-300 border-2 border-white"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-8 text-blue-200 text-sm">
              <p>Contact us:</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}