import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
       // ✅ ADD HERE 👇
 
    localStorage.setItem("name", res.data.user.name);
      navigate("/dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">
          Login to manage your tasks efficiently
        </p>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {/* <p className="login-footer">
          Don’t have an account? <span>Register</span>
        </p> */}
          <p className="register-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
      </div>
    </div>
    
  );
};

export default Login;
