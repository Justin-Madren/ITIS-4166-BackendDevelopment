-- Create ENUM user_roles
CREATE TYPE user_roles AS ENUM ('admin', 'member');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    role user_roles DEFAULT 'member'
);

--- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id),
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_comment_id INT REFERENCES comments(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP
);
    

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Create post_categories table
CREATE TABLE IF NOT EXISTS post_categories (
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    PRIMARY KEY (category_id, post_id)
);


-- Add data to the users table
INSERT INTO users (name, email, role) VALUES
('Alice Johnson', 'alice@example.com', 'admin'),
('Bob Smith', 'bob@example.com', 'member');

-- Add data to the categories table
INSERT INTO categories (name) VALUES
('Technology'),
('Lifestyle'),
('Education');

-- Add data to the posts table
INSERT INTO posts (user_id, title, content, created_at) VALUES
(1, 'Intro to SQL', 'This is a beginner guide to SQL.', CURRENT_TIMESTAMP),
(1, 'Advanced Databases', 'Discussion on indexing and optimization.', CURRENT_TIMESTAMP),
(2, 'Healthy Living Tips', 'Tips for maintaining a healthy lifestyle.', CURRENT_TIMESTAMP),
(2, 'Learning Java', 'Basics of Java programming.', CURRENT_TIMESTAMP);

-- Add data to the post_categories table
INSERT INTO post_categories (category_id, post_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(3, 1);  -- Post 1 belongs to two categories

-- Add data to the comments table
INSERT INTO comments (post_id, user_id, content, created_at) VALUES
(1, 2, 'Great introduction!', CURRENT_TIMESTAMP),
(2, 2, 'Very informative.', CURRENT_TIMESTAMP),
(3, 1, 'Nice health tips!', CURRENT_TIMESTAMP),
(4, 1, 'Good explanation of Java basics.', CURRENT_TIMESTAMP);
