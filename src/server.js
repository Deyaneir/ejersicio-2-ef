import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/auth_routes.js';
import clienteRoutes from './routes/cliente_routes.js';
import vehiculoRoutes from './routes/vehiculo_routes.js';
import reservaRoutes from './routes/reserva_routes.js';

dotenv.config();
const app = express();

// ===== MIDDLEWARES =====
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    process.env.URL_FRONTEND
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto_temporal_renta_carros',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24*60*60*1000
  }
}));

// ===== RUTAS =====
app.get('/', (req, res) => res.send('🚗 API - Sistema de Gestión de Renta de Carros'));

// 🔹 Montaje correcto de rutas
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/reservas', reservaRoutes);

// ===== ERRORES =====
app.use((req, res) => res.status(404).json({ success: false, message: 'Endpoint no encontrado - 404' }));

app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;