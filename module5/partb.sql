-- Find all posts with author’s name
SELECT p.title AS title,
       u.name AS author
FROM posts p
JOIN users u ON p.user_id = u.id;


-- Find all comments for the post with title 'First Post'
SELECT c.content AS content,
       u.name AS commenter
FROM comments c
JOIN posts p ON c.post_id = p.id
JOIN users u ON c.user_id = u.id
WHERE p.title = 'First Post';


-- Find the number of posts written by each user
SELECT u.name AS name,
       COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.name;


-- Find the top 2 posts with the most comments
SELECT p.title AS title,
       COUNT(c.id) AS comment_count
FROM posts p
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.title
ORDER BY comment_count DESC
LIMIT 2;
