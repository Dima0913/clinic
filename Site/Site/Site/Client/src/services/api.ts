import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL?.trim() || '/api'
const ADMIN_AUTH_STORAGE_KEY = 'admin_basic_auth'

export const fetchServices = async () => {
  const response = await axios.get(`${API_BASE_URL}/services`)
  return response.data
}

export const getServiceById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/services/${id}`)
  return response.data
}

export const createBooking = async (bookingData: any) => {
  const response = await axios.post<CreateBookingResponse>(`${API_BASE_URL}/bookings`, bookingData)
  return response.data
}

export const fetchBookings = async () => {
  const response = await axios.get(`${API_BASE_URL}/bookings`)
  return response.data
}

export type AvailableSlotsResponse = {
  serviceId: number
  branchId: number
  date: string // yyyy-MM-dd
  availableSlots: string[] // HH:mm
}

export type CreateBookingResponse = {
  message: string
  bookingId: number
  cancelToken: string
}

export const fetchAvailableSlots = async (params: { serviceId: number; branchId: number; date: string }) => {
  const response = await axios.get<AvailableSlotsResponse>(`${API_BASE_URL}/bookings/available`, { params })
  return response.data
}

export const cancelBooking = async (cancelToken: string) => {
  const response = await axios.post(`${API_BASE_URL}/bookings/cancel`, { cancelToken })
  return response.data
}

export type AdminBooking = {
  id: number
  name: string
  phone: string
  userEmail: string
  appointmentDate: string
  appointmentTime: string
  serviceName: string
  branchName: string
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | string
  createdAt: string
  cancelledAt?: string | null
}

export const fetchAdminBookings = async () => {
  const response = await axios.get<AdminBooking[]>(`${API_BASE_URL}/bookings/admin`, {
    headers: getAdminAuthHeader(),
  })
  return response.data
}

export const updateBookingStatus = async (id: number, status: string) => {
  const response = await axios.patch(`${API_BASE_URL}/bookings/admin/${id}/status`, { status }, {
    headers: getAdminAuthHeader(),
  })
  return response.data
}

export const adminLogin = async (username: string, password: string) => {
  const basic = toBasicAuth(username, password)
  const response = await axios.post(`${API_BASE_URL}/bookings/admin/login`, { username, password }, {
    headers: { Authorization: basic },
  })
  localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, basic)
  return response.data
}

export const adminLogout = () => {
  localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY)
}

export const hasAdminSession = () => !!localStorage.getItem(ADMIN_AUTH_STORAGE_KEY)

const getAdminAuthHeader = () => {
  const token = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY)
  return token ? { Authorization: token } : {}
}

const toBasicAuth = (username: string, password: string) =>
  `Basic ${btoa(`${username}:${password}`)}`

export interface RegisterData {
  name: string;
  email: string;
  phone?: string;
}

export const registerUser = async (userData: RegisterData) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
  return response.data;
}

export const checkUserStatus = async (email: string) => {
  const response = await axios.get(`${API_BASE_URL}/users/status/${email}`);
  return response.data;
}

