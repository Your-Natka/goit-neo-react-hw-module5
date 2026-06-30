import { useEffect, useRef, useState } from 'react'
import { useParams, useLocation, NavLink, Outlet, Link } from 'react-router-dom'

export default function MovieDetailsPage() {
  const { movieId } = useParams()
  const location = useLocation()
  const backLink = useRef(location.state || '/movies')

  const [movie, setMovie] = useState(null)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        Authorization: 'Bearer YOUR_TOKEN'
      }
    })
      .then(r => r.json())
      .then(d => setMovie(d))
  }, [movieId])

  if (!movie) return <p>Loading...</p>

  return (
    <div>
      <Link to={backLink.current}>Go back</Link>

      <h1>{movie.title}</h1>

      <nav>
        <NavLink to='cast'>Cast</NavLink>
        <NavLink to='reviews'>Reviews</NavLink>
      </nav>

      <Outlet />
    </div>
  )
}
