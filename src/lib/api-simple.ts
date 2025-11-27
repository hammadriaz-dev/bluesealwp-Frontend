// lib/api-simple.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.bluesealwp.ae/api'

export const simpleApi = {
  async request(endpoint: string, options: any = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    console.log(`🔄 Making request to: ${url}`)
    
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers,
      },
      credentials: 'include',
      body: options.body ? JSON.stringify(options.body) : undefined,
    })

    console.log(`📡 Response status: ${response.status}`)
    console.log(`📡 Response URL: ${response.url}`)

    // Get the raw text first
    const rawText = await response.text()
    console.log(`📡 Raw response (first 200 chars):`, rawText.substring(0, 200))

    // Check if it's HTML
    if (rawText.trim().startsWith('<!DOCTYPE') || rawText.trim().startsWith('<html')) {
      throw new Error(`Server returned HTML instead of JSON. This usually means:
1. The route doesn't exist (404)
2. There's a server error
3. You're not authenticated and got redirected to login
      
Full response: ${rawText.substring(0, 500)}`)
    }

    // Try to parse as JSON
    try {
      const data = JSON.parse(rawText)
      return data
    } catch (parseError: unknown) {
      const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown parse error'
      throw new Error(`Failed to parse JSON: ${errorMessage}. Raw: ${rawText.substring(0, 200)}`)
    }
  },

  // Test these endpoints
  async testEndpoints() {
    const endpoints = [
      '/admin/job-positions',
      '/admin/dashboard', 
      '/positions',
      '/admin/check-auth'
    ]

    for (const endpoint of endpoints) {
      try {
        console.log(`\n=== Testing ${endpoint} ===`)
        const result = await this.request(endpoint)
        console.log(`✅ ${endpoint}:`, result)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.error(`❌ ${endpoint}:`, errorMessage)
      }
    }
  }
}