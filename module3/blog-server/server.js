import express from 'express';

import {
  resetPosts,
  createPost,
  readPost,
  updatePost,
  deletePost,
  listPosts
} from './blogService.js';


const app = express();
const PORT = 3000;

app.use(express.json());

// ------------------- Routes -------------------

// Reset all posts (example route)
app.post('/reset', async (req, res) => {
  await resetPosts();
  res.json({ message: 'Posts have been reset' });
});

// TODO: Implement the following routes:
// POST /posts        → Create a new post
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try {
    const newPost = await createPost(title, content);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});
// GET /posts/:id     → Read a post by ID
app.get('/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  try {
    const post = await readPost(postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
});
// PUT /posts/:id     → Update a post by ID
app.put('/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try {
    const updatedPost = await updatePost(postId, title, content);
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});
// DELETE /posts/:id  → Delete a post by ID
app.delete('/posts/:id', async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  try {
    const deleted = await deletePost(postId);
    if (deleted) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});
// GET /posts         → List all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await listPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list posts' });
  }
});

// This is not allowing the server to run correctly because of
// the way windows 11 doses file paths.
if (process.argv[1] === new URL(import.meta.url).pathname) {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export default app;
