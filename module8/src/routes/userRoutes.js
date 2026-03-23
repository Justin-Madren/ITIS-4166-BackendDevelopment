import express from 'express';
import { 
    getAllUsersHandler,
    getMeHandler,
    updateMeHandler,
    deleteMeHandler,
    getMyPostsHandler,
    updateUserRoleHandler
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { param } from 'express-validator';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';
import { validateUpdateUser, validateUpdateRole } from '../middleware/userValidators.js';

const router = express.Router();

// Admin-only routes
router.get('/', authenticate, authorizeAdmin, getAllUsersHandler);

// Authenticated routes - user's own profile
router.get('/me', authenticate, getMeHandler);
router.put('/me', authenticate, validateUpdateUser, updateMeHandler);
router.delete('/me', authenticate, deleteMeHandler);
router.get('/me/posts', authenticate, getMyPostsHandler);

// Admin routes
router.patch(
    '/:id/role',
    authenticate,
    authorizeAdmin,
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),
    handleValidationErrors,
    validateUpdateRole,
    updateUserRoleHandler
);

export default router;