import { http } from './httpClient.js';

export const authApi = {
  login: (username, password) => http.post('/auth/login', { username, password }),
  me: () => http.get('/auth/me'),
  logout: () => http.post('/auth/logout'),
};

export const eventsApi = {
  list: () => http.get('/events'),
  get: (id) => http.get(`/events/${id}`),
};

export const assignmentsApi = {
  list: () => http.get('/assignments'),
  get: (id) => http.get(`/assignments/${id}`),
};

export const notesApi = {
  list: () => http.get('/notes'),
  create: (content) => http.post('/notes', { content }),
  remove: (id) => http.del(`/notes/${id}`),
};

export const profileApi = {
  update: (updates) => http.put('/profile', updates),
};

