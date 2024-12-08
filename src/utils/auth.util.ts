import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

/**
 * Genera un token de acceso para el staff.
 * @param username - Nombre de usuario del staff.
 * @param id - ID del staff.
 * @param expiresIn - Tiempo de expiración del token (por defecto 1h).
 * @returns El token JWT.
 */
export const generateAccessToken = (
  username: string,
  id: number,
  expiresIn = '1h'
): string => {
  return jwt.sign({ username, id }, secret, { expiresIn });
};

/**
 * Verifica y decodifica un token JWT.
 * @param token - El token a verificar.
 * @returns El payload decodificado del token.
 * @throws Si el token no es válido o ha expirado.
 */
export const verifyAccessToken = (token: string): jwt.JwtPayload => {
  try {
    return jwt.verify(token, secret) as jwt.JwtPayload;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    throw new Error('Token inválido o expirado');
  }
};
