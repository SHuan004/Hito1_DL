import { Request, Response } from 'express';
import { PatientService } from '../services/patient.service';

const getAllResume = (req: Request, res: Response): void => {
  const patients = PatientService.getAllResume();
  if (patients) {
    res.json(patients);
  } else {
    res.status(404).json({ message: 'No hay pacientes.' });
  }
};

export const PatientController = {
  getAllResume,
};
