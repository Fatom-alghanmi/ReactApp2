import React, { useEffect, useState } from "react";

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    fetch("http://localhost/reactapp2/reservation_server/api/reservations.php")
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error(err));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleBookedChange = (reservationID, currentBooked) => {
    const newBooked = Number(!Number(currentBooked));

    fetch("http://localhost/reactapp2/reservation_server/api/toggle-booked.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservationID, booked: newBooked }),
    })
      .then(res => res.json())
      .then(() => fetchReservations())
      .catch(err => console.error(err));
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
          <h3>{res.name} - {res.reservation_date}</h3>

          {expandedId === res.reservationID ? (
  <>
    {/* Small thumbnail */}
    <img
      src={`http://localhost/reactapp2/reservation_server/api/uploads/${res.imageName || 'placeholder_100.jpg'}`}
      alt="Conservation Area"
      style={{
        width: "150px",           // small width
        height: "100px",          // small height
        objectFit: "contain",     // show full image without cropping
        borderRadius: "6px",
        backgroundColor: "#f0f0f0",
        marginBottom: "10px"
      }}
    />
    <p>Area: {res.area}</p>
    <p>Time Slot: {res.time_slot}</p>
    <label>
      <input
        type="checkbox"
        checked={res.booked === "1" || res.booked === 1}
        onChange={() => handleBookedChange(res.reservationID, res.booked)}
      />{" "}
      Booked
    </label>
    <br />
    <button
      style={{
        backgroundColor: "#0d6efd",
        color: "white",
        padding: "8px 15px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginTop: "5px",
      }}
      onClick={() => toggleExpand(res.reservationID)}
    >
      Read Less
    </button>
  </>
) : (
  <button
    style={{
      backgroundColor: "#0d6efd",
      color: "white",
      padding: "8px 15px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "5px",
    }}
    onClick={() => toggleExpand(res.reservationID)}
  >
    Read More
  </button>
)}

        </div>
      ))}
    </div>
  );
}

export default ReservationList;
