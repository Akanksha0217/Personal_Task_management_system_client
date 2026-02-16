// src/pages/TaskList.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../styles/TaskList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

  // const [loading, setLoading] = useState(false);
  // const [setLoading] = useState(false);
  const [loading, setLoading] = useState(false);



  // 🔹 Edit state
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          category: categoryFilter || undefined,
          status: statusFilter || undefined,
        },
      });
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  }, [categoryFilter, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 🗑 Delete task
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ✏️ Start edit
  const startEdit = (task) => {
    setEditId(task._id);
    setEditData(task);
  };

  // 💾 Save edit
  const saveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/tasks/edittask/${id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setEditId(null);
      alert("✅ Task updated successfully");
    } catch (error) {
      alert("❌ Failed to update task");
      console.error(error);
    }
  };

  // 🔄 Update status
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
  if (!task.dueDate) return true;

  const due = new Date(task.dueDate);
  const from = startDate ? new Date(startDate) : null;
  const to = endDate ? new Date(endDate) : null;

  if (from && due < from) return false;
  if (to && due > to) return false;  

  return true;
});
  return (
    
    <div className="task-list-container">
      <h1>My Tasks</h1>
      {loading && <p>Loading tasks...</p>}
      {/* Filters */} <div className="filters"> <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} > <option value="">All Categories</option> <option value="Work">Work</option> <option value="Personal">Personal</option> <option value="Urgent">Urgent</option> </select> <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} > <option value="">All Status</option> <option value="Pending">Pending</option> <option value="In Progress">In Progress</option> <option value="Completed">Completed</option> </select> 
        {/* Due Date From */}
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  />

  {/* Due Date To */}
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (

            <tr key={task._id}>
              <td>
                {editId === task._id ? (
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                ) : (
                  task.title
                )}
              </td>

              <td>
                {editId === task._id ? (
                  <input
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  task.description
                )}
              </td>

              <td>
                {editId === task._id ? (
                  <input
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                  />
                ) : (
                  task.category
                )}
              </td>

              <td>
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>

              <td>
  {task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : "No Due Date"}
</td>
                <td>
  <span className={`priority-badge ${task.priority?.toLowerCase()}`}>
    {task.priority}
  </span>
</td>

              <td>
                {editId === task._id ? (
                  <>
                    <button onClick={() => saveEdit(task._id)}>
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button onClick={() => setEditId(null)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </>
                ) : (
                  <button onClick={() => startEdit(task)}>
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                )}
              </td>

              <td>
                <button onClick={() => deleteTask(task._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
