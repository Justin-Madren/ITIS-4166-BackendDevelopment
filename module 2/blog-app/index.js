// index.js
// This module reads commands from commands.json and executes them sequentially.

import fs from 'fs/promises';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { 
  resetPosts,
  createPost,
  readPost,
  updatePost,
  deletePost,
  listPosts
} from './blogService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/**
 * Executes a single blog command object.
 * The command object has an "action" property and optional data (title, content, id).
 * Each case performs any necessary input validation, executes the action, and logs the outcome.
 * 
 * @param {object} cmd - The command to process
 * 
 * Implement each case based on the descriptions below.
 */
export async function processCommand(cmd) {
  switch (cmd.action) {
    case 'reset': {
      // Clears all posts and resets nextId to 1
      // Logs: "Posts have been reset"
      await resetPosts();
      console.log('Posts have been reset');
      break;
    }
    case 'create': {
      // Check that title and content are provided
      // If missing, log "Title and content must be provided"
      // Otherwise, create a new post with a unique ID and timestamp
      // Logs: "Created post <id>: <title>"
      const { title, content } = cmd;
      if (!title || !content) {
        console.log('Title and content must be provided');
        break;
      }
      const newPost = await createPost(title, content);
      console.log(`Created post ${newPost.id}: ${newPost.title}`);
      break;
    }
    case 'read': {
      // Look up a post by ID
      // If found, log "Post <id>: <title> - <content>"
      // If not found, log "Post <id> not found"
      const post = await readPost(cmd.id);
      if (post) {
        console.log(`Post ${post.id}: ${post.title} - ${post.content}`);
      }else{
        console.log(`Post ${cmd.id} not found`);
      }
      break;
    }
    case 'update': {
      // Ensure at least title or content is provided
      // If both are empty, log "Either title or content must be provided"
      // Update the post if it exists
      // Log "Post <id> updated" if successful
      // Log "Post <id> not found" if ID does not exist
      const { id, title, content } = cmd;
      if (!title && !content) {
        console.log('Either title or content must be provided');
        break;
      }
      const updated = await updatePost(id, title, content);
      if (updated) {
        console.log(`Post ${id} updated`);
      } else {
        console.log(`Post ${id} not found`);
      }
      break;
    }
    case 'delete': {
      // Delete a post by ID
      // Log "Post <id> deleted" if successful
      // Log "Post <id> not found" if ID does not exist
      const deleted = await deletePost(cmd.id);
      if (deleted) {
        console.log(`Post ${cmd.id} deleted`);
      }else{
        console.log(`Post ${cmd.id} not found`);
      }
      break;
    }
    case 'list': {
      // Lists all posts as an array of objects
      // Logs: "All posts: [<array of post objects>]"
      const posts = await listPosts();
      console.log('All posts:', posts);
      break;
    }
    case 'exit': {
      console.log('Exiting program');
      process.exit(0);
    }
    default: {
      console.log(`Unknown action: ${cmd.action}`);
      break;
    }
  }
}

/**
 * If this file is executed directly,
 * read commands from commands.json and process them sequentially.
 */

if (resolve(process.argv[1]) === __filename) {
  const commandsFilePath = join(__dirname, 'commands.json');

  const data = await fs.readFile(commandsFilePath, 'utf-8');
  const commands = JSON.parse(data);

  for (const cmd of commands) {
    await processCommand(cmd);
  }
}