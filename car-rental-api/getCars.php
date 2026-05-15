<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "config.php";

$sql = "SELECT * FROM cars";

$result = $conn->query($sql);

$cars = [];

while ($row = $result->fetch_assoc()) {

    $cars[] = $row;
}

echo json_encode($cars);