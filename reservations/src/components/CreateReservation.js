import React, { useState } from "react";

function CreateReservation({ onAddReservation }) {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");                 // <-- added
  const [reservationDate, setReservationDate] = useState("");  // <-- added
  const [timeSlot, setTimeSlot] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !area || !reservationDate || !timeSlot) {
      alert("Please fill in all fields");
      return;
    }

    const newReservation = {
      id: Date.now(),
      name,
      area,
      reservation_date: reservationDate,
      time_slot: timeSlot,
      booked: false,
    };

    onAddReservation(newReservation);

    setName("");
    setArea("");                  // <-- added
    setReservationDate("");       // <-- added
    setTimeSlot("");
  };

  return (
    <div className="form-container">
      <h2>Add Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Area"
          value={area}                          // <-- added
          onChange={(e) => setArea(e.target.value)}  // <-- added
        />
        <input
          type="date"
          value={reservationDate}               // <-- added
          onChange={(e) => setReservationDate(e.target.value)} // <-- added
        />
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        >
          <option value="">Select Time Slot</option>
          <option value="9:00-12:00">9:00-12:00</option>
          <option value="12:00-3:00">12:00-3:00</option>
          <option value="3:00-6:00">3:00-6:00</option>
        </select>
        <button type="submit">Add Reservation</button>
      </form>
    </div>
  );
}

export default CreateReservation;
