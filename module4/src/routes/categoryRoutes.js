import express from 'express';
import{
    getAllCategoriesHandler,
    getCategoryByIdHandler,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from '../controllers/categoryController.js';
import{
    validatedId,
    validateCategoryName,
    validateCategoryNameForUpdate
} from '../middleware/categoriesValidators.js';

const router = express.Router();



router.get('/', getAllCategoriesHandler);
router.get('/:id', validatedId, getCategoryByIdHandler);
router.post('/', validateCategoryName, createCategoryHandler);
router.put('/:id', validatedId, validateCategoryNameForUpdate, updateCategoryHandler);
router.delete('/:id', validatedId, deleteCategoryHandler);

export default router;