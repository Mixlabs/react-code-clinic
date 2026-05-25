import type { Movie } from '../hooks/useMovies';
import FavoriteToggle from './FavoriteToggle';

interface MovieCardProps {
    item: Movie;
    onToggle: (params: { id: number; isFavorite: boolean }) => void;
}

const MovieCard = ({ item, onToggle }: MovieCardProps) => (
    <div className="card">
        <img src={item.imageUrl} alt={item.title} />
        <div className="card-info">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <FavoriteToggle
                isFavorite={item.isFavorite}
                onToggle={() => onToggle({ id: item.id, isFavorite: !item.isFavorite })}
            />
        </div>
    </div>
);

export default MovieCard;
