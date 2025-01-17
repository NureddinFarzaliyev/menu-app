import express from 'express';
import 'dotenv/config';
import connectDB from './db/connect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import routes
import authRoutes from './routes/auth.routes.js';
import menuRoutes from './routes/menus.routes.js';
import contentRoutes from './routes/content.routes.js';

// Import Middleware
import { requireAuth, checkUser } from './middlewares/authMiddleware.js';

// Port
const port = process.env.PORT || 3000

// App
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));

// Routes

// Injects userId to req object if token is valid
app.get('*', checkUser)
app.post('*', checkUser)
app.delete('*', checkUser)
app.put('*', checkUser)

// Authentication Routes
app.use('/auth', authRoutes)

// Routes which require authentication
app.use('/menus', requireAuth, menuRoutes)
app.use('/content', requireAuth, contentRoutes)
app.get('/', requireAuth, (req, res) => res.send('Hello World!' + req.userId))

// Routes which does not require authentication
app.get('/test', (req, res) => res.send('Hello World!'))

const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
};
  
startServer();