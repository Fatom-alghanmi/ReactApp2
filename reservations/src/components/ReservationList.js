import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function ReservationList() {
  const { user } = useAuth(); // Get current logged-in user
  const [reservations, setReservations] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    fetch("http://localhost/reactapp2/reservation_server/api/reservations.php", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error(err));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleBookedChange = async (reservationID, currentBooked) => {
    const newBooked = Number(!Number(currentBooked));
  
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/toggle-booked.php`,
        { reservationID, booked: newBooked },
        { withCredentials: true }
      );
      fetchReservations();
    } catch (err) {
      console.error(err);
      alert("Failed to toggle booked status.");
    }
  };

  const handleDelete = async (reservationID) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;
  
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/delete-reservation.php`,
        { id: reservationID },
        { withCredentials: true }
      );
      fetchReservations();
    } catch (error) {
      console.error(error);
      alert("Failed to delete reservation.");
    }
  };

  const handleEditStart = (res) => {
    setEditId(res.reservationID);
    setEditData({
      name: res.name,
      area: res.area,
      time_slot: res.time_slot,
      reservation_date: res.reservation_date,
      imageFile: null
    });
  };

  const handleEditSave = async (reservationID) => {
    try {
      const formData = new FormData();
      formData.append("reservationID", reservationID);
      formData.append("name", editData.name);
      formData.append("area", editData.area);
      formData.append("time_slot", editData.time_slot);
      formData.append("reservation_date", editData.reservation_date);
      if (editData.imageFile) {
        formData.append("image", editData.imageFile);
      }

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/update-reservation.php`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );

      setEditId(null);
      fetchReservations();
    } catch (err) {
      console.error(err);
      alert("Failed to update reservation.");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        padding: "20px"
      }}
    >
      {reservations.map((res) => (
        <div
          key={res.reservationID}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "#f8f9fa"
          }}
        >
          {editId === res.reservationID ? (
            <>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                placeholder="Name"
                style={{ width: "100%", marginBottom: "5px" }}
              />
              <input
                type="text"
                value={editData.area}
                onChange={(e) => setEditData({...editData, area: e.target.value})}
                placeholder="Area"
                style={{ width: "100%", marginBottom: "5px" }}
              />
              <input
                type="text"
                value={editData.time_slot}
                onChange={(e) => setEditData({...editData, time_slot: e.target.value})}
                placeholder="Time Slot"
                style={{ width: "100%", marginBottom: "5px" }}
              />
              <input
                type="date"
                value={editData.reservation_date}
                onChange={(e) => setEditData({...editData, reservation_date: e.target.value})}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <input
                type="file"
                onChange={(e) => setEditData({...editData, imageFile: e.target.files[0]})}
                style={{ marginBottom: "10px" }}
              />
              <button
                style={{ marginRight: "10px", backgroundColor: "green", color: "#fff", padding: "5px 10px" }}
                onClick={() => handleEditSave(res.reservationID)}
              >
                Save
              </button>
              <button
                style={{ backgroundColor: "gray", color: "#fff", padding: "5px 10px" }}
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3>{res.name} - {res.reservation_date}</h3>

              {expandedId === res.reservationID && (
                <>
                  <img
                    src={`http://localhost/reactapp2/reservation_server/api/uploads/${res.imageName || 'placeholder_100.jpg'}`}
                    alt="Conservation Area"
                    style={{ width: "150px", height: "100px", objectFit: "contain", borderRadius: "6px", marginBottom: "10px" }}
                  />
                  <p>Area: {res.area}</p>
                  <p>Time Slot: {res.time_slot}</p>
                  <label>
                    <input
                      type="checkbox"
                      checked={Number(res.booked)}
                      onChange={() => handleBookedChange(res.reservationID, res.booked)}
                    /> Booked
                  </label>
                  <br />
                </>
              )}

              <button
                style={{ backgroundColor: "#0d6efd", color: "white", padding: "8px 15px", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "5px", marginRight: "5px" }}
                onClick={() => toggleExpand(res.reservationID)}
              >
                {expandedId === res.reservationID ? "Read Less" : "Read More"}
              </button>

              {user?.role === "admin" && (
                <>
                  <button
                    style={{ backgroundColor: "orange", color: "white", padding: "8px 15px", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "5px", marginRight: "5px" }}
                    onClick={() => handleEditStart(res)}
                  >
                    Edit
                  </button>

                  <button
                    style={{ backgroundColor: "red", color: "white", padding: "8px 15px", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "5px" }}
                    onClick={() => handleDelete(res.reservationID)}
                  >
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReservationList;
