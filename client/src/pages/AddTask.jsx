import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addTask } from "../services/api";

function AddTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
    status: "Pending",
    user_id: 1,
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTask(task);

      alert("Task added successfully!");

      navigate("/dashboard");
    } catch (error) {
      alert("Failed to add task");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="mb-4">Add New Task</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Task Title</label>

                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={task.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>

                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    value={task.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Priority</label>

                    <select
                      name="priority"
                      className="form-select"
                      value={task.priority}
                      onChange={handleChange}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Due Date</label>

                    <input
                      type="date"
                      name="due_date"
                      className="form-control"
                      value={task.due_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-4">
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
