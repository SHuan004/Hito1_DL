import Joi from 'joi';

/**
 * Esquema de validación para crear un nuevo paciente.
 */
export const createPatientSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre es obligatorio.',
    'string.min': 'El nombre debe tener al menos 2 caracteres.',
    'string.max': 'El nombre no debe superar los 100 caracteres.',
    'any.required': 'El nombre es obligatorio.',
  }),
  age: Joi.number().integer().min(0).max(150).required().messages({
    'number.base': 'La edad debe ser un número.',
    'number.empty': 'La edad es obligatoria.',
    'number.min': 'La edad no puede ser menor que 0.',
    'number.max': 'La edad no puede ser mayor que 150.',
    'any.required': 'La edad es obligatoria.',
  }),
  rut: Joi.string()
    .regex(/^\d{1,2}\d{3}\d{3}-[\dkK]$/)
    .required()
    .messages({
      'string.pattern.base':
        'El RUT debe tener un formato válido (Ej: 12345678-9).',
      'string.empty': 'El RUT es obligatorio.',
      'any.required': 'El RUT es obligatorio.',
    }),
});

/**
 * Esquema de validación para buscar un paciente por RUT.
 */
export const getPatientByRutSchema = Joi.object({
  rut: Joi.string()
    .regex(/^\d{1,2}\d{3}\d{3}-[\dkK]$/)
    .required()
    .messages({
      'string.pattern.base':
        'El RUT debe tener un formato válido (Ej: 12345678-9).',
      'string.empty': 'El RUT es obligatorio.',
      'any.required': 'El RUT es obligatorio.',
    }),
});

export const deletePatientByIdSchema = Joi.object({
  id: Joi.number().integer().min(1).required().messages({
    'number.base': 'El ID debe ser un número.',
    'number.integer': 'El ID debe ser un número entero.',
    'number.min': 'El ID debe ser mayor o igual a 1.',
    'any.required': 'El ID es obligatorio.',
  }),
});

export const deletePatientByRutSchema = Joi.object({
  rut: Joi.string()
    .regex(/^\d{1,2}\d{3}\d{3}-[\dkK]$/)
    .required()
    .messages({
      'string.pattern.base':
        'El RUT debe tener un formato válido (Ej: 12345678-9).',
      'string.empty': 'El RUT es obligatorio.',
      'any.required': 'El RUT es obligatorio.',
    }),
});
