<?php
session_start();
session_start();

// CORS headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if (isset($_SESSION['user'])) {
    echo json_encode([
        'success' => true,          // <-- matches AuthContext
        'user' => $_SESSION['user']
    ]);
} else {
    echo json_encode([
        'success' => false          // <-- matches AuthContext
    ]);
}
