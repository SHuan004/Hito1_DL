import { Patient } from '../interface/patient.interface';
import { PatientModel } from '../models/patient.model';

const getAllResume = (): Patient[] | null => {
  const patiens: Patient[] = PatientModel.getPatientfData();

  if (patiens) {
    return patiens;
  }

  return null;
};

export const PatientService = {
  getAllResume,
};
