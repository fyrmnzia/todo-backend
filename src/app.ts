import express from "express";
import dotenv from "dotenv";

import todoRoute from "./routes/todo.route";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/todos", todoRoute);

export default app;
