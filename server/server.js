// backend/server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET /movies — отримати всі фільми
app.get('/movies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /movies/:id — отримати фільм за id
app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /movies — додати новий фільм
app.post('/movies', async (req, res) => {
  const { title, director, year, genre, rating } = req.body;

  // Валідація
  if (!title || typeof title !== 'string' || title.length === 0) {
    return res.status(400).json({ error: 'Title is required and must be a string' });
  }
  if (rating && (rating < 0 || rating > 10)) {
    return res.status(400).json({ error: 'Rating must be between 0 and 10' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO movies (title, director, year, genre, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, director, year, genre, rating]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /movies/:id — оновити фільм
app.put('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { title, director, year, genre, rating } = req.body;

  // Валідація
  if (title && (typeof title !== 'string' || title.length === 0)) {
    return res.status(400).json({ error: 'Title must be a non-empty string' });
  }
  if (rating && (rating < 0 || rating > 10)) {
    return res.status(400).json({ error: 'Rating must be between 0 and 10' });
  }

  try {
    const existing = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
    if (existing.rows.length === 0) return res.status(404).json({ error: 'Movie not found' });

    // Оновлення (встановлюємо тільки передані поля)
    const movie = existing.rows[0];
    const updatedMovie = {
      title: title ?? movie.title,
      director: director ?? movie.director,
      year: year ?? movie.year,
      genre: genre ?? movie.genre,
      rating: rating ?? movie.rating,
    };

    const result = await pool.query(
      `UPDATE movies SET title=$1, director=$2, year=$3, genre=$4, rating=$5 WHERE id=$6 RETURNING *`,
      [updatedMovie.title, updatedMovie.director, updatedMovie.year, updatedMovie.genre, updatedMovie.rating, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /movies/:id — видалити фільм
app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
