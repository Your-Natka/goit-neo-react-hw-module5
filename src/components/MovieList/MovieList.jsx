import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(m => (
        <li key={m.id} className={css.item}>
          <Link
            className={css.link}
            to={`/movies/${m.id}`}
            state={{ from: location }}
          >
            {m.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
