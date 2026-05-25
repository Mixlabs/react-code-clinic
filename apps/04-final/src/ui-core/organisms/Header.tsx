import { ChangeEvent } from 'react';
import Button from '../atoms/Button';
import SearchBar from '../../search/components/SearchBar';

interface HeaderProps {
    searchTerm: string;
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    showFavorites: boolean;
    onTabChange: (value: boolean) => void;
    favoritesCount: number;
}

const Header = ({ searchTerm, onSearch, showFavorites, onTabChange, favoritesCount }: HeaderProps) => (
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
                Mis Favoritos&nbsp;
                {favoritesCount > 0 && (
                    <span data-testid="favorites-count" className="badge">
                         ({favoritesCount})
                    </span>
                )}
            </Button>
        </div>
    </header>
);

export default Header;
