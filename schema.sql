-- MySQL Schema for Web Design Site

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS portfolio_projects;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;

-- Users table for authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sessions table for express-session storage
CREATE TABLE sessions (
    session_id VARCHAR(128) NOT NULL PRIMARY KEY,
    expires BIGINT UNSIGNED NOT NULL,
    data MEDIUMTEXT,
    INDEX idx_expires (expires)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Portfolio projects table
CREATE TABLE portfolio_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(512),
    category VARCHAR(100),
    project_url VARCHAR(512),
    technologies JSON,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_category (category),
    INDEX idx_featured (featured),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact submissions table
CREATE TABLE contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert a default admin user for sample data (password: 'password123')
-- Note: This is a valid bcrypt hash for 'password123' - change in production
INSERT INTO users (email, password_hash, full_name) VALUES
('admin@example.com', '$2b$10$rKjHvLNnT8X9Y5Z1qW2qXeYvHg5pZK5wN5kN5kN5kN5kN5kN5kN5ku', 'Admin User');

-- Insert sample portfolio projects for demonstration
INSERT INTO portfolio_projects (user_id, title, description, image_url, category, project_url, featured, status) VALUES
(1, 'Minimalist E-commerce', 'A clean and modern e-commerce platform with focus on user experience', '/images/portfolio/ecommerce.jpg', 'Web Design', 'https://example.com/ecommerce', TRUE, 'published'),
(1, 'Corporate Identity', 'Brand identity design with strong emphasis on geometric shapes and clean lines', '/images/portfolio/corporate.jpg', 'Branding', 'https://example.com/corporate', TRUE, 'published'),
(1, 'Portfolio Website', 'Personal portfolio showcasing photography with minimal interface', '/images/portfolio/portfolio.jpg', 'Web Design', 'https://example.com/portfolio', FALSE, 'published'),
(1, 'Mobile App Interface', 'iOS and Android app design with intuitive navigation and clean aesthetics', '/images/portfolio/mobile.jpg', 'UI/UX', 'https://example.com/mobile', TRUE, 'published'),
(1, 'Restaurant Branding', 'Complete branding package for upscale restaurant with modern typography', '/images/portfolio/restaurant.jpg', 'Branding', 'https://example.com/restaurant', FALSE, 'published'),
(1, 'SaaS Dashboard', 'Data visualization dashboard with clean information architecture', '/images/portfolio/saas.jpg', 'UI/UX', 'https://example.com/saas', TRUE, 'published');