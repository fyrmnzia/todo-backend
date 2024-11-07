"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/todo.routes.ts
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const router = (0, express_1.Router)();
// Routes
router.post("/todo", todo_controller_1.createTodo);
router.get("/todos", todo_controller_1.getTodos);
router.get("/todo/:id", todo_controller_1.getTodoById);
router.put("/todo/:id", todo_controller_1.updateTodo);
router.delete("/todo/:id", todo_controller_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todo.route.js.map