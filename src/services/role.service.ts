import { Role } from '../interface/role.interface';
import { RoleModel } from '../models/role.model';

/**
 * Obtiene todos los roles.
 * @returns Una lista de roles.
 */
const getAllRoles = async (): Promise<Role[]> => {
  return await RoleModel.getAllRoles();
};

/**
 * Busca un rol por su ID.
 * @param id - ID único del rol.
 * @returns El rol encontrado o `null` si no existe.
 */
const getRoleById = async (id: number): Promise<Role | null> => {
  return await RoleModel.findRoleById(id);
};

/**
 * Crea un nuevo rol.
 * @param name - Nombre del rol.
 * @returns El rol recién creado.
 */
const createRole = async (name: string): Promise<Role> => {
  return await RoleModel.createRole(name);
};

/**
 * Elimina un rol por su ID.
 * @param id - ID del rol a eliminar.
 * @returns `true` si el rol fue eliminado, `false` de lo contrario.
 */
const deleteRoleById = async (id: number): Promise<boolean> => {
  return await RoleModel.deleteRoleById(id);
};

export const RoleService = {
  getAllRoles,
  getRoleById,
  createRole,
  deleteRoleById,
};
