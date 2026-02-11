import express from 'express';
import { 
    getAllPostsHandler, 
    getPostByIdHandler, 
    createPostHandler, 
    updatePostHandler,
    deletePostHandler 
} from '../controllers/postController.js';

import { 
    validatedId, 
    validateCreatePost, 
    validateUpdatePost,
    validatePostQuery
 } from '../middleware/postValidatiors.js';


const router = express.Router();

router.get('/', validatePostQuery, getAllPostsHandler);
router.get('/:id', validatedId, getPostByIdHandler);
router.post('/', validateCreatePost, createPostHandler);
router.put('/:id',validatedId, validateUpdatePost, updatePostHandler);
router.delete('/:id',validatedId, deletePostHandler);




export default router;