const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bluesealwp.ae/api';

class ApiService {
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin-token');
    }
    return null;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`🔄 API Call: ${options.method || 'GET'} ${url}`);
      const response = await fetch(url, config);
      
      console.log(`📡 Response Status: ${response.status}`);
      console.log(`📡 Response URL: ${response.url}`);
      
      // Handle unauthorized responses
      if (response.status === 401) {
        this.handleUnauthorized();
        throw new Error('Unauthenticated');
      }

      if (response.status === 419) {
        // Session expired
        this.handleUnauthorized();
        throw new Error('Session expired');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      
      if (!text) {
        return {};
      }

      return JSON.parse(text);
    } catch (error: unknown) {
      console.error('❌ API request failed:', error);
      throw error;
    }
  }

  private handleUnauthorized(): void {
    // Clear auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin-token');
      localStorage.removeItem('admin-authenticated');
      localStorage.removeItem('admin-user');
      
      // Dispatch event for components to handle
      window.dispatchEvent(new CustomEvent('auth-required'));
    }
  }

  // ========================
  // AUTHENTICATION METHODS
  // ========================
  async adminLogin(credentials: { email: string; password: string }) {
    const result = await this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (result.success && result.token) {
      // Store the token
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin-token', result.token);
        localStorage.setItem('admin-authenticated', 'true');
        localStorage.setItem('admin-user', JSON.stringify(result.user));
      }
    }
    
    return result;
  }

  async adminLogout() {
    try {
      const result = await this.request('/admin/logout', {
        method: 'POST',
      });
      return result;
    } finally {
      // Always clear local storage
      this.handleUnauthorized();
    }
  }

  async checkAuth() {
    try {
      return await this.request('/admin/check-auth');
    } catch (error) {
      this.handleUnauthorized();
      throw error;
    }
  }

  // ========================
  // PROTECTED METHODS
  // ========================
  private async protectedRequest(endpoint: string, options: RequestInit = {}) {
    // Check if we have a token
    const token = this.getAuthToken();
    if (!token) {
      this.handleUnauthorized();
      throw new Error('No authentication token found');
    }
    
    return this.request(endpoint, options);
  }

  // ========================
  // DASHBOARD & ANALYTICS METHODS
  // ========================
  async getDashboard() {
    return this.protectedRequest('/admin/dashboard');
  }

  async getContactStats() {
    return this.protectedRequest('/admin/contact-stats');
  }

  async getServiceAnalytics() {
    return this.protectedRequest('/admin/service-analytics');
  }

  // ========================
  // CONTACT METHODS - ADD THE MISSING ONES HERE
  // ========================
  async getContacts(params?: {
    page?: number;
    search?: string;
    service?: string;
    sortBy?: 'newest' | 'oldest';
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.service && params.service !== 'all') queryParams.append('service', params.service);
    if (params?.sortBy) queryParams.append('sort', params.sortBy);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/admin/contacts?${queryString}` : '/admin/contacts';
    
    return this.protectedRequest(endpoint);
  }

  async getContact(id: number) {
    return this.protectedRequest(`/admin/contacts/${id}`);
  }

  // ADD THIS MISSING METHOD
  async deleteContact(id: number) {
    return this.protectedRequest(`/admin/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // ADD THIS MISSING METHOD
  async deleteMultipleContacts(ids: number[]) {
    return this.protectedRequest('/admin/contacts/bulk-delete', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
  }

  // ADD THIS MISSING METHOD
  async markContactAsRead(id: number) {
    return this.protectedRequest(`/admin/contacts/${id}/read`, {
      method: 'PUT',
    });
  }

  // ADD THIS MISSING METHOD
  async markContactAsUnread(id: number) {
    return this.protectedRequest(`/admin/contacts/${id}/unread`, {
      method: 'PUT',
    });
  }

  // ADD THIS MISSING METHOD
  async exportContacts(format: 'csv' | 'excel' = 'csv') {
    return this.protectedRequest(`/admin/contacts/export?format=${format}`);
  }

  // ADD THIS MISSING METHOD - Public contact submission (no auth required)
  async submitContact(formData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service: string;
    budget?: string;
    message: string;
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // ========================
  // CONTACT ANALYTICS METHODS
  // ========================
  async getContactTrends(period: '7days' | '30days' | '90days' | '1year' = '30days') {
    return this.protectedRequest(`/admin/analytics/contact-trends?period=${period}`);
  }

  async getServicePerformance(period: 'week' | 'month' | 'quarter' = 'month') {
    return this.protectedRequest(`/admin/analytics/service-performance?period=${period}`);
  }

  async getContactSources() {
    return this.protectedRequest('/admin/analytics/contact-sources');
  }

  // ========================
  // SETTINGS METHODS
  // ========================
  async getContactSettings() {
    return this.protectedRequest('/admin/settings/contact');
  }

  async updateContactSettings(settings: {
    auto_reply_enabled?: boolean;
    auto_reply_subject?: string;
    auto_reply_message?: string;
    notification_email?: string;
    default_service?: string;
  }) {
    return this.protectedRequest('/admin/settings/contact', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // ========================
  // NOTIFICATION METHODS
  // ========================
  async getUnreadContactsCount() {
    return this.protectedRequest('/admin/notifications/unread-contacts');
  }

  async getRecentActivity() {
    return this.protectedRequest('/admin/notifications/recent-activity');
  }

  // ========================
  // TEST METHODS
  // ========================
  async testConnection() {
    return this.request('/contact'); // Test public contact endpoint
  }

  async testAdminConnection() {
    try {
      return await this.protectedRequest('/admin/dashboard');
    } catch (error) {
      return { success: false, message: 'Admin connection test failed - authentication required' };
    }
  }

  async testContactSubmission() {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      service: 'Waterproofing',
      message: 'This is a test submission from the API service',
      phone: '+1234567890',
      company: 'Test Company'
    };
    
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(testData),
    });
  }
}

export const apiService = new ApiService();