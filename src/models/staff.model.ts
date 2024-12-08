import { pool } from '../config/database';
import bcrypt from 'bcryptjs';
import { Staff } from '../interface/staff.interface';

/**
 * Obtiene todos los datos del staff desde la base de datos.
 */
const getStaffData = async (): Promise<Staff[]> => {
  const query = 'SELECT * FROM staff;';
  const { rows } = await pool.query(query);
  return rows as Staff[];
};

/**
 * Busca un miembro del staff por su nombre de usuario.
 */
const findByUsername = async (username: string): Promise<Staff | null> => {
  const query = 'SELECT * FROM staff WHERE username = $1;';
  const values = [username];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

/**
 * Busca un miembro del staff por su ID.
 */
const findById = async (id: number): Promise<Staff | null> => {
  const query = 'SELECT * FROM staff WHERE id = $1;';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

/**
 * Crea un nuevo miembro del staff.
 * @param username - Nombre de usuario.
 * @param password - Contraseña (encriptada).
 * @param role_id - ID del rol asociado al staff.
 * @returns El miembro del staff recién creado.
 */
const createStaff = async (
  username: string,
  password: string,
  role_id: number
): Promise<Staff> => {
  // Verificar si el usuario ya existe
  const existingStaff = await findByUsername(username);
  if (existingStaff) {
    throw new Error('Username already exists'); // Lanza un error si el usuario ya existe
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Insertar el nuevo miembro del staff y devolver el registro completo
  const query =
    'INSERT INTO staff (username, password, role_id) VALUES ($1, $2, $3) RETURNING *;';
  const values = [username, hashedPassword, role_id];
  const { rows } = await pool.query(query, values);

  if (rows.length === 0) {
    throw new Error('Failed to insert staff into database');
  }

  return rows[0] as Staff; // Devuelve el nuevo miembro del staff
};

/**
 * Elimina un miembro del staff por su ID.
 */
const deleteStaff = async (id: number): Promise<boolean> => {
  const query = 'DELETE FROM staff WHERE id = $1;';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rowCount! > 0;
};

export const StaffModel = {
  getStaffData,
  findByUsername,
  findById,
  createStaff,
  deleteStaff,
};
