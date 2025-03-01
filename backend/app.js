import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

import router from "./routes/auth.route.js";
app.use("/api/v1", router);

export default app;