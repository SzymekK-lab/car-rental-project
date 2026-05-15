<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "car_rental"
);

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$id = $data['id'];

$brand = $data['brand'];
$model = $data['model'];
$year = $data['year'];
$price = $data['price'];

$images = $data['images'];

$description = $data['description'];

$horsepower = $data['horsepower'];
$acceleration = $data['acceleration'];
$gearbox = $data['gearbox'];
$drive = $data['drive'];
$engine = $data['engine'];
$seats = $data['seats'];
$doors = $data['doors'];
$torque = $data['torque'];

$pricing = $data['pricing'];

$stmt = $conn->prepare("
UPDATE cars
SET
brand = ?,
model = ?,
year = ?,
price = ?,
images = ?,
description = ?,
horsepower = ?,
acceleration = ?,
gearbox = ?,
drive = ?,
engine = ?,
seats = ?,
doors = ?,
torque = ?,
pricing = ?
WHERE id = ?
");

$stmt->bind_param(
    "ssiisssssssssssi",
    $brand,
    $model,
    $year,
    $price,
    $images,
    $description,
    $horsepower,
    $acceleration,
    $gearbox,
    $drive,
    $engine,
    $seats,
    $doors,
    $torque,
    $pricing,
    $id
);

$stmt->execute();

echo json_encode([
    "success" => true
]);