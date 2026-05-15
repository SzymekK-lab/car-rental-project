<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "config.php";

$user_id = $_GET["user_id"];

$sql = "
    SELECT
        reservations.id,
        reservations.start_date,
        reservations.end_date,
        reservations.status,

        cars.brand,
        cars.model,
        cars.price,
        cars.images

    FROM reservations

    JOIN cars
    ON reservations.car_id = cars.id

    WHERE reservations.user_id = $user_id

    ORDER BY reservations.id DESC
";

$result = $conn->query($sql);

$reservations = [];

while ($row = $result->fetch_assoc()) {

    $reservations[] = $row;
}

echo json_encode($reservations);