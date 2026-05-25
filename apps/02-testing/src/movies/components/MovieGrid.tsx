import MovieCard from './MovieCard';

const MovieGrid = ({ data1, onToggle }: any) => (
    <div className="grid">
        {data1.map((item: any) => (
            <MovieCard key={item.id} item={item} onToggle={onToggle} />
        ))}
    </div>
);

export default MovieGrid;
