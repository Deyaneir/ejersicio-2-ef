// src/services/api.js
import axios from 'axios';

// ===== CREAR INSTANCIA DE AXIOS =====
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Ej: http://localhost:5000/api
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Muy importante para sesiones y cookies
});

// ===== INTERCEPTOR PARA AGREGAR TOKEN SI EXISTE =====
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ======== AUTENTICACIÓN ========
export const loginApi = (data) => api.post('/auth/login', data);
export const registroApi = (data) => api.post('/auth/registro', data);
export const perfilApi = () => api.get('/auth/perfil');

// ======== CLIENTES ========
export const getClientes = () => api.get('/clientes');
export const getCliente = (id) => api.get(`/clientes/${id}`);
export const crearCliente = (data) => api.post('/clientes', data);
export const editarCliente = (id, data) => api.put(`/clientes/${id}`, data);
export const borrarCliente = (id) => api.delete(`/clientes/${id}`);

// ======== VEHÍCULOS ========
export const getVehiculos = () => api.get('/vehiculos');
export const getVehiculo = (id) => api.get(`/vehiculos/${id}`);
export const crearVehiculo = (data) => api.post('/vehiculos', data);
export const editarVehiculo = (id, data) => api.put(`/vehiculos/${id}`, data);
export const borrarVehiculo = (id) => api.delete(`/vehiculos/${id}`);

// ======== RESERVAS ========
export const getReservas = () => api.get('/reservas');
export const getReserva = (id) => api.get(`/reservas/${id}`);
export const crearReserva = (data) => api.post('/reservas', data);
export const editarReserva = (id, data) => api.put(`/reservas/${id}`, data);
export const borrarReserva = (id) => api.delete(`/reservas/${id}`);

export default api;