<?php

include "config.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$brand = $data['brand'];
$model = $data['model'];
$year = $data['year'];
$price = $data['price'];

$images =
    implode(",", $data['images']);

$sql = "INSERT INTO cars (

    brand,
    model,
    year,
    price,
    images

)

VALUES (

    '$brand',
    '$model',
    '$year',
    '$price',
    '$images'

)";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true
    ]);

} else {

    echo json_encode([
        "success" => false
    ]);
}