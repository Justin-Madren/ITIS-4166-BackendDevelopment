import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../services/commentService.js';

export async function getAllCommentsHandler(req, res, next) {
  try {
    const {
      postId,
      search = '',
      sortBy = 'id',
      order = 'asc',
      offset = 0,
      limit = 5,
    } = req.query;

    const options = {
      postId: postId ? parseInt(postId) : undefined,
      search,
      sortBy,
      order,
      offset: parseInt(offset),
      limit: parseInt(limit),
    };
    const comments = await getAllComments(options);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

export async function getCommentByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const comment = await getCommentById(id);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function createCommentHandler(req, res, next) {
  try {
    const { postId, content } = req.body;
    const newComment = await createComment({
      postId: parseInt(postId),
      content,
    });
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
}

export async function updateCommentHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { content } = req.body;
    const updatedComment = await updateComment(id, { content });
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
}

export async function deleteCommentHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await deleteComment(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
