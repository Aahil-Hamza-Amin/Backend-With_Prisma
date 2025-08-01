import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./../db.js";

const register = (req, res) => {
  const { username, password } = req.body;
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  //   save the new user and password into db
  try {
    const insertUser = db.prepare(`INSERT INTO users(username, password)
        VALUES (?, ?)`);
    const result = insertUser.run(username, hashedPassword);
    // now that we have user, I want to add thier first todo for them
    const defaultTodo = `Hello :) Add your first todo`;
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
      VALUES (?, ?)`);
      insertTodo.run(result.lastInsertRowid, defaultTodo);
      // create a token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};
const login = (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);
    console.log(user);
    
    // if we cannot find user associated with that username, return out of Fn
    if (!user) {
      return res.status(404).send({ message: "User not Found" });
    }

    const passwordisValid = bcrypt.compareSync(password, user.password);
    // if we cannot find matched password  return out of Fn
    if (!passwordisValid) {
        return res.status(401).send({ message: "Inavlid password" });
    }
    console.log(user);
    // In case of successful authentication
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
};

export default { register, login };
