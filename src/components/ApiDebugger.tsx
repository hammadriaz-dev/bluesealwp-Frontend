'use client'

import { useState, useEffect } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface TestResult {
  endpoint: string
  method: string
  status: number | string
  statusText?: string
  isJson: boolean
  contentType: string | null
  response: string
  url: string
  error?: string
}

export default function ApiDebugger() {
  const [results, setResults] = useState<TestResult[]>([])

  const testEndpoint = async (endpoint: string, method: string = 'GET') => {
    try {
      console.log(`Testing: ${method} ${endpoint}`)
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      })

      const text = await response.text()
      let jsonData = null
      let isJson = false

      try {
        jsonData = JSON.parse(text)
        isJson = true
      } catch {
        isJson = false
      }

      const result: TestResult = {
        endpoint,
        method,
        status: response.status,
        statusText: response.statusText,
        isJson,
        contentType: response.headers.get('content-type'),
        response: text.substring(0, 500),
        url: response.url,
      }

      setResults(prev => [result, ...prev])
      console.log('Test result:', result)

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      const result: TestResult = {
        endpoint,
        method,
        status: 'ERROR',
        isJson: false,
        contentType: null,
        response: '',
        url: '',
        error: errorMessage,
      }
      setResults(prev => [result, ...prev])
      console.log('Test error:', error)
    }
  }

  useEffect(() => {
    // Test all relevant endpoints
    const testAll = async () => {
      await testEndpoint('/admin/job-positions')
      await testEndpoint('/admin/dashboard')
      await testEndpoint('/admin/check-auth')
      await testEndpoint('/positions') // public route
      await testEndpoint('/admin/login', 'POST') // test POST
    }

    testAll()
  }, [])

  return (
    <div className="p-4 bg-gray-100 border rounded-lg">
      <h2 className="text-lg font-bold mb-4">API Debugger</h2>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className={`p-3 border rounded ${result.status === 200 ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="font-mono text-sm">
              <div><strong>Endpoint:</strong> {result.method} {result.endpoint}</div>
              <div><strong>Status:</strong> {result.status} {result.statusText}</div>
              <div><strong>Content-Type:</strong> {result.contentType}</div>
              <div><strong>Is JSON:</strong> {result.isJson ? '✅ Yes' : '❌ No'}</div>
              {result.error && <div><strong>Error:</strong> {result.error}</div>}
              <div><strong>Response Preview:</strong> {result.response}</div>
              <div><strong>URL:</strong> {result.url}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <button
          onClick={() => testEndpoint('/admin/job-positions')}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Test Job Positions
        </button>
        <button
          onClick={() => testEndpoint('/positions')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Test Public Positions
        </button>
      </div>
    </div>
  )
}