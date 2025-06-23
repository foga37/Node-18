CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255),
    year INT,
    genre VARCHAR(100),
    rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 10)
);
