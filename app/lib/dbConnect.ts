import mongoose from "mongoose";
require("./../models/product.model");
require("./../models/user.model");

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = mongoose.connections[0].readyState;

const dbConnect = async (): Promise<void> => {
  if (cached) {
    return;
  }

  await mongoose.connect(MONGODB_URI);
  cached = mongoose.connections[0].readyState;
};

export default dbConnect;
