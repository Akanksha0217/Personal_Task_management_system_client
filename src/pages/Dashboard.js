import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Dashboard.css";
import CreateTask from "../components/CreateTask";
import TaskList from "../components/TaskList";
import TaskCard from "../components/TaskCard";
import TaskAnalytics from "../components/TaskAnalytics";
import WeeklyCompletionChart from "../components/WeeklyCompletionChart";


const Dashboard = () => {
  const name = localStorage.getItem("name");
  const [mode, setMode] = useState("default"); // "default" | "create" | "list"
  const [tasks, setTasks] = useState([]);
  const totalTasks = tasks.length;
const completedTasks = tasks.filter(t => t.status === "Completed").length;
const pendingTasks = tasks.filter(t => t.status !== "Completed").length;

   const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

    useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Conditional Rendering */}
      {mode === "default" && (
        <>
          {/* HERO / WELCOME SECTION */}
          <div className="dashboard-hero">
            <h1 className="fade-in">
              Welcome back, <span>{name || "User"}</span> 👋
            </h1>
            <p className="slide-up">
              Manage your tasks smartly, stay focused, and boost productivity with
              <strong> TaskFlow</strong>.
            </p>

            <button
              className="hero-add-btn"
              onClick={() => setMode("create")}
            >
              + Create Your First Task
            </button>

            <button
              className="hero-add-btn"
              onClick={() => setMode("list")}
            >
              View Task List
            </button>
          </div>
           {/* SUMMARY SECTION */}
<div className="summary-section">
  <div className="summary-card total">
    <h2>{totalTasks}</h2>
    <p>Total Tasks</p>
  </div>

  <div className="summary-card completed">
    <h2>{completedTasks}</h2>
    <p>Completed</p>
  </div>

  <div className="summary-card pending">
    <h2>{pendingTasks}</h2>
    <p>Pending</p>
  </div>
</div>

        <TaskAnalytics tasks={tasks} />
        <WeeklyCompletionChart tasks={tasks} />


          {/* BENEFITS */}
           <div>
        

      <h3 style={{textAlign:"center"}}>My Tasks</h3>
             <div className=" task_con mt-4">    
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} refresh={fetchTasks} />
      ))}
    </div>
          </div>
        </>
      )}

      {mode === "create" && (
        <div>
          <button className="back-btn" onClick={() => setMode("default")}>
            🔙 Back to Dashboard
          </button>
          <CreateTask />
        </div>
      )}

      {mode === "list" && (
        <div>
          <button className="back-btn" onClick={() => setMode("default")}>
            🔙 Back to Dashboard
          </button>
          <TaskList />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
