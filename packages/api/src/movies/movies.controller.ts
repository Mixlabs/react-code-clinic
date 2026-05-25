import { Request, Response } from 'express';
import { getAllMovies, updateFavoriteStatus, resetDatabase } from '@fakeflix/database';

const getMovies = (req: Request, res: Response): void => {
    const { search, isFavorite } = req.query;

    const movies = getAllMovies({
        search: typeof search === 'string' ? search : undefined,
        isFavorite: isFavorite === 'true' ? true : isFavorite === 'false' ? false : undefined,
    });

    res.json(movies);
};

const toggleFavorite = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const { isFavorite } = req.body as { isFavorite: boolean };

    const movie = updateFavoriteStatus(id, isFavorite);

    if (!movie) {
        res.status(404).json({ error: 'Movie not found' });
        return;
    }

    res.json(movie);
};

const resetMovies = (_req: Request, res: Response): void => {
    const movies = resetDatabase();
    res.json(movies);
};

export { getMovies, toggleFavorite, resetMovies };
