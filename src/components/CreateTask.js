import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/CreateTask.css";
const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    category: "",
  });

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", task);

      // ✅ Alert message
      alert("✅ Task created successfully!");

      // ✅ Clear form
      setTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        category: "",
      });

      // ✅ Navigate
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Failed to create task");
      console.error(error);
    }
  };

   



  return (
    <div className="task-page">
      <div className="task-card">
        <h2>Create New Task 🚀</h2>
        <p className="subtitle">Plan it. Track it. Complete it.</p>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />

          <textarea
            placeholder="Task Description"
            value={task.description}
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
          />

          <div className="row">
            <input
              type="date"
              value={task.dueDate}
              onChange={(e) =>
                setTask({ ...task, dueDate: e.target.value })
              }
            />

            <select
              value={task.priority}
              onChange={(e) =>
                setTask({ ...task, priority: e.target.value })
              }
            >
              <option value="">Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Category (Work / Personal)"
            value={task.category}
            onChange={(e) =>
              setTask({ ...task, category: e.target.value })
            }
          />

          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
