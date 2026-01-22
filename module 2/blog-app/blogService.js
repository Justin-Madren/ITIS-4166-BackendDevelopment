// blogService.js
// This module handles blog post CRUD operations

import fs from 'fs/promises';
import { format } from 'date-fns';
import { join } from 'path';

// Filepath for posts.json. Use this for reading/writing posts.
const postsFile = join(process.cwd(), 'posts.json');


/**
 * Reset posts.json: clear all posts and set nextId back to 1.
 */
export async function resetPosts() {
    /**
     * The goal for the function is to reset the posts.json so that
     * there is notthing there so the simplest way to do that is to
     * overwright everthing and seting the next ID to 1 so the next post
     * added will start at the begining.
     * Its done in a try catch so if there is no array there or the file 
     * is missing it will return the error message.
     */
    try{
        const initialData = { nextId: 1, posts: [] };
        await fs.writeFile(postsFile, JSON.stringify(initialData, null, 2), 'utf-8');

    }catch(error){
        console.error('Error resetting posts:', error);
    }
}

/**
 * Add a new post with a unique ID and timestamp.
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @returns {object} The newly created post object
 */
export async function createPost(title, content) {
    try {
        const data = await fs.readFile(postsFile, 'utf-8');
        const blogData = JSON.parse(data);

        const newPost = {
            content,
            timestamp: format(new Date(), 'yyyy-M-d h:m a'),
            id: blogData.nextId,
            title
        };

        blogData.posts.push(newPost);
        blogData.nextId += 1;

        await fs.writeFile(postsFile, JSON.stringify(blogData, null, 2), 'utf-8');

        return newPost;

    } catch (error) {
        console.error('Error creating post:', error);
        throw error;   
    }
}

/**
 * Find and return a post by its ID.
 * @param {number} id - Post ID
 * @returns {object|undefined} The post if found, otherwise undefined
 */
export async function readPost(id) {
    try {
        const data = await fs.readFile(postsFile, 'utf-8');
        const blogData = JSON.parse(data);
        return blogData.posts.find(post => post.id === id);

    } catch (error) {
        console.error('Error reading post:', error);
        throw error;        
    }
}

/**
 * Update a post's title and/or content.
 * @param {number} id - Post ID
 * @param {string} newTitle - New title (optional)
 * @param {string} newContent - New content (optional)
 * @returns {boolean} True if updated successfully, false if post not found
 */
export async function updatePost(id, newTitle, newContent) {
    try {
        const data = await fs.readFile(postsFile, 'utf-8');
        const blogData = JSON.parse(data);

        const post = blogData.posts.find(post => post.id === id);
        if (!post) {
            return false;
        }

        if (newTitle) {
            post.title = newTitle;
        }
        if (newContent) {
            post.content = newContent;
        }

        await fs.writeFile(postsFile, JSON.stringify(blogData, null, 2), 'utf-8');
        return true;


    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

/**
 * Delete a post by its ID.
 * @param {number} id - Post ID
 * @returns {boolean} True if deleted successfully, false if post not found
 */
export async function deletePost(id) {
    try {
        const data = await fs.readFile(postsFile, 'utf-8');
        const blogData = JSON.parse(data);

        const postIndex = blogData.posts.findIndex(post => post.id === id);
        if (postIndex === -1) {
            return false;
        }

        blogData.posts.splice(postIndex, 1);

        await fs.writeFile(postsFile, JSON.stringify(blogData, null, 2), 'utf-8');
        return true;

    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}

/**
 * Return all posts as an array of objects.
 * @returns {Array<object>} Array of all post objects
 */
export async function listPosts() {
    try {
        const data = await fs.readFile(postsFile, 'utf-8');
        const blogData = JSON.parse(data);
        return blogData.posts;

    } catch (error) {
        console.error('Error listing posts:', error);
        throw error;
    }
}

