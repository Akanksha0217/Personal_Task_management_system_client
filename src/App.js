import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import CreateTask from "./pages/CreateTask";
// import TaskList from "./pages/TaskList"
// import Navbar from "./components/Navbar";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
     
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/create-task" element={<CreateTask />} /> */}
        {/* <Route path="/tasks" element={<TaskList />} /> */}
              {/* Protected Routes (WITH Navbar) */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
