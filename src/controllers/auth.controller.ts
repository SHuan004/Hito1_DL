import { NextFunction, Request, Response } from 'express';
import { authLoginSchema } from '../schemas/auth.schema';
import { authService } from '../services/auth.service';
import { HttpError } from '../utils/httpError.util';

/**
 * Controlador para iniciar sesión con nombre de usuario y contraseña.
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validar el cuerpo de la solicitud
    const { error, value } = authLoginSchema.validate(req.body);

    if (error) {
      throw new HttpError(error.message, 400);
    }

    const { username, password } = value;

    // Iniciar sesión y generar token
    const token = await authService.loginWithUsernameAndPassword(
      username,
      password
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador para registrar un nuevo miembro del staff.
 */
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, role_id } = req.body;

    if (!role_id) {
      throw new HttpError('Role ID is required', 400);
    }

    // Registrar el staff y generar token
    const token = await authService.registerWithUsernameAndPassword(
      username,
      password,
      role_id
    );

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  login,
  register,
};
