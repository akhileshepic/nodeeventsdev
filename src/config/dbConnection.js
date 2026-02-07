import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

export default dbConnection;
