<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");

require_once('../config/database.php');

$result = $conn->query("SELECT * FROM reservations ORDER BY reservation_date DESC, time_slot ASC");

$reservations = [];
while ($row = $result->fetch_assoc()) {
    $row['booked'] = (int)$row['booked'];
    $reservations[] = $row;
}

echo json_encode($reservations);

$conn->close();
