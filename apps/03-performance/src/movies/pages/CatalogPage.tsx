import MovieGrid from '../components/MovieGrid';
import type { Movie } from '../hooks/useMovies';

const CatalogPage = ({ movies, onToggle }: { movies: Movie[]; onToggle: any }) => (
    <MovieGrid movies={movies} onToggle={onToggle} />
);

export default CatalogPage;
