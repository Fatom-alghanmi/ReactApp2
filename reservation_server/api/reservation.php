<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once("../config/database.php");

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$query = "SELECT * FROM reservations WHERE id = :id LIMIT 1";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":id", $id);
$stmt->execute();

$reservation = $stmt->fetch(PDO::FETCH_ASSOC);

if ($reservation) {
    echo json_encode($reservation);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Reservation not found."]);
}
