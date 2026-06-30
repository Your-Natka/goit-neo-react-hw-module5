import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/tmdb';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(res => setReviews(res.data.results));
  }, [movieId]);

  if (!reviews.length) return <p>No reviews</p>;

  return (
    <ul>
      {reviews.map(r => (
        <li key={r.id}>
          <h4>{r.author}</h4>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
