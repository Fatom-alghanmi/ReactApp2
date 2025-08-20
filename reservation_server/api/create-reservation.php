<?php
header("Access-Control-Allow-Origin: *");  // Or set your frontend URL
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once('../config/config.php');      // Optional, if you have config variables
require_once('../config/database.php');    // Provides $conn

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get POST data
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

// Basic validation
if (empty($data['name']) || empty($data['area']) || empty($data['time_slot']) || empty($data['reservation_date'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Error: Missing required fields']);
    exit();
}

// Sanitize input
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$area = filter_var($data['area'], FILTER_SANITIZE_STRING);
$time_slot = filter_var($data['time_slot'], FILTER_SANITIZE_STRING);
$reservation_date = filter_var($data['reservation_date'], FILTER_SANITIZE_STRING);

// Prepare statement
$stmt = $conn->prepare("INSERT INTO reservations (name, area, time_slot, reservation_date) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $area, $time_slot, $reservation_date);

// Execute statement
if ($stmt->execute()) {
    $id = $stmt->insert_id;
    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Reservation created', 'id' => $id]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
