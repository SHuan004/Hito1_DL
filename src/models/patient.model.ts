import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Patient } from '../interface/patient.interface';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const patientFile = path.join(__dirname, '../data/patient.json');

const getPatientfData = (): Patient[] => {
  const data = fs.readFileSync(patientFile, 'utf8');
  return JSON.parse(data) as Patient[];
};

const findByRut = (rut: string): Patient | undefined => {
  const patients = getPatientfData();
  return patients.find((p) => p.rut === rut);
};

export const PatientModel = {
  getPatientfData,
  findByRut,
};
