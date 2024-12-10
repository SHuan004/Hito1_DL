import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import app from '../../src/app';

vi.mock('../../src/models/staff.model', () => {
  return {
    StaffModel: {
      getStaffData: vi.fn(async () => {}),
      findByUsername: vi.fn(async (username) => null),
      findById: vi.fn(async (id) => null),
      createStaff: vi.fn(async (username, password, role_id) => null),
      deleteStaff: vi.fn(async (id) => true),
    },
  };
});

vi.mock('../../src/middlewares/jwt.middleware', () => {
  return {
    verifyToken: vi.fn((req, res, next) => {
      req.username = 'doctor1';
      req.password = '123456';
      next();
    }),
  };
});

describe('/staff', () => {
  it('GET should return staff', async () => {
    const { statusCode, body } = await request(app).get('/api/v1/staff');
    console.log(body);

    expect(statusCode).toBe(200);
  });
});
