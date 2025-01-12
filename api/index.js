import express from 'express';
import 'dotenv/config';
import { connectDB } from './db/connect.js';

// Import routes
import authRoutes from './routes/auth.routes.js';

// Port
const port = process.env.PORT || 3000

// App
const app = express()
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/auth', authRoutes)

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening at http://localhost:${port}`)
})