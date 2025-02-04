import { Request, Response } from 'express';
import {
    getAllMoviesService,
    getMovieByIdService,
    getMoviesByTitleService,
    createMovieService
} from '../services/movie.service';

export const getAllMoviesController = async (req: Request, res: Response) => {
    try {
        const id_user = (req as any).user.id;
        const movies = await getAllMoviesService(id_user);

        return res.status(200).json({
            status: 'success',
            message: 'Todas las películas',
            movies
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error getting the movies',
            error
        });
    }
};

export const getMovieByIdController = async (req: Request, res: Response) => {
    try {
        const id_user = (req as any).user.id;
        const movie = await getMovieByIdService(parseInt(req.params.id), id_user);

        if (movie) {
            return res.status(200).json({
                status: 'success',
                message: 'Película encontrada',
                movie
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: 'Película no encontrada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error searching movie',
            error
        });
    }
};

export const getMoviesByTitleController = async (req: Request, res: Response) => {
    try {
        const id_user = (req as any).user.id;
        const movies = await getMoviesByTitleService(req.params.title, id_user);

        return res.status(200).json({
            status: 'success',
            message: 'Películas encontradas',
            movies
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error searching movies',
            error
        });
    }
};

export const createMovieController = async (req: Request, res: Response) => {
    try {
        const id_user = (req as any).user.id;
        const newMovie = req.body;
        await createMovieService(newMovie, id_user);

        res.status(201).json({
            status: 'success',
            message: 'Película agregada',
            movie: newMovie
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error adding movie',
            error
        });
    }
};