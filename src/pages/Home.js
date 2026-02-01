import { Link } from "react-router-dom";
import "../styles/Home.css";
import { FaTasks, FaLock, FaChartLine, FaUserCheck } from "react-icons/fa";

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content text-center">
            <h1 className="hero-title">TaskFlow</h1>
            <p className="hero-subtitle">
              Simplify your tasks. Organize your life. Boost productivity.
            </p>

            <div className="hero-buttons">
              <Link to="/login" className="btn btn-success btn-lg me-3 login">
                Login
              </Link>
              <Link to="/register" className="btn btn-warning btn-outline-light btn-lg">
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>
      

      {/* IMPORTANCE SECTION */}
      <h2 className="section-title1" style={{textAlign:"center", padding:"30px"}}>Why TaskFlow?</h2>
      <section className="importance-section container">
        <h2 className="section-title" style={{color:"white"}}>Why TaskFlow?</h2>

        <div className="row">
          <div className="col-md-4">
            <div className="info-card">
              <FaTasks className="icon" />
              <h5>Task Organization</h5>
              <p>
                Manage all your daily tasks in one place with priorities and deadlines.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-card">
              <FaChartLine className="icon" />
              <h5>Productivity Boost</h5>
              <p>
                Track progress clearly and stay focused on what truly matters.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-card">
              <FaLock className="icon" />
              <h5>Secure System</h5>
              <p>
                Your data is protected with JWT-based authentication.
              </p>
            </div>
          </div>
              <div className="col-md-4 ">
      <div className="info-card w-100">
        <FaUserCheck className="icon" />
        <h5>User Friendly</h5>
        <p>
          Simple and intuitive interface designed for smooth task management.
        </p>
      </div>
    </div>
  


        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2 className="section-title text-center">Core Features</h2>

        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="feature-card">
                <FaUserCheck className="icon" />
                <p>User Authentication</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card">
                <FaTasks className="icon" />
                <p>Task CRUD Operations</p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="feature-card">
                <FaChartLine className="icon" />
                <p>Status Tracking</p>
              </div>
            </div>

            {/* <div className="col-md-3">
              <div className="feature-card">
                <FaLock className="icon" />
                <p>JWT Security</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          Created by <strong>Akanksha Baykar</strong>
        </p>
        <p className="footer-sub">
          MERN Stack | Task Management System
        </p>
      </footer>
    </>
  );
};

export default Home;
