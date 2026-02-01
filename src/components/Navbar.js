import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setUserName(localStorage.getItem("name"));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(); // ensures clean UI reset
  };

  return (
    <nav className="custom-navbar">
      {/* Brand */}
      <Link className="brand" to={token ? "/dashboard" : "/"}>
        Task<span>Flow</span>
      </Link>

      {/* Right side */}
      <div className="nav-actions">
        {token ? (
          <>
            <div className="user-info">
              <FaUserCircle />
              <span>{userName || "User"}</span>
            </div>

            <button className="logout-btn" onClick={logout}>
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-btn login" to="/login">
              Login
            </Link>
            <Link className="nav-btn register" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
