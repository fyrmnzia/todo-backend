import express from "express";
import dotenv from "dotenv";

import todoRoutes from "./routes/todo.route";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("working");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
