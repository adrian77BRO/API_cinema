import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.router';
import movieRouter from './routes/movie.router';
import { db } from './config/database';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/movies', movieRouter);

const PORT = process.env.PORT || 8080;

db.getConnection()
    .then(() => {
        console.log('Connected to the database successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
    });