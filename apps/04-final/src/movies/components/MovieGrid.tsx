import MovieCard from './MovieCard';
import type { Movie } from '../hooks/useMovies';

interface MovieGridProps {
    movies: Movie[];
    onToggle: (params: { id: number; isFavorite: boolean }) => void;
}

const MovieGrid = ({ movies, onToggle }: MovieGridProps) => (
    <div className="grid">
        {movies.map((item) => (
            <MovieCard key={item.id} item={item} onToggle={onToggle} />
        ))}
    </div>
);

export default MovieGrid;
