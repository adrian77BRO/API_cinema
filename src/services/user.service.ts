import bcrypt from 'bcryptjs';
import { db } from '../config/database';
import { User } from '../models/user';

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows as User[];
    return users.length ? users[0] : null;
};

export const registerUser = async (username: string, email: string, password: string): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );

    const user: User = {
        id_user: (result as any).insertId,
        username,
        email,
        password: hashedPassword
    };
    return user;
};