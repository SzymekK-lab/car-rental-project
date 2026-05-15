<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "config.php";

$data =
    json_decode(
        file_get_contents("php://input"),
        true
    );

$firstName =
    $data["firstName"];

$lastName =
    $data["lastName"];

$email =
    $data["email"];

$phone =
    $data["phone"];

$login =
    $data["login"];

$password =
    password_hash(
        $data["password"],
        PASSWORD_DEFAULT
    );

$check =
    $conn->query(
        "SELECT id FROM users
         WHERE login='$login'
         OR email='$email'"
    );

if (
    $check->num_rows > 0
) {

    echo json_encode([
        "success" => false,
        "message" =>
            "Login lub email zajęty"
    ]);

    exit;
}

$sql =
    "INSERT INTO users
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
        '$firstName',
        '$lastName',
        '$email',
        '$phone',
        '$login',
        '$password',
        'client'
    )";

if (
    $conn->query($sql)
) {

    echo json_encode([
        "success" => true
    ]);

} else {

    echo json_encode([
        "success" => false
    ]);
}