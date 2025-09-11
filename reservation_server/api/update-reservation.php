<?php
session_start();

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Only admin can edit
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Only admin can edit reservations']);
    exit();
}

require_once('../config/database.php');

// Get POST fields (FormData)
$id = $_POST['reservationID'] ?? null;
$name = trim($_POST['name'] ?? '');
$area = trim($_POST['area'] ?? '');
$time_slot = trim($_POST['time_slot'] ?? '');
$reservation_date = trim($_POST['reservation_date'] ?? '');

// Validate required fields
if (!$id || !$name || !$area || !$time_slot || !$reservation_date) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
    exit();
}

// Handle image upload if present
$imageName = null;
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $tmpName = $_FILES['image']['tmp_name'];
    $imageName = time() . '_' . basename($_FILES['image']['name']);
    move_uploaded_file($tmpName, "../api/uploads/$imageName");
}

// Update reservation
if ($imageName) {
    $stmt = $conn->prepare("UPDATE reservations SET name=?, area=?, time_slot=?, reservation_date=?, imageName=? WHERE reservationID=?");
    $stmt->bind_param("sssssi", $name, $area, $time_slot, $reservation_date, $imageName, $id);
} else {
    $stmt = $conn->prepare("UPDATE reservations SET name=?, area=?, time_slot=?, reservation_date=? WHERE reservationID=?");
    $stmt->bind_param("ssssi", $name, $area, $time_slot, $reservation_date, $id);
}

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Reservation updated']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Update failed']);
}

$stmt->close();
$conn->close();
?>
