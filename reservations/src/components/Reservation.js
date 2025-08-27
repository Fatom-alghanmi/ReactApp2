import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Reservation() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/reservation_server/api/reservation.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setReservation(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!reservation) return <p>Loading...</p>;

  return (
    <div>
      <h2>{reservation.name}</h2>
      <p>Email: {reservation.email}</p>
      <p>Date: {reservation.date}</p>
      <p>Time: {reservation.time}</p>
      <p>Guests: {reservation.guests}</p>
      <p>Notes: {reservation.notes}</p>
    </div>
  );
}

export default Reservation;
