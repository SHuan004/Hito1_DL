import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router = Router();

router.get('/resume', verifyToken, PatientController.getAllResume);

// Primero las rutas con paths específicos:
router.post('/register', verifyToken, PatientController.createPatient);
// Luego las rutas dinámicas:
router.post('/look', verifyToken, PatientController.getPatientByRut);

router.delete('/:id', verifyToken, PatientController.deletePatientById);

export default router;
