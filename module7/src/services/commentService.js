import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/commentRepo.js';

export async function getAllComments(options) {
  return getAll(options);
}

export async function getCommentById(id) {
  const comment = await getById(id);
  if (comment) return comment;
  const error = new Error(`Comment ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createComment(data) {
  try {
    return await create(data);
  } catch (error) {
    if (error.code === 'P2003') {
      const err = new Error(
        `Cannot create comment: referenced post with id ${data.postId} does not exist`,
      );
      err.status = 400;
      throw err;
    }
    throw error;
  }
}

export async function updateComment(id, data) {
  const updatedComment = await update(id, data);
  if (updatedComment) return updatedComment;
  const error = new Error(`Comment ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deleteComment(id) {
  const result = await remove(id);
  if (result) return;
  const error = new Error(`Comment ${id} not found`);
  error.status = 404;
  throw error;
}
