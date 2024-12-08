import { Diagnostic } from '../interface/diagnostic.interface';
import { DiagnosticModel } from '../models/diagnostic.model';

/**
 * Obtiene todos los diagnósticos.
 * @returns Una lista de diagnósticos.
 */
const getAllDiagnostics = async (): Promise<Diagnostic[]> => {
  return await DiagnosticModel.getAllDiagnostics();
};

/**
 * Busca un diagnóstico por su ID.
 * @param id - ID único del diagnóstico.
 * @returns El diagnóstico encontrado o `null` si no existe.
 */
const getDiagnosticById = async (id: number): Promise<Diagnostic | null> => {
  return await DiagnosticModel.findDiagnosticById(id);
};

/**
 * Crea un nuevo diagnóstico.
 * @param diagnostic - Los datos del diagnóstico a crear.
 * @returns El diagnóstico recién creado.
 */
const createDiagnostic = async (
  diagnostic: Omit<Diagnostic, 'id'>
): Promise<Diagnostic> => {
  return await DiagnosticModel.createDiagnostic(diagnostic);
};

/**
 * Elimina un diagnóstico por su ID.
 * @param id - ID del diagnóstico a eliminar.
 * @returns `true` si el diagnóstico fue eliminado, `false` de lo contrario.
 */
const deleteDiagnosticById = async (id: number): Promise<boolean> => {
  return await DiagnosticModel.deleteDiagnosticById(id);
};

export const DiagnosticService = {
  getAllDiagnostics,
  getDiagnosticById,
  createDiagnostic,
  deleteDiagnosticById,
};
