import request from 'supertest';
import { describe, it, expect, vi } from 'vitest';
import app from '../../src/app';

// Mock del PatientModel
vi.mock('../../src/models/patient.model', () => {
  return {
    PatientModel: {
      getPatientData: vi.fn(async () => []),
      findByRut: vi.fn(async (rut: string) => {
        if (rut === '12345678-9') {
          return { id: 1, name: 'John Doe', age: 45, rut: '12345678-9' };
        }
        return null;
      }),
      createPatient: vi.fn(async () => null),
      deletePatientById: vi.fn(async () => false),
      findById: vi.fn(async () => null),
    },
  };
});

// Mock del middleware verifyToken
vi.mock('../../src/middlewares/jwt.middleware', () => {
  return {
    verifyToken: vi.fn((req, res, next) => {
      req.username = 'doctor1';
      req.password = '123456';
      next();
    }),
  };
});

describe('POST /api/v1/patients/look', () => {
  it('should return a patient when a valid rut is provided', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/v1/patients/look')
      .send({ rut: '12345678-9' })
      .set('Authorization', 'Bearer faketoken');

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('patient');
    expect(body.patient).toEqual({
      id: 1,
      name: 'John Doe',
      age: 45,
      rut: '12345678-9',
    });
  });

  it('should return 404 when the patient is not found', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/v1/patients/look')
      .send({ rut: '99999999-9' }) // Rut inexistente mockeado
      .set('Authorization', 'Bearer faketoken');

    expect(statusCode).toBe(404);
    expect(body).toHaveProperty('message', 'Paciente no encontrado.');
  });

  it('should return 400 when rut is not provided', async () => {
    // En caso de que la validación falle por no enviar el RUT
    const { statusCode, body } = await request(app)
      .post('/api/v1/patients/look')
      .send({})
      .set('Authorization', 'Bearer faketoken');

    expect(statusCode).toBe(400);
    expect(body).toHaveProperty('message');
  });
});
