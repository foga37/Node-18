// frontend/src/components/MovieList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MovieList({ onEdit, onDelete }) {
  const [movies, setMovies] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;


  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/movies`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, );

  return (
    <div>
      <h2>Список фільмів</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th><th>Director</th><th>Year</th><th>Genre</th><th>Rating</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(m => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.director}</td>
              <td>{m.year}</td>
              <td>{m.genre}</td>
              <td>{m.rating}</td>
              <td>
                <button onClick={() => onEdit(m)}>Edit</button>
                <button onClick={() => onDelete(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
