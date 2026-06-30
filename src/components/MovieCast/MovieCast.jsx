import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/tmdb';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId).then(res => setCast(res.data.cast));
  }, [movieId]);

  if (!cast.length) return <p>No cast info</p>;

  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.cast_id}>
          {actor.name} as {actor.character}
        </li>
      ))}
    </ul>
  );
}
