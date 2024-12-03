import jwt from 'jsonwebtoken';
import { Staff } from '../interface/staff.interface';
import { StaffModel } from '../models/staff.model';

const SECRET_KEY = 'supersecreto123';

const login = (username: string, password: string): string | null => {
  const user: Staff | undefined = StaffModel.findByUsername(username);

  if (user && user.password === password) {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h',
    });
  }

  return null;
};

const register = (username: string, password: string): boolean => {
  if (StaffModel.createStaff(username, password)) {
    return true;
  }

  return false;
};

export const AuthService = {
  login,
  register,
};
