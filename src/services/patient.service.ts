import { Patient } from '../interface/patient.interface';
import { PatientModel } from '../models/patient.model';
import { HttpError } from '../utils/httpError.util';

/**
 * Obtiene todos los pacientes resumidos.
 * @returns Una lista de pacientes o `null` si no hay datos.
 */
const getAllResume = async (): Promise<Patient[] | null> => {
  const patients: Patient[] = await PatientModel.getPatientData();

  if (patients.length > 0) {
    return patients;
  }

  return null;
};

/**
 * Busca un paciente por su RUT.
 * @param rut - RUT único del paciente.
 * @returns El paciente encontrado o `null` si no existe.
 */
const findPatientByRut = async (rut: string): Promise<Patient | null> => {
  return await PatientModel.findByRut(rut);
};

const findPatientById = async (id: number): Promise<Patient | null> => {
  const patient = await PatientModel.findById(id);
  if (!patient) {
    throw new HttpError('Patient not found', 404);
  }
  return patient;
};

/**
 * Crea un nuevo paciente.
 * @param patient - Los datos del paciente a crear.
 * @returns El paciente recién creado.
 */
const createPatient = async (
  patient: Omit<Patient, 'id'>
): Promise<Patient> => {
  return await PatientModel.createPatient(patient);
};

/**
 * Elimina un paciente por su ID.
 * @param id - ID del paciente a eliminar.
 * @returns `true` si el paciente fue eliminado, `false` de lo contrario.
 */
const deletePatientById = async (id: number): Promise<boolean> => {
  return await PatientModel.deletePatientById(id);
};

export const PatientService = {
  getAllResume,
  findPatientByRut,
  createPatient,
  deletePatientById,
  findPatientById,
};
