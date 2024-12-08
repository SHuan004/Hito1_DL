import { Request, Response, NextFunction } from 'express';
import { PatientService } from '../services/patient.service';
import {
  createPatientSchema,
  getPatientByRutSchema,
  deletePatientByIdSchema,
} from '../schemas/patient.schema';

/**
 * Obtiene un resumen de todos los pacientes.
 */
const getAllResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await PatientService.getAllResume();
    if (patients && patients.length > 0) {
      res.json({ patients });
    } else {
      res.status(404).json({ message: 'No hay pacientes.' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Busca un paciente por su RUT.
 */
export const getPatientByRut = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = getPatientByRutSchema.validate(req.body); // Validar `req.body`
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { rut } = req.body; // Extraer `rut` desde el cuerpo de la solicitud
    const patient = await PatientService.findPatientByRut(rut);

    if (patient) {
      res.status(200).json({ patient });
    } else {
      res.status(404).json({ message: 'Paciente no encontrado.' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Crea un nuevo paciente.
 */
const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = createPatientSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { name, age, rut } = req.body;

    try {
      const newPatient = await PatientService.createPatient({ name, age, rut });
      res.status(201).json({ patient: newPatient });
    } catch (err) {
      // Manejar errores de unicidad o errores específicos del servicio
      if (err instanceof Error && err.message.includes('ya está registrado')) {
        res.status(409).json({ error: err.message }); // 409: Conflicto
      } else {
        throw err; // Lanza otros errores al middleware global
      }
    }
  } catch (error) {
    next(error); // Manejo de errores genéricos
  }
};

/**
 * Elimina un paciente por su ID.
 */
const deletePatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = deletePatientByIdSchema.validate(req.params);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { id } = req.params;
    const isDeleted = await PatientService.deletePatientById(Number(id));

    if (isDeleted) {
      res.status(204).json({ message: 'Paciente Eliminado.' }); // No Content
    } else {
      res.status(404).json({ message: 'Paciente no encontrado.' });
    }
  } catch (error) {
    next(error);
  }
};

export const PatientController = {
  getAllResume,
  getPatientByRut,
  createPatient,
  deletePatientById,
};
