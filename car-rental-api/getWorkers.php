<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "config.php";

$sql = "
SELECT *
FROM users
WHERE role = 'worker'
";

$result = $conn->query($sql);

$workers = [];

while ($row = $result->fetch_assoc()) {

    $workers[] = $row;
}

echo json_encode($workers);