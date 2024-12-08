import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/auth.util';
import { HttpError } from '../utils/httpError.util';
import { StaffModel } from '../models/staff.model';

/**
 * Maneja el inicio de sesión del staff.
 * @param username - Nombre de usuario del staff.
 * @param password - Contraseña proporcionada.
 * @returns Un token JWT si las credenciales son válidas.
 * @throws HttpError si el usuario no existe o la contraseña es incorrecta.
 */
const loginWithUsernameAndPassword = async (
  username: string,
  password: string
): Promise<string> => {
  // 1. Verificar que el usuario existe
  const staff = await StaffModel.findByUsername(username);

  if (!staff) {
    throw new HttpError('Staff not found', 400);
  }

  // 2. Comparar las contraseñas (hash)
  const isValidPassword = await bcrypt.compare(password, staff.password);
  if (!isValidPassword) {
    throw new HttpError('Password incorrect', 400);
  }

  // 3. Generar el token JWT, incluyendo el role_id en el payload
  const token = generateAccessToken(staff.username, staff.id);

  return token;
};

/**
 * Maneja el registro de un nuevo miembro del staff.
 * @param username - Nombre de usuario.
 * @param password - Contraseña.
 * @param role_id - Rol asociado al usuario.
 * @returns Un token JWT si el registro es exitoso.
 * @throws HttpError si el usuario ya existe o hay un error en el registro.
 */
const registerWithUsernameAndPassword = async (
  username: string,
  password: string,
  role_id: number
): Promise<string> => {
  // Crear el nuevo usuario en la base de datos
  const staff = await StaffModel.createStaff(username, password, role_id);

  if (!staff) {
    throw new HttpError('Failed to create staff', 500);
  }

  // Generar el token JWT
  const token = generateAccessToken(staff.username, staff.id);

  return token;
};

export const authService = {
  loginWithUsernameAndPassword,
  registerWithUsernameAndPassword,
};
