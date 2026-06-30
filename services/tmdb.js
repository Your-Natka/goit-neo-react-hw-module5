import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = 'YOUR_TOKEN_HERE';

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const getTrendingMovies = () =>
  axios.get(`${BASE_URL}/trending/movie/day`, options);

export const searchMovies = query =>
  axios.get(`${BASE_URL}/search/movie`, {
    ...options,
    params: { query },
  });

export const getMovieDetails = id =>
  axios.get(`${BASE_URL}/movie/${id}`, options);

export const getMovieCast = id =>
  axios.get(`${BASE_URL}/movie/${id}/credits`, options);

export const getMovieReviews = id =>
  axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
