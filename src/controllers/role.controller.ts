import { Request, Response, NextFunction } from 'express';
import { RoleService } from '../services/role.service';
import { createRoleSchema, getRoleByIdSchema } from '../schemas/role.schema';

/**
 * Obtiene todos los roles.
 */
const getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await RoleService.getAllRoles();
    res.json({ roles });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un rol por su ID.
 */
const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = getRoleByIdSchema.validate(req.params);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { id } = req.params;
    const role = await RoleService.getRoleById(Number(id));

    if (role) {
      res.json({ role });
    } else {
      res.status(404).json({ message: 'Rol no encontrado.' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Crea un nuevo rol.
 */
const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = createRoleSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { name } = req.body;
    const newRole = await RoleService.createRole(name);
    res.status(201).json({ role: newRole });
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina un rol por su ID.
 */
const deleteRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = getRoleByIdSchema.validate(req.params);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { id } = req.params;
    const isDeleted = await RoleService.deleteRoleById(Number(id));

    if (isDeleted) {
      res.status(204).json({ message: 'Rol Eliminado con Exito.' }); // No Content
      return;
    }

    res.status(404).json({ message: 'Rol no encontrado.' });
  } catch (error) {
    next(error);
  }
};

export const RoleController = {
  getAllRoles,
  getRoleById,
  createRole,
  deleteRoleById,
};
