import mongoose from "mongoose";

export async function connect() {
  const MONGODB_URI = process.env.MONGO_URI;

  try {
    const db = await mongoose.connect(MONGODB_URI);
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("Unable to connect to the database");
  }
}

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGO_URI; // Ensure this is set correctly in your environment variables

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// let isConnected = false; // Track the connection status

// export const connect = async () => {
//   if (isConnected) {
//     return;
//   }

//   try {
//     // Establish a new connection
//     const db = await mongoose.connect(MONGODB_URI);
//   } catch (error: any) {
//     console.error("Error connecting to MongoDB:", error.message);
//     throw new Error("Unable to connect to the database");
//   }
// };
