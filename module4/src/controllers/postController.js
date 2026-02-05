import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../services/postService.js";


export function getAllPostsHandler(req, res) {
    let posts = getAllPosts();
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
    const updatedPost = updatePost(id, { title, content });
    res.status(200).json(updatedPost);
}

export function deletePostHandler(req, res){
    const id = parseInt(req.params.id);
    deletePost(id);
    res.status(204).send();
}