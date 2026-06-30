import { Routes, Route } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'
import Navigation from '../Navigation/Navigation'

const HomePage = lazy(() => import('../../../src/pages/HomePage/HomePage'))
const MoviesPage = lazy(() => import('../../../src/pages/MoviesPage/MoviesPage'))
const MovieDetailsPage = lazy(() => import('../../../src/pages/MovieDetailsPage/MovieDetailsPage'))
const NotFoundPage = lazy(() => import('../../../src/pages/NotFoundPage/NotFoundPage'))

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId/*' element={<MovieDetailsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
