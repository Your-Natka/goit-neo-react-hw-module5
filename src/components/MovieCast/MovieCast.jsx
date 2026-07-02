import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/tmdb';
import css from './MovieCast.module.css';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w200';

export default function MovieCast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);

        const cast = await getMovieCast(movieId);
        setCast(cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (cast.length === 0) {
    return <p>We don't have any cast information for this movie.</p>;
  }

  return (
    <ul className={css.list}>
      {cast.map(actor => (
        <li key={actor.id} className={css.item}>
          {actor.profile_path ? (
            <img
              className={css.image}
              src={`${IMAGE_URL}${actor.profile_path}`}
              alt={actor.name}
              width="100"
            />
          ) : (
            <p>No image</p>
          )}

          <h3 className={css.name}>{actor.name}</h3>
          <p className={css.character}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
