import MovieGrid from '../components/MovieGrid';
import type { Movie } from '../hooks/useMovies';

interface CatalogPageProps {
    movies: Movie[];
    onToggle: (params: { id: number; isFavorite: boolean }) => void;
}

const CatalogPage = ({ movies, onToggle }: CatalogPageProps) => (
    <MovieGrid movies={movies} onToggle={onToggle} />
);

export default CatalogPage;
