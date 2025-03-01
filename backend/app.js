import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

import router from "./routes/auth.route";
app.use("/api/v1", router);

export default app;