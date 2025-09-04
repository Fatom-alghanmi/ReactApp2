import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Reservation() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/reactapp2/reservation_server/api/reservation.php?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reservation");
        return res.json();
      })
      .then((data) => setReservation(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!reservation) return <p>Loading...</p>;

  return (
    <div>
      <h2>{reservation.name}</h2>
      <img
        src={`http://localhost/reactapp2/reservation_server/uploads/${reservation.imageName || 'placeholder_100.jpg'}`}
        alt="Conservation Area"
        style={{ width: "300px", borderRadius: "6px", marginBottom: "10px" }}
      />
      <p>Area: {reservation.area}</p>
      <p>Date: {reservation.reservation_date}</p>
      <p>Time: {reservation.time_slot}</p>
      <p>Booked: {reservation.booked === "1" ? "Yes" : "No"}</p>
    </div>
  );
}

export default Reservation;
