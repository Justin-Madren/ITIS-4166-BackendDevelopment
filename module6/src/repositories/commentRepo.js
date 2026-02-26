import { comments, getNextId } from '../db/comments.js';
import pool from '../db/db.js';

export async function getAll({ postId, search, sortBy, order, offset, limit }) {
  let text = `SELECT id, post_Id, content, created_at as "createdAT" FROM comments`;
  const values = [];
  const conditions = [];
  if(search){
    values.push(`%${search}%`);
    conditions.push(
      `(content ILIKE $${values.length})`,
    );
  }
  if (conditions.length > 0) {
    text += ` WHERE ${conditions.join(' AND ')}`;
  }

   if(sortBy === 'createdAt') sortBy = 'created_at';

   text += ` ORDER BY ${sortBy} ${order}`;

    values.push(limit);
    values.push(offset);
    text += ` LIMIT $${values.length -1} OFFSET $${values.length}`;

  const result = await pool.query(text, values);
  return result.rows;
}

export async function getById(id) {
  const text = 'SELECT id, content, created_at as "createdAT" FROM comments WHERE id = $1'
  const values = [id];
  const result = await pool.query(text, values);
  return result.rows[0];
}

export async function create(data) {
  const text = `INSERT INTO comments (post_id, content)
                VALUES ($1, $2)
                RETURNING
                id,
                post_id,
                content,
                created_at AS "createdAT"`;
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
                post_id,
                content,
                created_at AS "createdAT"`;
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
