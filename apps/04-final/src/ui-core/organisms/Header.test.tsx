import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';

describe('Header — cabecera principal de la aplicación', () => {
    it('debería mostrar el contador de favoritos con el número correcto cuando hay películas favoritas', () => {
        // Arrange
        const totalFavoritos = 2;

        // Act
        const { getByTestId } = render(
            <Header
                searchTerm=""
                onSearch={vi.fn()}
                showFavorites={true}
                onTabChange={vi.fn()}
                favoritesCount={totalFavoritos}
            />
        );

        // Assert
        expect(getByTestId('favorites-count')).toHaveTextContent('2');
    });

    it('debería activar la pestaña "Catálogo General" cuando showFavorites es false', () => {
        // Arrange & Act
        const { getAllByRole } = render(
            <Header
                searchTerm=""
                onSearch={vi.fn()}
                showFavorites={false}
                onTabChange={vi.fn()}
                favoritesCount={0}
            />
        );

        // Assert: primer botón = Catálogo General
        const [botonCatalogo] = getAllByRole('button');
        expect(botonCatalogo).toHaveClass('active');
    });

    it('debería activar la pestaña "Mis Favoritos" cuando showFavorites es true', () => {
        // Arrange & Act
        const { getAllByRole } = render(
            <Header
                searchTerm=""
                onSearch={vi.fn()}
                showFavorites={true}
                onTabChange={vi.fn()}
                favoritesCount={0}
            />
        );

        // Assert: segundo botón = Mis Favoritos
        const [, botonFavoritos] = getAllByRole('button');
        expect(botonFavoritos).toHaveClass('active');
    });
});
