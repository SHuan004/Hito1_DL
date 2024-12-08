import Joi from 'joi';

/**
 * Esquema de validación para crear un nuevo rol.
 */
export const createRoleSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'El nombre del rol debe ser un texto.',
    'string.empty': 'El nombre del rol es obligatorio.',
    'string.min': 'El nombre del rol debe tener al menos 2 caracteres.',
    'string.max': 'El nombre del rol no debe superar los 100 caracteres.',
    'any.required': 'El nombre del rol es obligatorio.',
  }),
});

/**
 * Esquema de validación para buscar un rol por ID.
 */
export const getRoleByIdSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'El ID del rol debe ser un número.',
    'number.integer': 'El ID del rol debe ser un número entero.',
    'any.required': 'El ID del rol es obligatorio.',
  }),
});
