<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "car_rental"
);

$id = $_GET["id"];

$sql = "
SELECT *
FROM cars
WHERE id = $id
";

$result = $conn->query($sql);

$car = $result->fetch_assoc();

echo json_encode($car);
?>