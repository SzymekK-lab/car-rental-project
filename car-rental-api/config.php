<?php

header("Access-Control-Allow-Origin: *");

header(
    "Access-Control-Allow-Headers: Content-Type"
);

header(
    "Access-Control-Allow-Methods: GET, POST, OPTIONS"
);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    exit(0);
}

$conn = new mysqli(

    "localhost",
    "root",
    "",
    "car_rental"
);

if ($conn->connect_error) {

    die(

    json_encode([

        "success" => false,

        "message" =>
            "Błąd połączenia z bazą danych"
    ])
    );
}

$conn->set_charset("utf8");