import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Movie } from '../../movies/hooks/useMovies';

const fetchFavorites = async (): Promise<Movie[]> => {
    const res = await fetch('/api/movies?isFavorite=true');
    if (!res.ok) throw new Error('Error al cargar los favoritos');
    return res.json();
};

const toggleFavoriteRequest = async ({ id, isFavorite }: { id: number; isFavorite: boolean }): Promise<void> => {
    const res = await fetch(`/api/movies/${id}/favorite`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite }),
    });
    if (!res.ok) throw new Error('Error al actualizar favorito');
};

const useFavorites = () => {
    const queryClient = useQueryClient();

    const { data: favorites = [], isLoading } = useQuery<Movie[]>({
        queryKey: ['favorites'],
        queryFn: fetchFavorites,
    });

    const { mutate: toggleFavorite } = useMutation({
        mutationFn: toggleFavoriteRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            queryClient.invalidateQueries({ queryKey: ['movies'] });
        },
    });

    return { favorites, toggleFavorite, isLoading };
};

export { useFavorites };
