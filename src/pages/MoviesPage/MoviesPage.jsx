import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieList from '../../components/MovieList/MovieList'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [params, setParams] = useSearchParams()
  const query = params.get('query') || ''

  useEffect(() => {
    if (!query) return
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
      headers: {
        Authorization: 'Bearer YOUR_TOKEN'
      }
    })
      .then(r => r.json())
      .then(d => setMovies(d.results))
  }, [query])

  const onSubmit = (e) => {
    e.preventDefault()
    setParams({ query: e.target.search.value })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='search' />
        <button>Search</button>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  )
}
