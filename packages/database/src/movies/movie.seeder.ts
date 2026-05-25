import { db } from '../config/database';
import type { Movie } from './movie.types';

type MovieSeed = Omit<Movie, 'id'>;

const INITIAL_MOVIES: MovieSeed[] = [
    {
        title: 'Sharknado',
        description: 'Un tornado descontrolado arrasa Los Ángeles lanzando tiburones por los aires. Un surfero deberá salvar a su familia armado únicamente con una motosierra.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/93/Sharknado_poster.jpg',
        isFavorite: 0,
    },
    {
        title: 'The VelociPastor',
        description: 'Tras perder a sus padres, un sacerdote viaja a China y adquiere misteriosamente la capacidad de transformarse en dinosaurio. Decide usar este don para combatir el crimen.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0c/The_VelociPastor.jpg',
        isFavorite: 0,
    },
    {
        title: 'The Room',
        description: 'Un melodrama sobre Johnny, un hombre apasionado y generoso cuyo mundo se derrumba al descubrir que su prometida tiene una aventura con su mejor amigo.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e1/TheRoomMovie.jpg',
        isFavorite: 0,
    },
    {
        title: 'Birdemic: Shock and Terror',
        description: 'Una horda de águilas mutantes ataca un pequeño pueblo de California. Sus revolucionarios efectos visuales fueron creados con la versión de prueba de Adobe After Effects.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Birdemic.jpg',
        isFavorite: 0,
    },
    {
        title: 'Troll 2',
        description: 'Una familia de vacaciones descubre que el pueblo de Nilbog está habitado por goblins —no trolls— que planean convertirlos en plantas para comérselos.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Troll_2_poster.jpg',
        isFavorite: 0,
    },
    {
        title: 'Plan 9 from Outer Space',
        description: 'Unos alienígenas resucitan cadáveres humanos como zombis para evitar que la humanidad cree un arma capaz de destruir el universo. La obra cumbre indiscutible de Ed Wood.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Plan_9_Alternative_poster.jpg/330px-Plan_9_Alternative_poster.jpg',
        isFavorite: 0,
    },
    {
        title: 'Manos: The Hands of Fate',
        description: 'Una familia se pierde y termina en un motel remoto gestionado por el misterioso Torgo, quien cuida el lugar mientras el Maestro está ausente.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manos-the-hands-of-fate-poster.jpg/330px-Manos-the-hands-of-fate-poster.jpg',
        isFavorite: 0,
    },
    {
        title: 'Attack of the Killer Tomatoes',
        description: 'Un experimento gubernamental sale mal y tomates mutantes gigantes comienzan a aterrorizar a la población. Un documental sobre los peligros de los transgénicos.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5a/Attack_of_the_Killer_Tomatoes.jpg',
        isFavorite: 0,
    },
    {
        title: 'Santa Claus Conquers the Martians',
        description: 'Los marcianos secuestran a Papá Noel porque en Marte no hay nadie que lleve regalos a sus hijos. Una entrañable película navideña para toda la familia.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Santa_Claus_Conquers_the_Martians_1.jpg/330px-Santa_Claus_Conquers_the_Martians_1.jpg',
        isFavorite: 0,
    },
    {
        title: 'Miami Connection',
        description: 'Una banda de ninjas en moto intenta controlar el narcotráfico de Florida. Solo un grupo de universitarios de Tae Kwon Do con una banda de synth-rock puede detenerlos.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/96/MiamiConnectionPoster.jpg',
        isFavorite: 0,
    },
    {
        title: 'Dangerous Men',
        description: 'Tras el asesinato de su prometido, una joven emprende una venganza sangrienta contra los hombres. Un proyecto personal gestado durante 26 años, y se nota cada uno de ellos.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ef/Dangerous_Men_poster.jpg',
        isFavorite: 0,
    },
    {
        title: 'Fateful Findings',
        description: 'Un escritor redescubre sus poderes místicos de infancia y destapa secretos gubernamentales de enorme calado, todo ello manteniendo la mirada más intensa de la historia del cine.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/22/Fateful-findings-film-cover.JPG',
        isFavorite: 0,
    },
    {
        title: 'Samurai Cop',
        description: 'Un detective rebelde apodado el Samurai Cop recibe el encargo de desmantelar a la mortal Banda Katana, armado con su espada y el peinado más magnífico jamás filmado.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e9/SamuraiCop.jpg',
        isFavorite: 0,
    },
    {
        title: 'Birdemic 2: The Resurrection',
        description: 'Las águilas regresan más furiosas que nunca. Una secuela valiente que lleva al extremo todo lo que hizo del original un clásico atemporal del cine mundial.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Birdemic_2_-_The_Resurrection_%282013%29_poster.jpg',
        isFavorite: 0,
    },
    {
        title: 'Mac and Me',
        description: 'Un niño en silla de ruedas traba amistad con un alienígena fugado de la NASA. Incluye una secuencia musical dentro de un McDonald\'s que hay que ver para creer.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/87/Mac_and_me_movie_poster.jpg',
        isFavorite: 0,
    },
];

const seedMovies = (): void => {
    const insert = db.prepare(`
        INSERT INTO movies (title, description, imageUrl, isFavorite)
        VALUES (@title, @description, @imageUrl, @isFavorite)
    `);

    const insertAll = db.transaction((movies: MovieSeed[]) => {
        for (const movie of movies) {
            insert.run(movie);
        }
    });

    insertAll(INITIAL_MOVIES);
};

export { seedMovies };
