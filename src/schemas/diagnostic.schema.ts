import Joi from 'joi';

/**
 * Esquema de validación para crear un nuevo diagnóstico.
 */
export const createDiagnosticSchema = Joi.object({
  description: Joi.string().min(5).max(255).required().messages({
    'string.base': 'La descripción debe ser un texto.',
    'string.empty': 'La descripción es obligatoria.',
    'string.min': 'La descripción debe tener al menos 5 caracteres.',
    'string.max': 'La descripción no debe superar los 255 caracteres.',
    'any.required': 'La descripción es obligatoria.',
  }),
  severity: Joi.number().integer().min(1).max(6).required().messages({
    'number.base': 'La severidad debe ser un número.',
    'number.integer': 'La severidad debe ser un número entero.',
    'number.min': 'La severidad debe estar entre 1 y 6.',
    'number.max': 'La severidad debe estar entre 1 y 6.',
    'any.required': 'La severidad es obligatoria.',
  }),
  patient_id: Joi.number().integer().required().messages({
    'number.base': 'El ID del paciente debe ser un número.',
    'number.integer': 'El ID del paciente debe ser un número entero.',
    'any.required': 'El ID del paciente es obligatorio.',
  }),
  staff_id: Joi.number().integer().required().messages({
    'number.base': 'El ID del staff debe ser un número.',
    'number.integer': 'El ID del staff debe ser un número entero.',
    'any.required': 'El ID del staff es obligatorio.',
  }),
});

/**
 * Esquema de validación para buscar un diagnóstico por ID.
 */
export const getDiagnosticByIdSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'El ID del diagnóstico debe ser un número.',
    'number.integer': 'El ID del diagnóstico debe ser un número entero.',
    'any.required': 'El ID del diagnóstico es obligatorio.',
  }),
});
