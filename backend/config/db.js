import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
   const { MONGODB_URI } = process.env;

   if (!MONGODB_URI) {
      throw new Error('Missing MONGODB_URI in environment variables');
   }

   try {
      await connect(MONGODB_URI);
      console.log('MongoDB connected');
   } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
   }
};

export default connectDB;