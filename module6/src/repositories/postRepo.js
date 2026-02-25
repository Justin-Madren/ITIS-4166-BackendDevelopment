import { posts, getNextId } from '../db/posts.js';
import pool from '../db/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  let text = `SELECT id, title, content, created_at as "createdAT" FROM posts`;
  const values = [];
  const conditions = [];
  if(search){
    values.push(`%${search}%`);
    conditions.push(
      `(title ILIKE $${values.length} OR content ILIKE $${values.length})`,
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
  const text = 'SELECT id, title, content, created_at as "createdAT" FROM posts WHERE id = $1'
  const values = [id];
  const result = await pool.query(text, values);
  return result.rows[0];
}

export async function create(postData) {
  const text = `INSERT INTO posts (title, content)
                VALUES ($1, $2)
                RETURNING
                id,
                title,
                content,
                created_at AS "createdAT"`;
  const values =[postData.title, postData.content];
  const result = await pool.query(text, values);
  return result.rows[0];
}

export async function update(id, updatedData) {
  const text = `UPDATE posts
                SET 
                  title = COALESCE($1, title), 
                  content = COALESCE($2, content)
                WHERE 
                  id = $3
                RETURNING
                id,
                title,
                content,
                created_at AS "createdAT"`;
  const values = [updatedData.title, updatedData.content, id];
  const result = await pool.query(text, values);
  return result.rows[0];
}

export async function remove(id) {
  const text = `DELETE FROM posts WHERE id = $1`;
  const values = [id];
  const result = await pool.query(text, values);
  return result.rowCount > 0;
}

export function postExists(id) {
  return posts.some((p) => p.id === id);
}
