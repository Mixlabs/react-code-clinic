import FavoriteToggle from './FavoriteToggle';

const MovieCard = ({ item, onToggle }: any) => (
    <div className="card">
        <img src={item.imageUrl} alt={item.title} />
        <div className="card-info">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <FavoriteToggle
                isFavorite={item.isFavorite}
                onToggle={() => onToggle(item.id)}
            />
        </div>
    </div>
);

export default MovieCard;
