import { getAll,getById,create,update,remove } from "../repositories/postRepo.js";


export function getAllPosts(){
    return getAll();
}

export function getPostById(id){
    const post =  getById(id);
    if(post){
        return post;
    }else{
        const error = new Error(`Post ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export function createPost(postData){
    return create(postData);
}

export function updatePost(id, postData){
    const updatedPost = update(id, postData);
    if(updatedPost){
        return updatedPost;
    }else{
        const error = new Error(`Post ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export function deletePost(id){
    const result = remove(id);
    if(result){
        return;
    }else{
        const error = new Error(`Post ${id} not found`);
        error.status = 404;
        throw error;
    }
}