import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);

        const movies = await getTrendingMovies();
        setMovies(movies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Trending today</h1>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
}
