import { pool } from '../config/database';
import { Diagnostic } from '../interface/diagnostic.interface';
import { PatientService } from '../services/patient.service';
import { StaffService } from '../services/staff.service';

/**
 * Obtiene todos los diagnósticos.
 */
const getAllDiagnostics = async (): Promise<Diagnostic[]> => {
  const query = 'SELECT * FROM diagnostics;';
  const { rows } = await pool.query(query);
  return rows as Diagnostic[];
};

/**
 * Busca un diagnóstico por su ID.
 * @param id - ID único del diagnóstico.
 * @returns El diagnóstico encontrado o `null` si no existe.
 */
const findDiagnosticById = async (id: number): Promise<Diagnostic | null> => {
  const query = 'SELECT * FROM diagnostics WHERE id = $1;';
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0] || null;
};

/**
 * Crea un nuevo diagnóstico.
 * @param diagnostic - Los datos del diagnóstico a crear.
 * @returns El diagnóstico recién creado.
 */
const createDiagnostic = async (
  diagnostic: Omit<Diagnostic, 'id'>
): Promise<Diagnostic> => {
  // Verificar que el paciente exista
  const patient = await PatientService.findPatientById(diagnostic.patient_id);
  if (!patient) {
    throw new Error(`El paciente con ID ${diagnostic.patient_id} no existe.`);
  }
  const staff = await StaffService.getStaffById(diagnostic.staff_id);

  const query = `
    INSERT INTO diagnostics (description, severity, patient_id, staff_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    diagnostic.description,
    diagnostic.severity,
    diagnostic.patient_id,
    diagnostic.staff_id,
  ];
  const { rows } = await pool.query(query, values);

  if (rows.length === 0) {
    throw new Error('Failed to create diagnostic');
  }

  return rows[0] as Diagnostic;
};

/**
 * Elimina un diagnóstico por su ID.
 * @param id - ID del diagnóstico a eliminar.
 * @returns `true` si se eliminó correctamente, `false` de lo contrario.
 */
const deleteDiagnosticById = async (id: number): Promise<boolean> => {
  const query = 'DELETE FROM diagnostics WHERE id = $1;';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rowCount! > 0;
};

export const DiagnosticModel = {
  getAllDiagnostics,
  findDiagnosticById,
  createDiagnostic,
  deleteDiagnosticById,
};
