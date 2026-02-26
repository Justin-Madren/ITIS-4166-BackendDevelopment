import { comments, getNextId } from '../db/comments.js';
import pool from '../db/db.js';

export async function getAll({ postId, search, sortBy, order, offset, limit }) {
  let text = `SELECT id, post_id as "postId", content, created_at as "createdAt" FROM comments`;
  let countText = `SELECT COUNT(*) FROM comments`;
  const values = [];
  const countValues = [];
  const conditions = [];
  if (postId) {
    values.push(postId);
    countValues.push(postId);
    conditions.push(`post_id = $${values.length}`);
  }
  if (search) {
    values.push(`%${search}%`);
    countValues.push(`%${search}%`);
    conditions.push(`(content ILIKE $${values.length})`);
  }
  if (conditions.length > 0) {
    text += ` WHERE ${conditions.join(' AND ')}`;
    countText += ` WHERE ${conditions.join(' AND ')}`;
  }
  if (sortBy === 'createdAt') sortBy = 'created_at';
  text += ` ORDER BY ${sortBy} ${order}`;
  values.push(limit);
  values.push(offset);
  text += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
  const [result, countResult] = await Promise.all([
    pool.query(text, values),
    pool.query(countText, countValues)
  ]);
  return { total: parseInt(countResult.rows[0].count, 10), comments: result.rows };
}

export async function getById(id) {
  const text = 'SELECT id, post_id as "postId", content, created_at as "createdAt" FROM comments WHERE id = $1';
  const values = [id];
  const result = await pool.query(text, values);
  return result.rows[0];
}

export async function create(data) {
  // Check if post exists
  const postCheck = await pool.query('SELECT 1 FROM posts WHERE id = $1', [data.postId]);
  if (postCheck.rowCount === 0) {
    const error = new Error(`id ${data.postId} does not exist`);
    error.status = 400;
    throw error;
  }
  const text = `INSERT INTO comments (post_id, content)
                VALUES ($1, $2)
                RETURNING
                id,
                post_id as "postId",
                content,
                created_at AS "createdAt"`;
  const values = [data.postId, data.content];
  const result = await pool.query(text, values);
  return result.rows[0];
}

export async function update(id, updatedData) {
  const text = `UPDATE comments
                SET 
                  content = COALESCE($1, content)
                WHERE 
                  id = $2
                RETURNING
                id,
                post_id as "postId",
                content,
                created_at AS "createdAt"`;
  const values = [updatedData.content, id];
  const result = await pool.query(text, values);
  return result.rows[0];
}

export async function remove(id) {
  const text = `DELETE FROM comments WHERE id = $1`;
  const values = [id];
  const result = await pool.query(text, values);
  return result.rowCount > 0;
}
