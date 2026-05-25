import { Router } from 'express';
import { getMovies, toggleFavorite, resetMovies } from './movies.controller';

const moviesRouter = Router();

moviesRouter.get('/', getMovies);
moviesRouter.patch('/:id/favorite', toggleFavorite);
moviesRouter.post('/reset', resetMovies);

export { moviesRouter };
