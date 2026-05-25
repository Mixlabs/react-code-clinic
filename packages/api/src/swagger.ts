export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Fakeflix API',
        version: '1.0.0',
        description: 'REST API for the Fakeflix Masterclass project.',
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
                    id:         { type: 'integer', example: 1 },
                    title:      { type: 'string',  example: 'Inception' },
                    genre:      { type: 'string',  example: 'Sci-Fi' },
                    year:       { type: 'integer', example: 2010 },
                    isFavorite: { type: 'integer', enum: [0, 1], example: 0 },
                    thumbnail:  { type: 'string',  example: 'https://picsum.photos/seed/inception/300/450' },
                },
            },
        },
    },
    paths: {
        '/api/movies': {
            get: {
                summary: 'Get all movies',
                description: 'Returns all movies. Filter by favorite status using the `isFavorite` query param.',
                parameters: [
                    {
                        name: 'isFavorite',
                        in: 'query',
                        required: false,
                        schema: { type: 'boolean' },
                        description: 'When `true`, returns only favorited movies.',
                    },
                ],
                responses: {
                    '200': {
                        description: 'A list of movies.',
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
                summary: 'Reset all favorites',
                description: 'Sets `isFavorite` to `0` for every movie and returns the full updated list.',
                responses: {
                    '200': {
                        description: 'All favorites reset. Returns the full movie list.',
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
                summary: 'Toggle favorite status',
                description: 'Toggles the `isFavorite` field of the specified movie.',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
                        description: 'The movie ID.',
                    },
                ],
                responses: {
                    '200': {
                        description: 'The updated movie.',
                        content: {
                            'application/json': {
                                schema: { '$ref': '#/components/schemas/Movie' },
                            },
                        },
                    },
                    '404': {
                        description: 'Movie not found.',
                    },
                },
            },
        },
    },
};
