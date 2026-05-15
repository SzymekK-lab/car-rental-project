<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "car_rental"
);

if ($conn->connect_error) {

    die(json_encode([
        "error" => $conn->connect_error
    ]));
}

$car_id =
    intval($_GET["car_id"]);

$sql = "
SELECT *
FROM reservations
WHERE car_id = ?
AND status = 'active'
ORDER BY start_date ASC
";

$stmt =
    $conn->prepare($sql);

$stmt->bind_param(
    "i",
    $car_id
);

$stmt->execute();

$result =
    $stmt->get_result();

$reservations = [];

while (
$row =
    $result->fetch_assoc()
) {

    $reservations[] = $row;
}

echo json_encode(
    $reservations
);

$stmt->close();
$conn->close();