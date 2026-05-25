import Button from '../atoms/Button';
import SearchBar from '../../search/components/SearchBar';

const Header = ({ searchTerm, onSearch, showFavorites, onTabChange, favoritesCount }: any) => (
    <header className="header">
        <div className="logo">
            <span className="fake">Fake</span>
            <span className="flix">Flix</span>
        </div>

        <SearchBar value={searchTerm} onChange={onSearch} />

        <div className="tabs">
            <Button
                className={!showFavorites ? 'tab active' : 'tab'}
                onClick={() => onTabChange(false)}
            >
                Catálogo General
            </Button>
            <Button
                className={showFavorites ? 'tab active' : 'tab'}
                onClick={() => onTabChange(true)}
            >
                Mis Favoritos
                {favoritesCount > 0 && (
                    <span data-testid="favorites-count" className="badge">
                        {favoritesCount}
                    </span>
                )}
            </Button>
        </div>
    </header>
);

export default Header;
