<?php
header('Content-Type: application/json');
include 'db_config.php';
date_default_timezone_set('Asia/Kolkata');

// Get date from query param or fallback to today's date
$dateInput = $_GET['date'] ?? date('Y-m-d'); // YYYY-MM-DD
$today = date('d-m-Y', strtotime($dateInput)); // convert to DD-MM-YYYY

// For debugging
error_log("Requested date: " . $today);

// Prepare query
$query = "SELECT `sno`, `Journey`, `Day`, `Date`, `MATHEMATICS`, `PHYSICS`, `CHEMISTRY` FROM assets WHERE `Date` = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $today);
$stmt->execute();
$result = $stmt->get_result();

// Fetch results
$schedule = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $schedule[] = $row;
    }
}

$stmt->close();
$conn->close();

echo json_encode($schedule);
?>
