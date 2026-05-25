import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar — barra de búsqueda de películas', () => {
    it('debería mostrar el texto escrito por el usuario en el campo de entrada', () => {
        // Arrange
        const onChangeMock = vi.fn();

        // Act
        const { getByPlaceholderText } = render(
            <SearchBar value="Shark" onChange={onChangeMock} />
        );

        // Assert
        const input = getByPlaceholderText('Buscar película...');
        expect(input).toHaveValue('Shark');
    });

    it('debería llamar a onChange cuando el usuario escribe en el campo de búsqueda', () => {
        // Arrange
        let valorActual = '';
        const onChangeMock = vi.fn((e) => { valorActual = e.target.value; });

        // Act
        const { getByPlaceholderText } = render(
            <SearchBar value={valorActual} onChange={onChangeMock} />
        );
        fireEvent.change(getByPlaceholderText('Buscar película...'), {
            target: { value: 'Shark' },
        });

        // Assert
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(valorActual).toBe('Shark');
    });

    it('debería renderizar el icono de lupa junto al campo de texto', () => {
        // Arrange & Act
        const { getByText } = render(
            <SearchBar value="" onChange={vi.fn()} />
        );

        // Assert
        expect(getByText('🔍')).toBeInTheDocument();
    });
});
