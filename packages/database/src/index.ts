import { seedMovies } from './movies/movie.seeder';

export type { Movie, GetAllMoviesParams } from './movies/movie.types';
export { getAllMovies, updateFavoriteStatus, resetDatabase } from './movies/movie.repository';

seedMovies();
