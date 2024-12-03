import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Staff } from '../interface/staff.interface';

// Construir __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo staff.json
const staffFile = path.join(__dirname, '../data/staff.json');

/**
 * Obtiene todos los datos del staff desde el archivo JSON.
 */
const getStaffData = (): Staff[] => {
  const data = fs.readFileSync(staffFile, 'utf8');
  return JSON.parse(data) as Staff[];
};

/**
 * Busca un miembro del staff por su nombre de usuario.
 */
const findByUsername = (username: string): Staff | undefined => {
  const staff = getStaffData();
  return staff.find((s) => s.username === username);
};

export const StaffModel = {
  getStaffData,
  findByUsername,
};
