import API from "../services/api";
import "../styles/TaskCard.css"
const TaskCard = ({ task, refresh }) => {
  const updateStatus = async () => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    refresh();
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    refresh();
  };

  return (
    <div className="card mb-3 shadow">
      <div className="card-body">
        <h5>{task.title}</h5>
        <p>{task.description}</p>
        <span className="badge bg-warning me-2">{task.priority}</span>
        <span className="badge bg-info">{task.category}</span>
        <div className="mt-2">
          <button className="btn btn-success btn-sm me-2" onClick={updateStatus}>
            {task.status}
          </button>
          <button className="btn btn-danger btn-sm" onClick={deleteTask}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
