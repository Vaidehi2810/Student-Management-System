const db = require("../config/db");

const getAllTasks = (callback) => {
  const sql = "SELECT * FROM tasks ORDER BY id DESC";

  db.query(sql, callback);
};

const getTaskById = (id, callback) => {
  const sql = "SELECT * FROM tasks WHERE id = ?";

  db.query(sql, [id], callback);
};

const createTask = (task, callback) => {
  const sql = `
        INSERT INTO tasks
        (title, description, priority, due_date, status, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  const values = [
    task.title,
    task.description,
    task.priority,
    task.due_date,
    task.status,
    task.user_id,
  ];

  db.query(sql, values, callback);
};

const updateTask = (id, task, callback) => {
  const sql = `
        UPDATE tasks
        SET title = ?,
            description = ?,
            priority = ?,
            due_date = ?,
            status = ?
        WHERE id = ?
    `;

  const values = [
    task.title,
    task.description,
    task.priority,
    task.due_date,
    task.status,
    id,
  ];

  db.query(sql, values, callback);
};

const deleteTask = (id, callback) => {
  const sql = "DELETE FROM tasks WHERE id = ?";

  db.query(sql, [id], callback);
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
