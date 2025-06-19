import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './src/Config/db.js';


dotenv.config({ path: './.env' });


// Middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../Client/public')));
app.use(cookieParser());


// Importing routers
import authRouter from '../Server/src/Routers/authRoutes.js';
import blogRouter from '../Server/src/Routers/blogRouters.js';
// Using routers
app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);


// connect to the database
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        });
        app.on('error', (err) => {
            console.error(`Error: ${err}`)
            throw err;
        })
    })
    .catch((err) => {
        console.error(`Database connected failed: ${err}`);
    });

