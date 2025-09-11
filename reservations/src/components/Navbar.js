import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // If still checking auth, show nothing (or a placeholder)
  if (loading) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 border-bottom shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Reservation App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-reservation">
                    Add Reservation
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reservation-list">
                    Reservation List
                  </Link>
                </li>
              </>
            )}
          </ul>

          {user ? (
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">
                Hello, <strong>{user.userName}</strong> ({user.role})
              </span>
              <button className="btn btn-outline-dark" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
