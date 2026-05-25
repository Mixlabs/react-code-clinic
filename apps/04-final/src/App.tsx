import { useState } from 'react';
import './App.css';
import { useMovies } from './movies/hooks/useMovies';
import { useFavorites } from './favorites/hooks/useFavorites';
import { useDebounce } from './ui-core/hooks/useDebounce';
import MainLayoutTemplate from './ui-core/templates/MainLayoutTemplate';
import Header from './ui-core/organisms/Header';
import CatalogPage from './movies/pages/CatalogPage';
import FavoritesPage from './favorites/pages/FavoritesPage';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFavorites, setShowFavorites] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 500);
    const { movies, isLoading: isLoadingMovies } = useMovies(debouncedSearch);
    const { favorites, toggleFavorite, isLoading: isLoadingFavorites } = useFavorites();
    const isLoading = isLoadingMovies || isLoadingFavorites;

    return (
        <MainLayoutTemplate
            header={
                <Header
                    searchTerm={searchTerm}
                    onSearch={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    showFavorites={showFavorites}
                    onTabChange={setShowFavorites}
                    favoritesCount={favorites.length}
                />
            }
        >
            {isLoading && <div className="loading">Cargando...</div>}
            {!showFavorites
                ? <CatalogPage movies={movies} onToggle={toggleFavorite} />
                : <FavoritesPage favorites={favorites} onToggle={toggleFavorite} />
            }
        </MainLayoutTemplate>
    );
};

export default App;
