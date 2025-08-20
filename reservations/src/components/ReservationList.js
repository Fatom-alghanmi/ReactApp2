import React from "react";

function ReservationList({ reservations, onToggleBooked }) {
  return (
    <div className="container mt-4">
      <h2>Reservation List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Area</th>
            <th>Date</th>
            <th>Time Slot</th> {/* Add this */}
            <th>Booked</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.name}</td>
              <td>{reservation.area}</td>
              <td>{reservation.reservation_date}</td>
              <td>{reservation.time_slot}</td> {/* Add this */}
              <td>
                <input
                  type="checkbox"
                  checked={reservation.booked}
                  onChange={() => onToggleBooked(reservation.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;
