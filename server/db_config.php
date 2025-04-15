<?php
// Database configuration
$host = 'sql102.infinityfree.com';
$user = 'epiz_31257076';
$password = 'pKyLId4LVAQ1';
$database = 'epiz_31257076_schedule'; // Correct database name

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>