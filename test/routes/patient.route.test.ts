import request from 'supertest';
import { describe, it, expect, vi } from 'vitest';
import app from '../../src/app';

// Mock del PatientModel
vi.mock('../../src/models/patient.model', () => {
  return {
    PatientModel: {
      getPatientData: vi.fn(async () => [
        { id: 1, name: 'John Doe', age: 45, rut: '12345678-9' },
        { id: 2, name: 'Jane Doe', age: 30, rut: '98765432-1' },
      ]),
      findByRut: vi.fn(async () => null),
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

describe('GET /api/v1/patients/resume', () => {
  it('should return a list of patients with status 200', async () => {
    const { statusCode, body } = await request(app)
      .get('/api/v1/patients/resume')
      .set('Authorization', 'Bearer faketoken'); // Agregar un fake token para pasar el verifyToken mockeado

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('patients');
    expect(Array.isArray(body.patients)).toBe(true);
    expect(body.patients).toHaveLength(2);
    expect(body.patients[0]).toEqual({
      id: 1,
      name: 'John Doe',
      age: 45,
      rut: '12345678-9',
    });
  });
});
