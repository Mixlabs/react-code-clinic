import MovieGrid from '../../movies/components/MovieGrid';

const FavoritesPage = ({ data1, onToggle }: any) => {
    const favorites = data1.filter((item: any) => item.isFavorite);

    if (favorites.length === 0) {
        return (
            <div className="grid">
                <div className="empty">
                    <p>No tienes películas favoritas todavía.</p>
                </div>
            </div>
        );
    }

    return <MovieGrid data1={favorites} onToggle={onToggle} />;
};

export default FavoritesPage;
