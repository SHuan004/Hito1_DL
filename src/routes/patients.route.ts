import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router = Router();

// Ruta para login
router.post('/resume', verifyToken, PatientController.getAllResume);

export default router;
