import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../services/postService.js";


export function getAllPostsHandler(req, res) {
    const {
        title = '',
        sortBy = 'id',
        order = 'asc',
        offset = 0,
        limit = 5
    } = req.query;

    const options = {
        title,
        sortBy,
        order,
        offset: parseInt(offset),
        limit: parseInt(limit)
    }
    let posts = getAllPosts(options);
    res.status(200).json(posts);
} 

export function getPostByIdHandler(req, res) {
    const id = parseInt(req.params.id);
    const post = getPostById(id);
    res.status(200).json(post);
}

export function createPostHandler(req, res){
    const { title, content } = req.body;
    const newPost = createPost({ title, content });
    res.status(201).json(newPost);
}

export function updatePostHandler(req, res){
    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    if (title === undefined && content === undefined) {
        return res.status(400).json({
            error: 'At least one field (title or content) is required'
        });
    }

    const existing = getPostById(id);
    if (!existing) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const updatedPost = updatePost(id, { title, content });
    res.status(200).json(updatedPost);
}

export function deletePostHandler(req, res){
    const id = parseInt(req.params.id);
    deletePost(id);
    res.status(204).send();
}