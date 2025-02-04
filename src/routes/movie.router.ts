import express from 'express';
import {
    getAllMoviesController,
    getMovieByIdController,
    getMoviesByTitleController,
    createMovieController
} from '../controllers/movie.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const movieRouter = express.Router();

movieRouter.get('/', authenticateJWT, getAllMoviesController);
movieRouter.get('/mov/:title', authenticateJWT, getMoviesByTitleController);
movieRouter.get('/:id', authenticateJWT, getMovieByIdController);
movieRouter.post('/', authenticateJWT, createMovieController);

export default movieRouter;