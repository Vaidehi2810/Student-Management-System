const Task = require("../models/taskModel");

exports.getTasks = (req, res) => {
  Task.getAllTasks((err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching tasks",
      });
    }

    res.json(results);
  });
};

exports.getTask = (req, res) => {
  const id = req.params.id;

  Task.getTaskById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching task",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(result[0]);
  });
};

exports.createTask = (req, res) => {
  const task = req.body;

  Task.createTask(task, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error creating task",
      });
    }

    res.status(201).json({
      message: "Task created successfully",
      id: result.insertId,
    });
  });
};

exports.updateTask = (req, res) => {
  const id = req.params.id;

  Task.updateTask(id, req.body, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error updating task",
      });
    }

    res.json({
      message: "Task updated successfully",
    });
  });
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;

  Task.deleteTask(id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting task",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  });
};
