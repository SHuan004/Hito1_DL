import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Ruta para login
router.post('/resume', authMiddleware, PatientController.getAllResume);

export default router;
