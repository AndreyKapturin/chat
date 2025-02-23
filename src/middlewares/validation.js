import { validate, Joi } from 'express-validation';

const registrationValidationSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(32).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(8).max(16).required(),
  })
}

const loginValidationSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(8).max(16).required(),
  }),
}

export const registrationValidate = validate(registrationValidationSchema);
export const loginValidate = validate(loginValidationSchema);