// how to build a authentication Sytem

import db from "./src/db";

// A) Register/Sign Up Create New User account
const register = (req, res) => {
  // 1) First grt the user Data from body
  const { username, password } = req.body;
  // 2) 2nd strore Data in Db Where first Create Hash_Password vserion not plain Password
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUSE (?,?)`
    );
    const newUser = insertUser.run(username, hashedPassword);
    // 3) Create A Task
    const defaultTodo = `Hello :) Add your new Todo`;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES (?, ?)`
    );
    const newTodo = insertTodo.run(newUser.lastInsertRowid, defaultTodo);
    // 4) CreateToken And Send Token
    const token = jwt.sign(
      { id: newUser.lastInsertRowid },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.status(201).json({ message: "Created new User" });
  } catch (error) {
    res.status(404).json({ message: "error" });
  }
};

// B) Login As User already given Data
const login = (req, res) => {
  // 1) First Get The Body data then based on that data just get the user
  const { username, password } = req.body;
  const getUser = db.prepare(`SELECT * FROM users WHERE id = ?`);
  const user = getUser.get(username);
  if (!user) {
    return res.status(404).json({ message: "username not Found" });
  }
  // 2) 2Nd Compare The user Provided Password vs Db Provided Password
  const passwordisValid = bcrypt.compareSync(password, user.password);
  if (!passwordisValid) {
    return res.status(404).json({ message: "Password is not correct" });
  }
  // 3) Create token And Send Back
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  res.status(201).json({ token });
};
