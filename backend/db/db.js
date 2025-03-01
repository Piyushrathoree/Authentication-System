import mongoose from "mongoose";

function connectDB() {
    const URl = `${process.env.MONGO_URL}/${process.env.DB_NAME}`;
    console.log("Database connected........");
    return mongoose.connect(URl);
}

export default connectDB;
