<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once('../config/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['reservationID']) && isset($data['booked'])) {
    $stmt = $conn->prepare("UPDATE reservations SET booked = ? WHERE reservationID = ?");
    $stmt->bind_param("ii", $data['booked'], $data['reservationID']);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Reservation updated']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing parameters']);
}

$conn->close();
