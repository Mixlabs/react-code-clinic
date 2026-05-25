import { ChangeEvent } from 'react';
import Icon from '../../ui-core/atoms/Icon';
import Input from '../../ui-core/atoms/Input';

interface SearchBarProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
    <div className="search-bar">
        <Input
            className="search"
            value={value}
            onChange={onChange}
            placeholder="Buscar película..."
        />
        <Icon symbol="🔍" className="search-icon" />
    </div>
);

export default SearchBar;
