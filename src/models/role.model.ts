import { pool } from '../config/database';
import { Role } from '../interface/role.interface';

/**
 * Obtiene todos los roles.
 */
const getAllRoles = async (): Promise<Role[]> => {
  const query = 'SELECT * FROM roles;';
  const { rows } = await pool.query(query);
  return rows as Role[];
};

/**
 * Busca un rol por su ID.
 * @param id - ID único del rol.
 * @returns El rol encontrado o `null` si no existe.
 */
const findRoleById = async (id: number): Promise<Role | null> => {
  const query = 'SELECT * FROM roles WHERE id = $1;';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

/**
 * Crea un nuevo rol.
 * @param name - Nombre del rol.
 * @returns El rol recién creado.
 */
const createRole = async (name: string): Promise<Role> => {
  const query = `
    INSERT INTO roles (name)
    VALUES ($1)
    RETURNING *;
  `;
  const values = [name];
  const { rows } = await pool.query(query, values);

  if (rows.length === 0) {
    throw new Error('Failed to create role');
  }

  return rows[0] as Role;
};

/**
 * Elimina un rol por su ID.
 * @param id - ID del rol a eliminar.
 * @returns `true` si se eliminó correctamente, `false` de lo contrario.
 */
const deleteRoleById = async (id: number): Promise<boolean> => {
  const query = 'DELETE FROM roles WHERE id = $1;';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rowCount! > 0;
};

export const RoleModel = {
  getAllRoles,
  findRoleById,
  createRole,
  deleteRoleById,
};
