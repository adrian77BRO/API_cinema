import { db } from '../config/database';
import { Movie } from '../models/movie';

export const getAllMoviesService = async (id_user: number): Promise<Movie[]> => {
    const query = 'SELECT * FROM movies WHERE created_by = ? ORDER BY created_at DESC';
    const [rows] = await db.query(query, [id_user]);
    return rows as Movie[];
};

export const getMovieByIdService = async (id: number, id_user: number): Promise<Movie | null> => {
    const query = 'SELECT * FROM movies WHERE id_movie = ? AND created_by = ?';
    const [rows] = await db.query(query, [id, id_user]);
    const movies = rows as Movie[];
    return movies.length ? movies[0] : null;
};

export const getMoviesByTitleService = async (title: string, id_user: number): Promise<Movie[]> => {
    const query = `
        SELECT * FROM movies WHERE title LIKE '%${title}%' AND created_by = ? ORDER BY created_at DESC
    `;
    const [rows] = await db.query(query, [id_user]);
    return rows as Movie[];
};

export const createMovieService = async (movie: Omit<Movie, 'id'>, id_user: number): Promise<void> => {
    const query = `
        INSERT INTO movies (title, year, category, stars,
        created_at, created_by) VALUES (?, ?, ?, ?, now(), ${id_user})
    `;
    await db.query(query, [movie.title, movie.year, movie.category, movie.stars]);
};