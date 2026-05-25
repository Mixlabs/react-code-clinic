import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

describe('Header — cabecera principal de la aplicación', () => {
    it('debería mostrar el contador de favoritos con el número correcto cuando hay películas favoritas', () => {
        // Arrange
        const peliculas = [
            { id: 1, title: 'Sharknado', isFavorite: true },
            { id: 2, title: 'The Room', isFavorite: true },
            { id: 3, title: 'Birdemic', isFavorite: false },
        ];
        const totalFavoritos = peliculas.filter((p) => p.isFavorite).length;

        // Act
        const { getByTestId } = render(
            <Header
                temp=""
                onSearch={vi.fn()}
                flag={false}
                onFlagChange={vi.fn()}
                favoritesCount={totalFavoritos}
            />
        );

        // Assert
        expect(getByTestId('favorites-count')).toHaveTextContent('2');
    });

    it('debería activar la pestaña "Catálogo General" cuando flag es false', () => {
        // Arrange & Act
        const { getByText } = render(
            <Header
                temp=""
                onSearch={vi.fn()}
                flag={false}
                onFlagChange={vi.fn()}
                favoritesCount={0}
            />
        );

        // Assert
        expect(getByText('Catálogo General')).toHaveClass('active');
    });

    it('debería activar la pestaña "Mis Favoritos" cuando flag es true', () => {
        // Arrange & Act
        const { getByText } = render(
            <Header
                temp=""
                onSearch={vi.fn()}
                flag={true}
                onFlagChange={vi.fn()}
                favoritesCount={0}
            />
        );

        // Assert
        expect(getByText('Mis Favoritos')).toHaveClass('active');
    });
});
