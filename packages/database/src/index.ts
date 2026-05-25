import Database from 'better-sqlite3';

export interface Movie {
    id: number;
    title: string;
    genre: string;
    year: number;
    isFavorite: number;
    thumbnail: string;
}

const INITIAL_MOVIES: Omit<Movie, 'id'>[] = [
    { title: 'Inception',                 genre: 'Sci-Fi', year: 2010, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/inception/300/450' },
    { title: 'The Dark Knight',           genre: 'Action', year: 2008, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/darkknight/300/450' },
    { title: 'Interstellar',              genre: 'Sci-Fi', year: 2014, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/interstellar/300/450' },
    { title: 'Pulp Fiction',              genre: 'Crime',  year: 1994, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/pulpfiction/300/450' },
    { title: 'The Godfather',             genre: 'Crime',  year: 1972, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/godfather/300/450' },
    { title: 'The Matrix',                genre: 'Sci-Fi', year: 1999, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/matrix/300/450' },
    { title: 'Forrest Gump',              genre: 'Drama',  year: 1994, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/forrestgump/300/450' },
    { title: 'Fight Club',                genre: 'Drama',  year: 1999, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/fightclub/300/450' },
    { title: 'Goodfellas',                genre: 'Crime',  year: 1990, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/goodfellas/300/450' },
    { title: 'The Shawshank Redemption',  genre: 'Drama',  year: 1994, isFavorite: 0, thumbnail: 'https://picsum.photos/seed/shawshank/300/450' },
];

export const db = new Database(':memory:');

const createTables = (): void => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS movies (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            title       TEXT    NOT NULL,
            genre       TEXT    NOT NULL,
            year        INTEGER NOT NULL,
            isFavorite  INTEGER NOT NULL DEFAULT 0,
            thumbnail   TEXT    NOT NULL
        )
    `);
};

export const seedDatabase = (): void => {
    const insert = db.prepare(`
        INSERT INTO movies (title, genre, year, isFavorite, thumbnail)
        VALUES (@title, @genre, @year, @isFavorite, @thumbnail)
    `);

    const insertMany = db.transaction((movies: Omit<Movie, 'id'>[]) => {
        for (const movie of movies) {
            insert.run(movie);
        }
    });

    insertMany(INITIAL_MOVIES);
};

createTables();
seedDatabase();
