import express from "express";
import Todo from "../models/Todo.js";
import { protect } from "../middleware/auth.js"; // Import the protect middleware

const router = express.Router();

// Get all todos for the logged-in user
router.get("/", protect, async (req, res) => {
  try {
    // Only find todos where the 'user' field matches the authenticated user's ID
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new todo for the logged-in user
router.post("/", protect, async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    user: req.user._id, // Assign the todo to the authenticated user
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo (text and/or completed)
router.patch("/:id", protect, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Ensure the todo belongs to the authenticated user
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this todo" });
    }

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete("/:id", protect, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Ensure the todo belongs to the authenticated user
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this todo" });
    }
    
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;