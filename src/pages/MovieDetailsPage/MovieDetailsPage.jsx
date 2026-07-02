import { useEffect, useRef, useState } from 'react';
import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from 'react-router-dom';
import { getMovieDetails } from '../../services/tmdb';
import css from './MovieDetailsPage.module.css';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();

  const backLink = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const movieData = await getMovieDetails(movieId);
      setMovie(movieData);
    }

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const userScore = Math.round(movie.vote_average * 10);

  return (
    <main className={css.container}>
      <Link to={backLink.current} className={css.back}>
        ← Go back
      </Link>

      <div className={css.info}>
        <img
          className={css.poster}
          src={
            movie.poster_path
              ? `${IMAGE_URL}${movie.poster_path}`
              : 'https://placehold.co/300x450?text=No+Image'
          }
          alt={movie.title}
        />

        <div className={css.description}>
          <h1>
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h1>

          <p>
            <strong>User Score:</strong> {userScore}%
          </p>

          <h3>Overview</h3>
          <p>{movie.overview}</p>

          <h3>Genres</h3>

          <p>{movie.genres.map(genre => genre.name).join(' ')}</p>
        </div>
      </div>

      <div className={css.additional}>
        <h3>Additional information</h3>

        <nav className={css.nav}>
          <NavLink
            to="cast"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Cast
          </NavLink>

          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </main>
  );
}
