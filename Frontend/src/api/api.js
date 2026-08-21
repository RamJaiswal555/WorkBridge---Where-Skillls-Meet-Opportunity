const API_BASE_URL = 'http://127.0.0.1:8000/api';
const AUTH_STORAGE_KEY = 'workbridge_user';

// These stay unset until the Django URL configuration is available.
export const API_ENDPOINTS = {
  login: null,
  signup: null,
  otpSend: null,
  otpVerify: null,
  otpLogin: null,
  googleLogin: null,
  forgotPassword: null,
  resetPassword: null,
  workers: null,
  workerProfile: null,
  customerProfile: null,
  bookings: null,
  bookingStatus: null,
  reviews: null,
  conversations: null,
  messages: null,
  notifications: null,
  adminStats: null,
  verificationRequests: null,
};

function getToken() {
  return localStorage.getItem('workbridge_access_token');
}

function endpointTodo(name) {
  throw new Error(`TODO: confirm the Django endpoint for ${name} in API_ENDPOINTS.`);
}

export async function apiRequest(path, options = {}) {
  if (!path) endpointTodo(options.endpointName || 'this request');

  const { body, endpointName, pathSuffix = '', ...requestOptions } = options;
  const headers = new Headers(requestOptions.headers || {});
  headers.set('Accept', 'application/json');
  if (body !== undefined) headers.set('Content-Type', 'application/json');

  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await (`${API_BASE_URL}${path}${pathSuffix}`, {
    ...requestOptions,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const message = typeof data === 'object' && data?.detail ? data.detail : `API request failed (${response.status}).`;
    throw new Error(message);
  }
  return data;
}

function request(name, options = {}) {
  return apiRequest(API_ENDPOINTS[name], { ...options, endpointName: name });
}

function queryString(filters) {
  const params = new URLSearchParams();
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== false && value !== null) params.set(key, value);
  });
  return params.toString() ? `?${params.toString()}` : '';
}

export const login = (payload) => request('login', { method: 'POST', body: payload });
export const signup = (payload) => request('signup', { method: 'POST', body: payload });
export const sendOTP = (payload) => request('otpSend', { method: 'POST', body: payload });
export const verifyOTP = (payload) => request('otpVerify', { method: 'POST', body: payload });
export const loginWithOTP = (payload) => request('otpLogin', { method: 'POST', body: payload });
export const loginWithGoogle = (payload) => request('googleLogin', { method: 'POST', body: payload });
export const loginAdmin = (payload) => request('login', { method: 'POST', body: { ...payload, role: 'admin' } });
export const forgotPassword = (payload) => request('forgotPassword', { method: 'POST', body: payload });
export const resetPassword = (payload) => request('resetPassword', { method: 'POST', body: payload });

export const listWorkers = (filters = {}) => request('workers', { method: 'GET', pathSuffix: queryString(filters) });
export const getWorker = (id) => request('workerProfile', { method: 'GET', pathSuffix: `/${id}` });
export const getFeatured = () => request('workers', { method: 'GET', pathSuffix: '?featured=true' });
export const getSimilarWorkers = (worker) => request('workers', { method: 'GET', pathSuffix: `?category=${encodeURIComponent(worker.category)}&exclude=${worker.id}` });
export const getWorkersByCategory = (category) => listWorkers({ category });
export const getCustomerProfile = (id) => request('customerProfile', { method: 'GET', pathSuffix: id ? `/${id}` : '' });
export const getSavedWorkerIds = () => request('customerProfile', { method: 'GET', pathSuffix: '/saved-workers' });
export const toggleSavedWorker = (id) => request('customerProfile', { method: 'POST', pathSuffix: '/saved-workers', body: { workerId: id } });
export const getRecentSearches = () => request('customerProfile', { method: 'GET', pathSuffix: '/recent-searches' });

export const listBookings = (status) => request('bookings', { method: 'GET', pathSuffix: queryString({ status }) });
export const createBooking = (payload) => request('bookings', { method: 'POST', body: payload });
export const updateBookingStatus = (id, status) => request('bookingStatus', { method: 'PATCH', pathSuffix: `/${id}`, body: { status } });
export const listReviews = (workerId) => request('reviews', { method: 'GET', pathSuffix: queryString({ worker: workerId }) });
export const createReview = (payload) => request('reviews', { method: 'POST', body: payload });

export const listConversations = () => request('conversations', { method: 'GET' });
export const sendMessage = (conversationId, text) => request('messages', { method: 'POST', pathSuffix: `/${conversationId}`, body: { text } });
export const listNotifications = () => request('notifications', { method: 'GET' });
export const getAdminStats = () => request('adminStats', { method: 'GET' });
export const listVerificationRequests = () => request('verificationRequests', { method: 'GET' });

export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem('workbridge_access_token');
  return Promise.resolve({ success: true });
}
