<?php

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: *");

header("Access-Control-Allow-Methods: POST");

header("Content-Type: application/json");

include "config.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$name =
    $data['name'];

$surname =
    $data['surname'];

$email =
    $data['email'];

$phone =
    $data['phone'];

$username =
    $data['username'];

$password =
    $data['password'];

$checkUser = "

SELECT * FROM users

WHERE username = '$username'

OR email = '$email'

";

$result =
    $conn->query($checkUser);

if ($result->num_rows > 0) {

    echo json_encode([
        "exists" => true
    ]);

    exit;
}

$sql = "

INSERT INTO users (

    name,
    surname,
    email,
    phone,
    username,
    password,
    role

)

VALUES (

    '$name',
    '$surname',
    '$email',
    '$phone',
    '$username',
    '$password',
    'worker'

)

";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true
    ]);

} else {

    echo json_encode([
        "success" => false
    ]);
}