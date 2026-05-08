import api from './api'

export const assistantService = {
  chat: (payload) => api.post('/assistant/chat', payload).then((res) => res.data),
}
