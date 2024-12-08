import { Request, Response, NextFunction } from 'express';
import { DiagnosticService } from '../services/diagnostic.service';
import {
  createDiagnosticSchema,
  getDiagnosticByIdSchema,
} from '../schemas/diagnostic.schema';

/**
 * Obtiene todos los diagnósticos.
 */
const getAllDiagnostics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const diagnostics = await DiagnosticService.getAllDiagnostics();
    res.json({ diagnostics });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un diagnóstico por su ID.
 */
const getDiagnosticById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = getDiagnosticByIdSchema.validate(req.params);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { id } = req.params;
    const diagnostic = await DiagnosticService.getDiagnosticById(Number(id));

    if (diagnostic) {
      res.json({ diagnostic });
    } else {
      res.status(404).json({ message: 'Diagnóstico no encontrado.' });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Crea un nuevo diagnóstico.
 */
const createDiagnostic = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = createDiagnosticSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { description, severity, patient_id, staff_id } = req.body;
    const newDiagnostic = await DiagnosticService.createDiagnostic({
      description,
      severity,
      patient_id,
      staff_id,
    });

    res.status(201).json({ diagnostic: newDiagnostic });
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina un diagnóstico por su ID.
 */
const deleteDiagnosticById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = getDiagnosticByIdSchema.validate(req.params);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { id } = req.params;
    const isDeleted = await DiagnosticService.deleteDiagnosticById(Number(id));

    if (isDeleted) {
      res.status(204).json({ message: 'Diagnóstico Eliminado Con exito.' }); // No Content
      return;
    }

    res.status(404).json({ message: 'Diagnóstico no encontrado.' });
  } catch (error) {
    next(error);
  }
};

export const DiagnosticController = {
  getAllDiagnostics,
  getDiagnosticById,
  createDiagnostic,
  deleteDiagnosticById,
};
