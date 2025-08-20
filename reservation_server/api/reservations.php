<?php
header("Content-Type: application/json");
require_once "../config/database.php";

$sql = "SELECT * FROM reservations ORDER BY created_at DESC";
$result = $conn->query($sql);

$reservations = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reservations[] = $row;
    }
}

echo json_encode($reservations);

$conn->close();
