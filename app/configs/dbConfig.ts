// src/config/dbConfig.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connect to MongoDB (no need for useNewUrlParser or useUnifiedTopology in Mongoose v6+)
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/businessUserApp');
    console.log('MongoDB connected:', conn.connection.host);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
