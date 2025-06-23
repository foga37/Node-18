import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/movies`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch movies');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addMovie = async (movie) => {
    try {
      await axios.post(`${API_URL}/movies`, movie);
      fetchMovies();
      setEditingMovie(null);
    } catch (err) {
      console.error(err);
      alert('Failed to add movie');
    }
  };

  const updateMovie = async (movie) => {
    try {
      await axios.put(`${API_URL}/movies/${editingMovie.id}`, movie);
      fetchMovies();
      setEditingMovie(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update movie');
    }
  };

  const deleteMovie = async (id) => {
    if (!window.confirm('Видалити цей фільм?')) return;
    try {
      await axios.delete(`${API_URL}/movies/${id}`);
      fetchMovies();
    } catch (err) {
      console.error(err);
      alert('Failed to delete movie');
    }
  };

  const handleSubmit = (movie) => {
    if (editingMovie) {
      updateMovie(movie);
    } else {
      addMovie(movie);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <MovieList movies={movies} onEdit={setEditingMovie} onDelete={deleteMovie} />
      <hr />
      <MovieForm
        movieToEdit={editingMovie}
        onSubmit={handleSubmit}
        onCancel={() => setEditingMovie(null)}
      />
    </div>
  );
}

export default App;
