import MovieGrid from '../../movies/components/MovieGrid';
import type { Movie } from '../../movies/hooks/useMovies';

interface FavoritesPageProps {
    favorites: Movie[];
    onToggle: (params: { id: number; isFavorite: boolean }) => void;
}

const FavoritesPage = ({ favorites, onToggle }: FavoritesPageProps) => {
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
