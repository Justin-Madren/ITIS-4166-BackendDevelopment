import {param, body, oneOf, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validatedId = [
    param('id')
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('ID must be a positive integer'),

    handleValidationErrors
];

export const validateCreatePost = [
    body('title')
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .trim()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .isLength({min: 3})
    .withMessage('Title must be at least 3 characters long'),

    body('content')
    .notEmpty()
    .withMessage('Content is required')
    .bail()
    .trim()
    .isString()
    .withMessage('Content must be a string')
    .bail()
    .isLength({min: 10})
    .withMessage('Content must be at least 10 characters long'),


    handleValidationErrors
];


export const validateUpdatePost = [
    body().custom((value, { req }) => {
      const bodyKeys = Object.keys(req.body);
      if (bodyKeys.length === 0) {
        throw new Error('At least one of title or content must be provided');
      }
      if (!req.body.title && !req.body.content) {
        throw new Error('At least one of title or content must be provided');
      }
      return true;
    }).bail(),

    body('title')
    .optional()
    .trim()
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .isLength({min: 3})
    .withMessage('Title must be at least 3 characters long'),

    body('content')
    .optional()
    .trim()
    .isString()
    .withMessage('Content must be a string')
    .bail()
    .isLength({min: 10})
    .withMessage('Content must be at least 10 characters long'),

    handleValidationErrors
];

export const validatePostQuery = [
    query('sortBy')
    .optional()
    .isIn(['id', 'title', 'createdAt', 'content'])
    .withMessage('sortBy must be one of id, title, createdAt, content'),

    query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),

    query('offset')
    .optional()
    .isInt({min: 0})
    .withMessage('offset must be a non-negative integer'),

    query('limit')
    .optional()
    .isInt({min: 1, max: 50})
    .withMessage('limit must be a positive integer between 1 and 50'),

    handleValidationErrors
];  

