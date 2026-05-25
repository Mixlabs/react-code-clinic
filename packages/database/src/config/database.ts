import Database from 'better-sqlite3';

export const db = new Database(':memory:');

db.exec(`
    CREATE TABLE IF NOT EXISTS movies (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT    NOT NULL,
        description TEXT    NOT NULL,
        imageUrl    TEXT    NOT NULL,
        isFavorite  INTEGER NOT NULL DEFAULT 0
    )
`);
