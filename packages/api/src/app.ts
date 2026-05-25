import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { moviesRouter } from './routes/movies';
import { swaggerDocument } from './swagger';

const createApp = (): Express => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/api/movies', moviesRouter);

    return app;
};

export { createApp };
