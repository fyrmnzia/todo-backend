"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodoById = exports.getTodos = exports.createTodo = void 0;
const db_1 = __importDefault(require("../config/db"));
// Create a new todo
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, userId, tagId } = req.body;
        if (!title || !content || !userId || !Array.isArray(tagId)) {
            res.status(400).json({ error: "Invalid input data" });
            return; // Explicitly end the function after sending a response
        }
        const todo = yield db_1.default.todo.create({
            data: {
                title,
                content,
                userId,
                todoTags: {
                    create: tagId.map((id) => ({
                        tag: { connect: { id } },
                    })),
                },
            },
        });
        res.status(201).json(todo); // No return keyword here
    }
    catch (error) {
        console.error("Error creating todo:", error);
        res
            .status(500)
            .json({ error: "An error occurred while creating the todo" });
    }
});
exports.createTodo = createTodo;
// Get all todos
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield db_1.default.todo.findMany({
            include: {
                user: true,
                todoTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        res.status(200).json(todos);
    }
    catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: "An error occurred while fetching todos" });
    }
});
exports.getTodos = getTodos;
// Get a single todo by ID
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todo = yield db_1.default.todo.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: true,
                todoTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });
        if (!todo) {
            res.status(404).json({ error: "Todo not found" });
            return;
        }
        res.status(200).json(todo);
    }
    catch (error) {
        console.error("Error fetching todo:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching the todo" });
    }
});
exports.getTodoById = getTodoById;
// Update a todo
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, tagId } = req.body;
    try {
        // Disconnect all current tags if any, then add new ones
        const updatedTodo = yield db_1.default.todo.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                todoTags: {
                    deleteMany: {}, // Remove all existing tags for the todo
                    create: tagId === null || tagId === void 0 ? void 0 : tagId.map((tagId) => ({
                        tag: { connect: { id: tagId } },
                    })),
                },
            },
            include: {
                todoTags: {
                    include: { tag: true },
                },
            },
        });
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        console.error("Error updating todo:", error);
        res
            .status(500)
            .json({ error: "An error occurred while updating the todo" });
    }
});
exports.updateTodo = updateTodo;
// Delete a todo
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.todo.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting todo:", error);
        res
            .status(500)
            .json({ error: "An error occurred while deleting the todo" });
    }
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.controller.js.map