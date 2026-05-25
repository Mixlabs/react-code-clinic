import { createApp } from './app';

const PORT: number = Number(process.env.PORT) || 3000;

const app = createApp();

app.listen(PORT, () => {
    console.log(`Fakeflix API running at http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
