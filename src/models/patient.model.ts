import { pool } from '../config/database';
import { Patient } from '../interface/patient.interface';

/**
 * Obtiene todos los pacientes desde la base de datos.
 */
const getPatientData = async (): Promise<Patient[]> => {
  const query = 'SELECT * FROM patients;';
  const { rows } = await pool.query(query);
  return rows as Patient[];
};

/**
 * Busca un paciente por su RUT.
 * @param rut - RUT único del paciente.
 * @returns El paciente encontrado o `null` si no existe.
 */
const findByRut = async (rut: string): Promise<Patient | null> => {
  const query = 'SELECT * FROM patients WHERE rut = $1;';
  const values = [rut];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

const findById = async (id: number): Promise<Patient | null> => {
  const query = 'SELECT * FROM patients WHERE id = $1;';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

const createPatient = async (
  patient: Omit<Patient, 'id'>
): Promise<Patient> => {
  // Verificar si el RUT ya existe en la base de datos
  const existingPatient = await findByRut(patient.rut);
  if (existingPatient) {
    throw new Error(`El RUT ${patient.rut} ya está registrado.`);
  }

  // Si no existe, proceder con la inserción
  const query = `
    INSERT INTO patients (name, age, rut)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [patient.name, patient.age, patient.rut];
  const { rows } = await pool.query(query, values);

  if (rows.length === 0) {
    throw new Error('No se pudo crear el paciente en la base de datos');
  }

  return rows[0] as Patient;
};

/**
 * Elimina un paciente por su ID.
 * @param id - ID del paciente a eliminar.
 * @returns `true` si se eliminó correctamente, `false` de lo contrario.
 */
const deletePatientById = async (id: number): Promise<boolean> => {
  const query = 'DELETE FROM patients WHERE id = $1;';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rowCount! > 0;
};

export const PatientModel = {
  getPatientData,
  findByRut,
  createPatient,
  deletePatientById,
  findById,
};
