import express from "express";
import todoControllers from "./../controllers/todoControllers.js";

const router = express.Router();

// GET all todos of LoggedIn users
// Create A Todo
router
  .route("/")
  .get(todoControllers.getAllTodos)
  .post(todoControllers.createTodo);

// Update A Todo // Delete A Todo
router
  .route("/:id")
  .put(todoControllers.updateTodo)
  .delete(todoControllers.deleteTodo);

export default router;
