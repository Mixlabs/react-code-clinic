import Button from '../atoms/Button';
import SearchBar from '../../search/components/SearchBar';

const Header = ({ temp, onSearch, flag, onFlagChange, favoritesCount }: any) => (
    <header className="header">
        <div className="logo">
            <span className="fake">Fake</span>
            <span className="flix">Flix</span>
        </div>

        <SearchBar value={temp} onChange={onSearch} />

        <div className="tabs">
            <Button
                className={!flag ? 'tab active' : 'tab'}
                onClick={() => onFlagChange(false)}
            >
                Catálogo General
            </Button>
            <Button
                className={flag ? 'tab active' : 'tab'}
                onClick={() => onFlagChange(true)}
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
