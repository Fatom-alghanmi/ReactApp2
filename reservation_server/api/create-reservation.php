<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once('../config/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Validate required fields
if (!isset($_POST['name'], $_POST['area'], $_POST['reservation_date'], $_POST['time_slot'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required fields']);
    exit();
}

$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
$area = filter_var($_POST['area'], FILTER_SANITIZE_STRING);
$reservation_date = filter_var($_POST['reservation_date'], FILTER_SANITIZE_STRING);
$time_slot = filter_var($_POST['time_slot'], FILTER_SANITIZE_STRING);

// Handle image upload
$uploadDir = __DIR__ . "/uploads/";
if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

$imageName = "placeholder_100.jpg"; // default
if (!empty($_FILES['imageName']['name'])) {
    $originalName = basename($_FILES['imageName']['name']);
    $targetFilePath = $uploadDir . $originalName;

    // Avoid overwriting
    if (file_exists($targetFilePath)) {
        $originalName = time() . '_' . $originalName;
        $targetFilePath = $uploadDir . $originalName;
    }

    if (!move_uploaded_file($_FILES['imageName']['tmp_name'], $targetFilePath)) {
        http_response_code(500);
        echo json_encode([
            'message' => 'Error uploading file',
            'php_error' => $_FILES['imageName']['error']
        ]);
        exit();
    }

    $imageName = $originalName;
}

// Insert into database
$stmt = $conn->prepare('INSERT INTO reservations (name, area, time_slot, reservation_date, imageName) VALUES (?, ?, ?, ?, ?)');
$stmt->bind_param('sssss', $name, $area, $time_slot, $reservation_date, $imageName);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Reservation created', 'id' => $stmt->insert_id, 'imageName' => $imageName]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
