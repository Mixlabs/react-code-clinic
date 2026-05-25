import MovieCard from './MovieCard';
import type { Movie } from '../hooks/useMovies';

const MovieGrid = ({ movies, onToggle }: { movies: Movie[]; onToggle: any }) => (
    <div className="grid">
        {movies.map((item) => (
            <MovieCard key={item.id} item={item} onToggle={onToggle} />
        ))}
    </div>
);

export default MovieGrid;
