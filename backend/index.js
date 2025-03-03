import app from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();






connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("mongoose connection failed ", err);
    });
