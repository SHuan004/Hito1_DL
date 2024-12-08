import bcrypt from 'bcryptjs';
import { StaffModel } from '../models/staff.model';
import { HttpError } from '../utils/httpError.util';
import { Staff } from '../interface/staff.interface';

/**
 * Obtiene todos los miembros del staff.
 */
const getAllStaff = async (): Promise<Staff[]> => {
  return await StaffModel.getStaffData();
};

/**
 * Obtiene un miembro del staff por su ID.
 * @param id - ID del miembro del staff.
 * @returns El miembro del staff o lanza un error si no se encuentra.
 */
const getStaffById = async (id: number): Promise<Staff> => {
  const staff = await StaffModel.findById(id);
  if (!staff) {
    throw new HttpError('Staff not found', 404);
  }
  return staff;
};

/**
 * Obtiene un miembro del staff por su nombre de usuario.
 * @param username - Nombre de usuario.
 * @returns El miembro del staff o lanza un error si no se encuentra.
 */
const getStaffByUsername = async (username: string): Promise<Staff> => {
  const staff = await StaffModel.findByUsername(username);
  if (!staff) {
    throw new HttpError('Staff not found', 404);
  }
  return staff;
};

/**
 * Crea un nuevo miembro del staff con un nombre de usuario, contraseña y rol.
 * @param username - Nombre de usuario.
 * @param password - Contraseña.
 * @param role_id - Rol asociado al staff.
 * @returns El nuevo miembro del staff creado.
 */
const createStaffWithUsernameAndPassword = async (
  username: string,
  password: string,
  role_id: number
): Promise<Staff> => {
  // Verifica si el nombre de usuario ya existe
  const existingStaff = await StaffModel.findByUsername(username);
  if (existingStaff) {
    throw new HttpError('Username already exists', 400);
  }

  // Encripta la contraseña
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  // Crea el nuevo miembro del staff
  const newStaff = await StaffModel.createStaff(
    username,
    passwordHashed,
    role_id
  );

  if (!newStaff) {
    throw new HttpError('Failed to create staff', 500);
  }

  return newStaff;
};

/**
 * Elimina un miembro del staff por su ID.
 * @param id - ID del miembro del staff.
 * @returns Un booleano indicando si la eliminación fue exitosa.
 */
const deleteStaffById = async (id: number): Promise<boolean> => {
  const deleted = await StaffModel.deleteStaff(id);
  if (!deleted) {
    throw new HttpError('Failed to delete staff or staff not found', 404);
  }
  return deleted;
};

export const StaffService = {
  getAllStaff,
  getStaffById,
  getStaffByUsername,
  createStaffWithUsernameAndPassword,
  deleteStaffById,
};
