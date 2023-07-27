const Joi = require('@hapi/joi');
import { failureResponse } from '../helpers/api-response.helper';
import { encrypt } from '../services/crypto.service';

// Sign-up schema validation
export const signupUserValidation = async (req, res, next) => {
  // console.log('Here is the req Body..', req.body);
  const schema = Joi.object().keys({
    name: Joi.string().required().messages({
      'string.base': `Name should be a type of 'text'`,
      'string.empty': `Name cannot be an empty field`,
      'any.required': `Name is a required`,
    }),
    email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
      'string.base': `Email should be a type of 'text'`,
      'string.empty': `Email cannot be empty`,
      'string.email': `Email is not valid`,
    }),
    password: Joi.string()
      .min(6)
      .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{6,}$/)
      .messages({
        'object.regex': 'Must have at least 6 characters',
        'string.pattern.base':
          'Password must be 6 character 1 capital letter 1 digit',
        'string.base': `Password should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'string.max': `Password should have a maximum length of {#limit}`,
        'any.required': `Password is a required`,
      })
      .required(),
    confirmPassword: Joi.valid(Joi.ref('password'))
      .messages({ 'any.only': 'Passwords must match.' })
      .required(),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    inviteCode: Joi.string().required(),
    isFieldAgent: Joi.boolean().optional(),
    lastResetPasswordDate: Joi.date().optional(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return failureResponse(
      res,
      400,
      value.error,
      value.error.details[0].message
        ? value.error.details[0].message
        : 'Bad request'
    );
  } else {
    req.body.password = await encrypt(req.body.password);
    next();
  }
};

// Sign-in schema validation
export const signinUserValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    password: Joi.string().required(),
    phoneNumber: Joi.string()
      .min(7)
      .max(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return failureResponse(
      res,
      400,
      value.error,
      value.error.details[0].message
        ? value.error.details[0].message
        : 'Bad request'
    );
  } else {
    next();
  }
};

// Reset password validation
export const resetPasswordValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    password: Joi.string()
      .min(6)
      .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{6,}$/)
      .messages({
        'object.regex': 'Must have at least 6 characters',
        'string.pattern.base':
          'Password must be 6 character 1 capital letter 1 digit',
        'string.base': `Password should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'string.max': `Password should have a maximum length of {#limit}`,
        'any.required': `Password is a required`,
      })
      .required(),
    confirmPassword: Joi.valid(Joi.ref('password'))
      .messages({ 'any.only': 'Passwords must match.' })
      .required(),
    phoneNumber: Joi.string()
      .min(7)
      .max(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return failureResponse(
      res,
      400,
      value.error,
      value.error.details[0].message
        ? value.error.details[0].message
        : 'Bad request'
    );
  } else {
    req.body.password = await encrypt(req.body.password);
    next();
  }
};

// update user schema validation
export const updateUserValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().messages({
      'string.base': `Name should be a type of 'text'`,
      'string.empty': `Name cannot be an empty field`,
      'any.required': `Name is a required`,
    }),
    email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
      'string.base': `Email should be a type of 'text'`,
      'string.empty': `Email cannot be empty`,
      'string.email': `Email is not valid`,
    }),
    password: req.user.user.password,
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),
    inviteCode: Joi.any().optional(),
    isFieldAgent: Joi.boolean().optional(),
    lastResetPasswordDate: Joi.date().optional(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return failureResponse(
      res,
      400,
      value.error,
      value.error.details[0].message
        ? value.error.details[0].message
        : 'Bad request'
    );
  } else {
    next();
  }
};

// Add auth-code schema validation
export const addAuthCodeValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    userId: Joi.string().optional(),
    entity: Joi.string().optional(),
    code: Joi.string().required(),
    codeType: Joi.string().optional(),
    status: Joi.boolean().optional(),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional(),
  });
  const value = schema.validate(req.body);
  if (value.error) {
    return failureResponse(
      res,
      400,
      value.error,
      value.error.details[0].message
        ? value.error.details[0].message
        : 'Bad request'
    );
  } else {
    next();
  }
};
