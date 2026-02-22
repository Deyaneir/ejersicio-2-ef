import { Router } from 'express';
import { registro, login, perfil } from '../controllers/auth_controller.js';

const router = Router();

// Registro
router.post('/registro', registro);

// Login
router.post('/login', login);

// Perfil
router.get('/perfil', perfil);

export default router;