import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getTasks, deleteTask, updateTask } from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const response = await getTasks();

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    await deleteTask(id);

    loadTasks();
  };

  const markCompleted = async (task) => {
    await updateTask(task.id, {
      ...task,
      status: "Completed",
    });

    loadTasks();
  };

  const completed = tasks.filter((task) => task.status === "Completed").length;

  const pending = tasks.filter((task) => task.status === "Pending").length;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Dashboard</h2>

        <Link to="/add-task" className="btn btn-primary">
          + Add Task
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Total Tasks</h5>

              <h2>{tasks.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Pending</h5>

              <h2>{pending}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Completed</h5>

              <h2>{completed}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">My Tasks</h4>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>

                  <th>Priority</th>

                  <th>Due Date</th>

                  <th>Status</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        {task.priority}
                      </span>
                    </td>

                    <td>{task.due_date}</td>

                    <td>
                      {task.status === "Completed" ? (
                        <span className="badge bg-success">Completed</span>
                      ) : (
                        <span className="badge bg-secondary">Pending</span>
                      )}
                    </td>

                    <td>
                      {task.status === "Pending" && (
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => markCompleted(task)}
                        >
                          Complete
                        </button>
                      )}

                      <Link
                        to={`/edit-task/${task.id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
