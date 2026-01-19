import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import eventRouter from './routes/events.js';
import bookingRouter from './routes/bookings.js';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);
app.use('/api/bookings', bookingRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});