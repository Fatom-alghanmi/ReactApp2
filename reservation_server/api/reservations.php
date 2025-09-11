<?php


session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');

$result = $conn->query("SELECT * FROM reservations ORDER BY reservation_date DESC, time_slot ASC");

$reservations = [];
while ($row = $result->fetch_assoc()) {
    $row['booked'] = (int)$row['booked'];
    $reservations[] = $row;
}

echo json_encode($reservations);

$conn->close();
