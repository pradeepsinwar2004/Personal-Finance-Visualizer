import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");


// Properly cache the connection across hot reloads in development
let globalWithMongoose = global as typeof globalThis & { mongoose?: { conn: any, promise: any } };
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}
let cached = globalWithMongoose.mongoose;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
