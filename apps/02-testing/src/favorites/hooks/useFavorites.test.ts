import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFavorites } from './useFavorites';

describe('useFavorites — hook de gestión de favoritos', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('debería marcar una película como favorita y actualizar la lista cuando se llama a toggleFavorite', async () => {
        // Arrange
        const peliculaInicial = { id: 1, title: 'Sharknado', isFavorite: false };
        const peliculaActualizada = { id: 1, title: 'Sharknado', isFavorite: true };
        const setData1Mock = vi.fn();

        (global.fetch as ReturnType<typeof vi.fn>)
            .mockResolvedValueOnce({ ok: true, json: async () => ({}) })       // PATCH /favorite
            .mockResolvedValueOnce({                                            // GET /movies re-fetch
                json: async () => [peliculaActualizada],
            });

        const { result } = renderHook(() =>
            useFavorites([peliculaInicial], setData1Mock, '')
        );

        // Act
        await act(async () => {
            result.current.x1(1);
        });

        // Assert
        expect(setData1Mock).toHaveBeenCalledWith([peliculaActualizada]);
    });

    it('debería enviar isFavorite: true en el cuerpo del PATCH cuando la película no era favorita', async () => {
        // Arrange
        const pelicula = { id: 2, title: 'The Room', isFavorite: false };
        const setData1Mock = vi.fn();

        (global.fetch as ReturnType<typeof vi.fn>)
            .mockResolvedValueOnce({ ok: true, json: async () => ({}) })
            .mockResolvedValueOnce({ json: async () => [] });

        const { result } = renderHook(() =>
            useFavorites([pelicula], setData1Mock, '')
        );

        // Act
        await act(async () => {
            result.current.x1(2);
        });

        // Assert
        const [_url, options] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
        expect(JSON.parse(options.body)).toEqual({ isFavorite: true });
    });
});
