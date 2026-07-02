import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/json',
  },
};

export const getTrendingMovies = async () =>
  await axios.get(`${BASE_URL}/trending/movie/day`, options);

export const searchMovies = async query =>
  await axios.get(`${BASE_URL}/search/movie`, {
    ...options,
    params: { query },
  });

export const getMovieDetails = async id =>
  await axios.get(`${BASE_URL}/movie/${id}`, options);

export const getMovieCast = async id =>
  axios.get(`${BASE_URL}/movie/${id}/credits`, options);

export const getMovieReviews = async id =>
  axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
