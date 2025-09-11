<?php
session_start();

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Require authentication
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit();
}

// Only admin can delete
if ($_SESSION['user']['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Forbidden: Admins only"]);
    exit();
}

require_once('../config/config.php');
require_once('../config/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $reservationID = isset($data['id']) ? intval($data['id']) : 0;

    if ($reservationID > 0) {
        $stmt = $conn->prepare("DELETE FROM reservations WHERE reservationID = ?");
        $stmt->bind_param("i", $reservationID);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Reservation deleted successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to delete reservation."]);
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid reservation ID."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}

$conn->close();
?>
