import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { getAllCategories } from '../services/categoryService.js'; 


export const validatedId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),

  handleValidationErrors
];

export const validateCategoryName = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Category name must be at least 3 characters long')
    .bail()
    .custom((value, { req }) => {
        const categoryId = req.params.id ? Number(req.params.id) : null;
        const categories = getAllCategories();

        const exists = categories.some(
            (c) =>
            c.name.toLowerCase() === value.toLowerCase() &&
            c.id !== categoryId
        );

        if (exists) {
            throw new Error('Category name must be unique');
        }

        return true;
    }),

  handleValidationErrors
];

export const validateCategoryNameForUpdate = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Category name must be at least 3 characters long')
    .bail()
    .custom((value, { req }) => {
        const categoryId = req.params.id ? Number(req.params.id) : null;
        const categories = getAllCategories();

        const exists = categories.some(
            (c) =>
            c.name.toLowerCase() === value.toLowerCase() &&
            c.id !== categoryId
        );

        if (exists) {
            throw new Error(`Category name "${value}" already exists`);
        }

        return true;
    }),

  handleValidationErrors
];
