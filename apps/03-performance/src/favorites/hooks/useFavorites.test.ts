import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useFavorites } from './useFavorites';

const crearWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: React.ReactNode }) =>
        createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFavorites — hook de gestión de favoritos', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('debería devolver la lista de favoritos cuando la API responde correctamente', async () => {
        // Arrange
        const peliculaFavorita = { id: 1, title: 'Sharknado', isFavorite: true };
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
            ok: true,
            json: async () => [peliculaFavorita],
        });

        // Act
        const { result } = renderHook(() => useFavorites(), { wrapper: crearWrapper() });

        // Assert
        await waitFor(() => {
            expect(result.current.favorites).toHaveLength(1);
            expect(result.current.favorites[0].title).toBe('Sharknado');
        });
    });

    it('debería llamar al endpoint PATCH cuando se invoca toggleFavorite', async () => {
        // Arrange
        (global.fetch as ReturnType<typeof vi.fn>)
            .mockResolvedValueOnce({ ok: true, json: async () => [] })       // GET favoritos inicial
            .mockResolvedValueOnce({ ok: true, json: async () => ({}) })     // PATCH toggle
            .mockResolvedValue({ ok: true, json: async () => [] });          // GET re-fetch tras invalidación

        const { result } = renderHook(() => useFavorites(), { wrapper: crearWrapper() });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        // Act
        await act(async () => {
            result.current.toggleFavorite({ id: 1, isFavorite: true });
        });

        // Assert
        const llamadas = (global.fetch as ReturnType<typeof vi.fn>).mock.calls;
        const llamadaPatch = llamadas.find(([url]) => (url as string).includes('/favorite'));
        expect(llamadaPatch).toBeDefined();
        expect(llamadaPatch![1].method).toBe('PATCH');
    });
});
