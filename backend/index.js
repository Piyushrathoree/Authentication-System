import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
dotenv.config({
    path:'./config/.env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("mongoose connection failed ", err);
    });
