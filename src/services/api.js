import env from '../config/env';

/**
 * ─────────────────────────────────────────────────────────────────
 * Central API Client using production-ready environment variables
 * ─────────────────────────────────────────────────────────────────
 */

class ApiError extends Error {
  constructor(status, message, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

/**
 * Generic fetch wrapper with auth and error handling
 */
const fetchClient = async (endpoint, options = {}) => {
  const url = `${env.API_URL}${endpoint}`;
  
  // Example: Get token from localStorage/Context
  const token = localStorage.getItem('auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    // Handle 204 No Content
    if (response.status === 204) return null;

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data.message || 'API Error', data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    
    // Handle network errors (offline, CORS, server down)
    console.error('[API Network Error]:', error);
    throw new ApiError(503, 'Service unavailable. Please try again later.');
  }
};

/**
 * ── User Service ──────────────────────────────────────────────────
 */
export const UserService = {
  login: (email, password) => 
    fetchClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
    
  register: (name, email, password) => 
    fetchClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
    
  getProfile: () => 
    fetchClient('/users/me'),
};

/**
 * ── Payment Service (Stripe Integration Example) ──────────────────
 */
export const PaymentService = {
  // Use STRIPE_PUBLIC_KEY directly when initializing Stripe.js in UI
  getStripeKey: () => env.STRIPE_PUBLIC_KEY,

  createPaymentIntent: (items) =>
    fetchClient('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),
};

export default {
  User: UserService,
  Payment: PaymentService,
};
