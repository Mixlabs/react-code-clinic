export interface Movie {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    isFavorite: number;
}

export interface GetAllMoviesParams {
    search?: string;
    isFavorite?: boolean;
}
