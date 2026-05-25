import { db } from '../config/database';
import { seedMovies } from './movie.seeder';
import type { Movie, GetAllMoviesParams } from './movie.types';

const getAllMovies = (params: GetAllMoviesParams = {}): Movie[] => {
    const { search, isFavorite } = params;

    if (search && isFavorite !== undefined) {
        return db.prepare(`
            SELECT * FROM movies
            WHERE (title LIKE ? OR description LIKE ?) AND isFavorite = ?
        `).all(`%${search}%`, `%${search}%`, isFavorite ? 1 : 0) as Movie[];
    }

    if (search) {
        return db.prepare(`
            SELECT * FROM movies
            WHERE title LIKE ? OR description LIKE ?
        `).all(`%${search}%`, `%${search}%`) as Movie[];
    }

    if (isFavorite !== undefined) {
        return db.prepare('SELECT * FROM movies WHERE isFavorite = ?')
            .all(isFavorite ? 1 : 0) as Movie[];
    }

    return db.prepare('SELECT * FROM movies').all() as Movie[];
};

const updateFavoriteStatus = (id: number, isFavorite: boolean): Movie | undefined => {
    const result = db.prepare('UPDATE movies SET isFavorite = ? WHERE id = ?')
        .run(isFavorite ? 1 : 0, id);

    if (result.changes === 0) {
        return undefined;
    }

    return db.prepare('SELECT * FROM movies WHERE id = ?').get(id) as Movie;
};

const resetDatabase = (): Movie[] => {
    db.prepare('DELETE FROM movies').run();
    seedMovies();
    return getAllMovies();
};

export { getAllMovies, updateFavoriteStatus, resetDatabase };
