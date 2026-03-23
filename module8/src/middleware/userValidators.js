import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignup = [
  body('email')
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .trim()
    .isEmail()
    .withMessage('Must be a valid email format')
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must contain at least 8 characters and at most 64 characters'),

  body('role')
    .optional()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];

export const validateLogin = [
  body('email')
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .trim()
    .isEmail()
    .withMessage('Must be a valid email format'),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required'),

  handleValidationErrors,
];

export const validateUpdateUser = [
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Must be a valid email format')
    .normalizeEmail(),

  body('password')
    .optional()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must contain at least 8 characters and at most 64 characters'),

  body()
    .custom((value, { req }) => {
      if (Object.keys(req.body).length === 0) {
        throw new Error('At least one field (email or password) must be provided');
      }
      if (!req.body.email && !req.body.password) {
        throw new Error('At least one field (email or password) must be provided');
      }
      return true;
    }),

  handleValidationErrors,
];

export const validateUpdateRole = [
  body('role')
    .exists({ values: 'falsy' })
    .withMessage('Role is required')
    .bail()
    .isIn(['USER', 'ADMIN'])
    .withMessage('Role must be either USER or ADMIN'),

  handleValidationErrors,
];
