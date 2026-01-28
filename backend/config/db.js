import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://piyumijayathilake779_db_user:farmleaf123@cluster0.dgmjvtk.mongodb.net/FarmLeaf')
        console.log('DataBase connected')
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
}