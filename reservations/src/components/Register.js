import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/register.php`,
        {
          userName: username,      // <-- matches PHP
          password,
          emailAddress: email,     // <-- matches PHP
          role,
          adminSecret,
        },
        { withCredentials: true }
      );
      
      if (res.data.success) {
        setSuccess(res.data.message);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="guest">Guest</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {role === "admin" && (
          <div className="mb-3">
            <label>Admin Secret</label>
            <input
              type="password"
              className="form-control"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
