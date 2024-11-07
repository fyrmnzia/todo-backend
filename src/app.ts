import express from "express";
import dotenv from "dotenv";

import todoRoute from "./routes/todo.route";

dotenv.config();

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Todo backend API");
});

app.use(express.json());

app.use("/todos", todoRoute);

export default app;
