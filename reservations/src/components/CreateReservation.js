import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateReservation() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !area || !reservationDate || !timeSlot) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("area", area);
      formData.append("reservation_date", reservationDate);
      formData.append("time_slot", timeSlot);
      if (imageFile) formData.append("imageName", imageFile);

      const response = await axios.post(
        "http://localhost/reactapp2/reservation_server/api/create-reservation.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response.data);
      navigate("/"); // go back to list
    } catch (err) {
      console.error(err);
      setError("Failed to create reservation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Reservation</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Area" value={area} onChange={e => setArea(e.target.value)} />
        <input type="date" value={reservationDate} onChange={e => setReservationDate(e.target.value)} />
        <select value={timeSlot} onChange={e => setTimeSlot(e.target.value)}>
          <option value="">Select Time Slot</option>
          <option value="9:00-12:00">9:00-12:00</option>
          <option value="12:00-3:00">12:00-3:00</option>
          <option value="3:00-6:00">3:00-6:00</option>
        </select>
        <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Reservation"}
        </button>
      </form>
    </div>
  );
}

export default CreateReservation;
