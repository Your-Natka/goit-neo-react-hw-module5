import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    searchMovies(query).then(setMovies);
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.search.value;
    setSearchParams({ query: value });
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input name="search" className={css.input} />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
