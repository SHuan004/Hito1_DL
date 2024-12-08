import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { verifyToken } from '../middlewares/jwt.middleware';

const router = Router();

// Obtener todos los roles (protegido con JWT)
router.get('/', verifyToken, RoleController.getAllRoles);

// Obtener un rol por ID (protegido con JWT)
router.get('/:id', verifyToken, RoleController.getRoleById);

// Crear un nuevo rol (protegido con JWT)
router.post('/create', verifyToken, RoleController.createRole);

// Eliminar un rol por ID (protegido con JWT)
router.delete('/:id', verifyToken, RoleController.deleteRoleById);

export default router;
