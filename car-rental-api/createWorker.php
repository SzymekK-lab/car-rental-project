<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "config.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$first_name = $data["first_name"];
$last_name = $data["last_name"];
$email = $data["email"];
$phone = $data["phone"];
$login = $data["login"];
$password = password_hash(
    $data["password"],
    PASSWORD_DEFAULT
);

$sql = "
INSERT INTO users
(
    first_name,
    last_name,
    email,
    phone,
    login,
    password,
    role
)
VALUES
(
    '$first_name',
    '$last_name',
    '$email',
    '$phone',
    '$login',
    '$password',
    'worker'
)
";

$conn->query($sql);

echo json_encode([
    "success" => true
]);