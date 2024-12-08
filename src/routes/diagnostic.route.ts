import { Router } from 'express';
import { DiagnosticController } from '../controllers/diagnostic.controller';
import { verifyToken } from '../middlewares/jwt.middleware';
const router = Router();

// Obtener todos los diagnósticos (protegido con JWT)
router.get('/', verifyToken, DiagnosticController.getAllDiagnostics);

// Obtener un diagnóstico por ID (protegido con JWT)
router.get('/:id', verifyToken, DiagnosticController.getDiagnosticById);

// Crear un nuevo diagnóstico (protegido con JWT)
router.post('/create', verifyToken, DiagnosticController.createDiagnostic);

// Eliminar un diagnóstico por ID (protegido con JWT)
router.delete('/:id', verifyToken, DiagnosticController.deleteDiagnosticById);

export default router;
