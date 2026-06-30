import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/tmdb';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(res => setMovies(res.data.results));
  }, []);

  return (
    <div>
      <h1>Trending</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
