import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { moviesRouter } from './movies/movies.routes';
import { swaggerDocument } from './docs/swagger';

const PORT: number = 3000;

const app = express();

app.disable('x-powered-by');
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/movies', moviesRouter);

app.listen(PORT, () => {
    console.log(`Fakeflix API running at http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/docs`);
});
