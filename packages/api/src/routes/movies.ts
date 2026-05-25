import { Router, Request, Response } from 'express';
import { db, Movie } from '@fakeflix/database';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
    const { isFavorite } = req.query;

    const movies: Movie[] = isFavorite === 'true'
        ? db.prepare('SELECT * FROM movies WHERE isFavorite = 1').all() as Movie[]
        : db.prepare('SELECT * FROM movies').all() as Movie[];

    res.json(movies);
});

router.patch('/:id/favorite', (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const movie = db.prepare('SELECT * FROM movies WHERE id = ?').get(id) as Movie | undefined;

    if (!movie) {
        res.status(404).json({ error: 'Movie not found' });
        return;
    }

    const newValue: number = movie.isFavorite === 1 ? 0 : 1;
    db.prepare('UPDATE movies SET isFavorite = ? WHERE id = ?').run(newValue, id);

    const updated = db.prepare('SELECT * FROM movies WHERE id = ?').get(id) as Movie;
    res.json(updated);
});

router.post('/reset', (_req: Request, res: Response): void => {
    db.prepare('UPDATE movies SET isFavorite = 0').run();
    const movies: Movie[] = db.prepare('SELECT * FROM movies').all() as Movie[];
    res.json(movies);
});

export { router as moviesRouter };
