import MovieGrid from '../components/MovieGrid';

const CatalogPage = ({ data1, onToggle }: any) => (
    <MovieGrid data1={data1} onToggle={onToggle} />
);

export default CatalogPage;
