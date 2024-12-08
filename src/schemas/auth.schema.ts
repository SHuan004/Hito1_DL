import Joi from 'joi';

export const authLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
