// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env.local' });

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Mongo URL is not provided');
}

let cachedClient = null;

const connectDB = async () => {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    cachedClient = await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected via Mongoose');
    return cachedClient;
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;