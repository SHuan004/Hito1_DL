import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utils/httpError.util';

export const httpErrorHandle = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof HttpError) {
    res.status(error.code).json({ error: error.message });
  } else res.status(500).json({ error: 'Error de servidor' });
};
