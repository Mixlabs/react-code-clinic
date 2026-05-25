import Icon from '../../ui-core/atoms/Icon';
import Input from '../../ui-core/atoms/Input';

const SearchBar = ({ value, onChange }: any) => (
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
