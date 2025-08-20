<?php
// CORS configuration
$allowedOrigins = ['http://localhost:3000'];
$allowedHeaders = ['Content-Type'];
$allowedMethods = ['GET', 'POST', 'OPTIONS'];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    header('Access-Control-Allow-Methods: ' . implode(', ', $allowedMethods));
}

if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
    $requestHeaders = explode(',', $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
    $requestHeaders = array_map('trim', $requestHeaders);
    if (count(array_intersect($requestHeaders, $allowedHeaders)) == count($requestHeaders)) {
        header('Access-Control-Allow-Headers: ' . implode(', ', $allowedHeaders));
    }
}

// Optional: JSON content type for all responses
header('Content-Type: application/json');
