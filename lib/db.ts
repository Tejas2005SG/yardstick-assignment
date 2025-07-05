import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://bhangaletejas003:ZHNH0HUZfL3q4ECO@cluster0.adjo8zd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'



if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect; 