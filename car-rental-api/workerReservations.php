<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "config.php";

$sql = "
SELECT
    reservations.*,

    cars.brand,
    cars.model,
    cars.images,

    users.first_name,
    users.last_name

FROM reservations

JOIN cars
ON reservations.car_id = cars.id

JOIN users
ON reservations.user_id = users.id
";

$result = $conn->query($sql);

if (!$result) {

    die($conn->error);
}

$reservations = [];

while ($row = $result->fetch_assoc()) {

    $reservations[] = $row;
}

echo json_encode($reservations);