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

$login =
    $data["login"];

$password =
    $data["password"];

$sql =
    "SELECT * FROM users
     WHERE login='$login'";

$result =
    $conn->query($sql);

if (
    $result->num_rows > 0
) {

    $user =
        $result->fetch_assoc();

    if (
        password_verify(
            $password,
            $user["password"]
        )
    ) {

        echo json_encode([

            "success" => true,

            "user" => [

                "id" =>
                    $user["id"],

                "first_name" =>
                    $user["first_name"],

                "last_name" =>
                    $user["last_name"],

                "email" =>
                    $user["email"],

                "phone" =>
                    $user["phone"],

                "login" =>
                    $user["login"],

                "role" =>
                    $user["role"]
            ]
        ]);

    } else {

        echo json_encode([
            "success" => false
        ]);
    }

} else {

    echo json_encode([
        "success" => false
    ]);
}