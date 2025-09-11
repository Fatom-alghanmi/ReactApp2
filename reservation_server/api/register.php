<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);
$userName = trim($data['userName'] ?? '');
$emailAddress = trim($data['emailAddress'] ?? '');
$password = $data['password'] ?? '';
$role = trim($data['role'] ?? 'user');
$adminSecret = trim($data['adminSecret'] ?? ''); // Only sent if role=admin

// Validate required fields
if (!$userName || !$emailAddress || !$password) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit();
}

// Only allow admin if secret matches
if ($role === 'admin') {
    $secretPassword = 'secret'; // <-- your server secret
    if ($adminSecret !== $secretPassword) {
        echo json_encode(['success' => false, 'message' => 'Invalid admin secret']);
        exit();
    }
}

// Check for duplicate username/email
$check = $conn->prepare("SELECT userID FROM registrations WHERE userName=? OR emailAddress=?");
$check->bind_param("ss", $userName, $emailAddress);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Username or email already taken']);
    exit();
}
$check->close();

// Hash password
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// Insert new user
$stmt = $conn->prepare("INSERT INTO registrations (userName, password, emailAddress, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $userName, $passwordHash, $emailAddress, $role);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Registration successful']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed']);
}

$stmt->close();
$conn->close();
?>
