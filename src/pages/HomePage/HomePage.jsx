import { useEffect, useState } from 'react'
import MovieList from '../../components/MovieList/MovieList'

export default function HomePage() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/day', {
      headers: {
        Authorization: 'Bearer YOUR_TOKEN'
      }
    })
      .then(r => r.json())
      .then(d => setMovies(d.results))
  }, [])

  return (
    <div>
      <h1>Trending</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  )
}
