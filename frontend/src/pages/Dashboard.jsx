import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      alert("Unauthorized. Please login again.");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const addTask = async () => {
    if (!title) return;

    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
  <div className="container">
    <h2>Dashboard</h2>

    <button className="logout-btn" onClick={logout}>
      Logout
    </button>

    <input
      placeholder="New Task"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <button onClick={addTask}>Add Task</button>

    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <span>{task.title}</span>
          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);

}

export default Dashboard;
