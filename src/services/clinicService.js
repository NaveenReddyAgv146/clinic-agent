import api from './api'

export const clinicService = {
  getServices: () => api.get('/services').then((res) => res.data),
  getDoctors: () => api.get('/doctors').then((res) => res.data),
  bookAppointment: (payload) => api.post('/appointments', payload).then((res) => res.data),
  myAppointments: () => api.get('/appointments/mine').then((res) => res.data),
  cancelAppointment: (id) => api.patch(`/appointments/${id}/cancel`).then((res) => res.data),
  adminAppointments: (params) => api.get('/appointments', { params }).then((res) => res.data),
  updateAppointmentStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }).then((res) => res.data),
  adminStats: () => api.get('/appointments/stats/overview').then((res) => res.data),
  users: () => api.get('/users').then((res) => res.data),
  createDoctor: (payload) => api.post('/doctors', payload).then((res) => res.data),
  createService: (payload) => api.post('/services', payload).then((res) => res.data),
}
