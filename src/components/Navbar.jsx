import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar mb-5">
      <Link to="/" className="navbar-brand">
        Blog Platform
      </Link>
      <div className="navbar-links">
        {token && (
          <Link to="/" className="navbar-link">
            Dashboard
          </Link>
        )}
        <Link to="/register" className="navbar-link">
          Register
        </Link>
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      </div>
      {token && (
        <button onClick={handleLogout} className="navbar-button">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
