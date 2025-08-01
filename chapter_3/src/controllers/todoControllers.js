import db from "./../db.js";

const getAllTodos = (req, res) => {
    try {
        const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
        const todos = getTodos.all(req.userID)
        res.status(200).json({todos})
        
    } catch (error) {
        
    }
}

const createTodo = (req, res) => {
const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
const newTodo = insertTodo.run()
}

const updateTodo = (req, res) => {

}

const deleteTodo = (req, res) => {}

export default {getAllTodos, createTodo, updateTodo, deleteTodo}