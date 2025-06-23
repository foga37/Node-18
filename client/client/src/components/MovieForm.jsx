// frontend/src/components/MovieForm.js
import React, { useState, useEffect } from 'react';

export default function MovieForm({ movieToEdit, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movieToEdit) {
      setTitle(movieToEdit.title || '');
      setDirector(movieToEdit.director || '');
      setYear(movieToEdit.year || '');
      setGenre(movieToEdit.genre || '');
      setRating(movieToEdit.rating || '');
      setErrors({});
    } else {
      setTitle('');
      setDirector('');
      setYear('');
      setGenre('');
      setRating('');
      setErrors({});
    }
  }, [movieToEdit]);

  const validate = () => {
    const errs = {};
    if (!title) errs.title = 'Title is required';
    if (rating && (rating < 0 || rating > 10)) errs.rating = 'Rating must be between 0 and 10';
    if (year && (isNaN(year) || year < 1888)) errs.year = 'Year must be a valid number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title,
      director,
      year: year ? parseInt(year, 10) : null,
      genre,
      rating: rating ? parseFloat(rating) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{movieToEdit ? 'Редагувати фільм' : 'Додати фільм'}</h3>
      <div>
        <label>Title*: </label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        {errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
      </div>
      <div>
        <label>Director: </label>
        <input value={director} onChange={e => setDirector(e.target.value)} />
      </div>
      <div>
        <label>Year: </label>
        <input value={year} onChange={e => setYear(e.target.value)} />
        {errors.year && <span style={{color: 'red'}}>{errors.year}</span>}
      </div>
      <div>
        <label>Genre: </label>
        <input value={genre} onChange={e => setGenre(e.target.value)} />
      </div>
      <div>
        <label>Rating (0-10): </label>
        <input value={rating} onChange={e => setRating(e.target.value)} />
        {errors.rating && <span style={{color: 'red'}}>{errors.rating}</span>}
      </div>
      <button type="submit">{movieToEdit ? 'Зберегти' : 'Додати'}</button>
      <button type="button" onClick={onCancel}>Скасувати</button>
    </form>
  );
}
