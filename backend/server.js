import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import itemRouter from './routes/itemRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//MIDDLEWARE
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
    }     else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//DATABASE
connectDB();

//ROUTES
app.use('/api/user', userRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/items', itemRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter); // Temporary until order routes are created

app.get('/', (req, res) => {
    res.send('FarmLeaf Backend is running');
})

//ERROR HANDLER
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error'
    });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})