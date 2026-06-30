import { useEffect, useRef, useState } from 'react';
import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdb';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();

  const backLink = useRef(location.state ?? '/movies');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(res => setMovie(res.data));
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <Link to={backLink.current}>← Go back</Link>

      <h1>{movie.title}</h1>

      <nav>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
