import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function EditReservation() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    area: "",
    reservation_date: "",
    time_slot: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/reservation.php?id=${id}`)
      .then(res => setForm(res.data))
      .catch(() => setError("Failed to load reservation"));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/update-reservation.php`, form);
      navigate("/");
    } catch {
      setError("Update failed");
    }
  };

  if (!user || user.role !== "admin") return <p>Unauthorized</p>;

  return (
    <div>
      <h2>Edit Reservation</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="area" value={form.area} onChange={handleChange} />
        <input type="date" name="reservation_date" value={form.reservation_date} onChange={handleChange} />
        <select name="time_slot" value={form.time_slot} onChange={handleChange}>
          <option value="9:00-12:00">9:00-12:00</option>
          <option value="12:00-3:00">12:00-3:00</option>
          <option value="3:00-6:00">3:00-6:00</option>
        </select>
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default EditReservation;
