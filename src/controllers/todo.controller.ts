import { Request, RequestHandler, Response } from "express";
import prisma from "../config/db";

// Create a new todo
export const createTodo: RequestHandler = async (req, res) => {
  try {
    const { title, content, userId, tagId } = req.body;

    if (!title || !content || !userId || !Array.isArray(tagId)) {
      res.status(400).json({ error: "Invalid input data" });
      return; // Explicitly end the function after sending a response
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        content,
        userId,
        todoTags: {
          create: tagId.map((id: number) => ({
            tag: { connect: { id } },
          })),
        },
      },
    });

    res.status(201).json(todo); // No return keyword here
  } catch (error) {
    console.error("Error creating todo:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the todo" });
  }
};

// Get all todos
export const getTodos: RequestHandler = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
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
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "An error occurred while fetching todos" });
  }
};

// Get a single todo by ID
export const getTodoById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
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
  } catch (error) {
    console.error("Error fetching todo:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the todo" });
  }
};

// Update a todo
export const updateTodo: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { title, content, tagId } = req.body;

  try {
    // Disconnect all current tags if any, then add new ones
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        todoTags: {
          deleteMany: {}, // Remove all existing tags for the todo
          create: tagId?.map((tagId: number) => ({
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
  } catch (error) {
    console.error("Error updating todo:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the todo" });
  }
};

// Delete a todo
export const deleteTodo: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the todo" });
  }
};
