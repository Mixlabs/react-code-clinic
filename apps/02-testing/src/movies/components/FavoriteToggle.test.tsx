import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FavoriteToggle from './FavoriteToggle';

describe('FavoriteToggle — componente de acción de favorito', () => {
    it('debería llamar a la función onToggle exactamente 1 vez cuando el usuario hace clic en el botón', () => {
        // Arrange
        const onToggleMock = vi.fn();

        // Act
        const { getByRole } = render(
            <FavoriteToggle isFavorite={false} onToggle={onToggleMock} />
        );
        fireEvent.click(getByRole('button'));

        // Assert
        expect(onToggleMock).toHaveBeenCalledTimes(1);
    });

    it('debería mostrar el corazón relleno cuando la película ya está marcada como favorita', () => {
        // Arrange
        const onToggleMock = vi.fn();

        // Act
        const { getByText } = render(
            <FavoriteToggle isFavorite={true} onToggle={onToggleMock} />
        );

        // Assert
        expect(getByText('❤️')).toBeInTheDocument();
    });

    it('debería mostrar el corazón vacío cuando la película no está en favoritos', () => {
        // Arrange
        const onToggleMock = vi.fn();

        // Act
        const { getByText } = render(
            <FavoriteToggle isFavorite={false} onToggle={onToggleMock} />
        );

        // Assert
        expect(getByText('🤍')).toBeInTheDocument();
    });
});
