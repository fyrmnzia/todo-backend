// src/routes/todo.routes.ts
import { Router } from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller";

const router = Router();

// Routes
router.post("/todo", createTodo);
router.get("/todos", getTodos);
router.get("/todo/:id", getTodoById);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

export default router;
