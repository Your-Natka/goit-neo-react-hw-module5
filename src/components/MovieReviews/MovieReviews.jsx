import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/tmdb';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const reviews = await getMovieReviews(movieId);
      setReviews(reviews);
    }

    fetchReviews();
  }, [movieId]);

  if (!reviews.length) return <p>No reviews</p>;

  return (
    <ul className={css.list}>
      {reviews.map(r => (
        <li key={r.id} className={css.item}>
          <h4 className={css.author}>{r.author}</h4>
          <p className={css.content}>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
