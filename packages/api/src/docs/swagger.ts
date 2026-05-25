export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Fakeflix API',
        version: '1.0.0',
        description: 'REST API for the Fakeflix Masterclass. Manages a glorious collection of B-movies.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local development server',
        },
    ],
    components: {
        schemas: {
            Movie: {
                type: 'object',
                properties: {
                    id:          { type: 'integer',              example: 1 },
                    title:       { type: 'string',               example: 'Sharknado' },
                    description: { type: 'string',               example: 'A tornado full of sharks devastates Los Angeles.' },
                    imageUrl:    { type: 'string', format: 'uri', example: 'https://picsum.photos/seed/sharknado/300/450' },
                    isFavorite:  { type: 'integer', enum: [0, 1], example: 0 },
                },
            },
            ToggleFavoriteBody: {
                type: 'object',
                required: ['isFavorite'],
                properties: {
                    isFavorite: { type: 'boolean', example: true },
                },
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    error: { type: 'string', example: 'Movie not found' },
                },
            },
        },
    },
    paths: {
        '/api/movies': {
            get: {
                tags: ['Movies'],
                summary: 'Get all movies',
                description: 'Returns all movies. Supports optional filtering by text search and/or favorite status.',
                parameters: [
                    {
                        name: 'search',
                        in: 'query',
                        required: false,
                        schema: { type: 'string' },
                        description: 'Case-insensitive text search against title and description.',
                        example: 'shark',
                    },
                    {
                        name: 'isFavorite',
                        in: 'query',
                        required: false,
                        schema: { type: 'boolean' },
                        description: 'When `true`, returns only favorited movies. When `false`, returns only non-favorited.',
                    },
                ],
                responses: {
                    '200': {
                        description: 'A list of movies matching the given filters.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { '$ref': '#/components/schemas/Movie' },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/movies/reset': {
            post: {
                tags: ['Movies'],
                summary: 'Reset the database',
                description: 'Deletes all movies and re-seeds the database with the original B-movie collection. All favorite flags are cleared.',
                responses: {
                    '200': {
                        description: 'The full movie list after reset.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { '$ref': '#/components/schemas/Movie' },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/movies/{id}/favorite': {
            patch: {
                tags: ['Movies'],
                summary: 'Update favorite status',
                description: 'Explicitly sets the `isFavorite` field of a specific movie to the provided boolean value.',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
                        description: 'The ID of the movie to update.',
                        example: 1,
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { '$ref': '#/components/schemas/ToggleFavoriteBody' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'The movie with its updated favorite status.',
                        content: {
                            'application/json': {
                                schema: { '$ref': '#/components/schemas/Movie' },
                            },
                        },
                    },
                    '404': {
                        description: 'No movie was found with the given ID.',
                        content: {
                            'application/json': {
                                schema: { '$ref': '#/components/schemas/ErrorResponse' },
                            },
                        },
                    },
                },
            },
        },
    },
};
