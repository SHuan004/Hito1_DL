import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Faltan credenciales.' });
    return;
  }
  const token = AuthService.login(username, password);
  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas.' });
  }
};

export const AuthController = {
  login,
};
