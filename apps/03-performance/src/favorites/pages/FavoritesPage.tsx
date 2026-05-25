import MovieGrid from '../../movies/components/MovieGrid';
import type { Movie } from '../../movies/hooks/useMovies';

const FavoritesPage = ({ favorites, onToggle }: { favorites: Movie[]; onToggle: any }) => {
    if (favorites.length === 0) {
        return (
            <div className="grid">
                <div className="empty">
                    <p>No tienes películas favoritas todavía.</p>
                </div>
            </div>
        );
    }

    return <MovieGrid movies={favorites} onToggle={onToggle} />;
};

export default FavoritesPage;
