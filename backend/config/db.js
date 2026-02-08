import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not set');
        }
        await mongoose.connect(mongoUri);
        console.log('DataBase connected');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
}