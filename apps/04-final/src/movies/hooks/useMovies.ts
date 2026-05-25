import { useQuery } from '@tanstack/react-query';

interface Movie {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    year: number;
    rating: number;
    isFavorite: boolean;
}

const fetchMovies = async (searchTerm: string): Promise<Movie[]> => {
    const res = await fetch(`/api/movies?search=${encodeURIComponent(searchTerm)}`);
    if (!res.ok) throw new Error('Error al cargar las películas');
    return res.json();
};

const useMovies = (searchTerm: string) => {
    const { data: movies = [], isLoading, isError } = useQuery<Movie[]>({
        queryKey: ['movies', searchTerm],
        queryFn: () => fetchMovies(searchTerm),
    });

    return { movies, isLoading, isError };
};

export type { Movie };
export { useMovies };
