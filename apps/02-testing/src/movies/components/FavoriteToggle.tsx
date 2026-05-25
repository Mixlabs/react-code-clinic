import Button from '../../ui-core/atoms/Button';
import Icon from '../../ui-core/atoms/Icon';

const FavoriteToggle = ({ isFavorite, onToggle }: any) => (
    <Button
        className={isFavorite ? 'heart active' : 'heart'}
        onClick={onToggle}
    >
        <Icon symbol={isFavorite ? '❤️' : '🤍'} />
    </Button>
);

export default FavoriteToggle;
