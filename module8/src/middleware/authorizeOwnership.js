import { getPostById } from "../services/postService.js";

export async function authorizeOwnership(req, res, next) {
    const postId = parseInt(req.params.id);
    const post = await getPostById(postId);
    if(post.authorId !== req.user.id) {
        const error = new Error('Forbidden: insufficient permissions');
        error.status = 403;
        return next(error);
    }
    next();
}