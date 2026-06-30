import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdb';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    searchMovies(query).then(res => setMovies(res.data.results));
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.search.value;
    setSearchParams({ query: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="search" />
        <button type="submit">Search</button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
