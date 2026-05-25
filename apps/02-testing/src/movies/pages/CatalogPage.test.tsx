import { render, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../../App';

const peliculasFalsas = [
    {
        id: 1,
        title: 'Sharknado',
        description: 'Tiburones en un tornado',
        imageUrl: 'https://example.com/sharknado.jpg',
        year: 2013,
        rating: 3.3,
        isFavorite: false,
    },
    {
        id: 2,
        title: 'The Room',
        description: 'Oh hi Mark',
        imageUrl: 'https://example.com/the-room.jpg',
        year: 2003,
        rating: 3.6,
        isFavorite: false,
    },
];

describe('CatalogPage — página de catálogo general de películas', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('Test A (Carga inicial): debería renderizar exactamente 2 tarjetas cuando la API devuelve 2 películas', async () => {
        // Arrange
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
            json: async () => peliculasFalsas,
        });

        // Act
        const { getAllByRole } = render(<App />);

        // Assert
        await waitFor(() => {
            const imagenes = getAllByRole('img');
            expect(imagenes).toHaveLength(2);
        });
    });

    it('Test B (Buscador): debería llamar a fetch con el parámetro ?search=Shark cuando el usuario escribe "Shark"', async () => {
        // Arrange
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
            json: async () => [],
        });

        const { getByPlaceholderText } = render(<App />);
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        // Act
        fireEvent.change(getByPlaceholderText('Buscar película...'), {
            target: { value: 'Shark' },
        });

        // Assert
        await waitFor(() => {
            const llamadas = (global.fetch as ReturnType<typeof vi.fn>).mock.calls;
            const llamadaConBusqueda = llamadas.find(([url]) =>
                (url as string).includes('search=Shark')
            );
            expect(llamadaConBusqueda).toBeDefined();
        });
    });
});
