<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "config.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$id = $data["id"];

$sql =
    "UPDATE reservations
     SET status='cancelled'
     WHERE id='$id'";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true
    ]);

} else {

    echo json_encode([
        "success" => false
    ]);
}