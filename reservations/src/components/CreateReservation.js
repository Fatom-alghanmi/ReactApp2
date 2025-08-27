import React, { useState } from "react";

function CreateReservation() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !area || !reservationDate || !timeSlot) {
      alert("Please fill in all fields");
      return;
    }

    fetch("http://localhost/reactapp2/reservation_server/api/create-reservation.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        area,
        reservation_date: reservationDate,
        time_slot: timeSlot
      }),
    })
    .then(res => res.json())
    .then(data => {
      setMessage(data.message);
      setName("");
      setArea("");
      setReservationDate("");
      setTimeSlot("");
    })
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Add Reservation</h2>
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
        <button type="submit">Add Reservation</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateReservation;
