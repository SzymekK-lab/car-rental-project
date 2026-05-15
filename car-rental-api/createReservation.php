<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new mysqli(
    "localhost",
    "root",
    "",
    "car_rental"
);

if ($conn->connect_error) {

    die(json_encode([
        "error" => $conn->connect_error
    ]));
}

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$user_id =
    intval($data["user_id"]);

$car_id =
    intval($data["car_id"]);

$start_date =
    $data["start_date"];

$end_date =
    $data["end_date"];

/*
|--------------------------------------------------------------------------
| SPRAWDZENIE CZY TERMIN JEST WOLNY
|--------------------------------------------------------------------------
*/

$checkSql = "
SELECT id
FROM reservations
WHERE car_id = ?
AND status = 'active'
AND (
    start_date <= ?
    AND end_date >= ?
)
";

$checkStmt =
    $conn->prepare($checkSql);

$checkStmt->bind_param(
    "iss",
    $car_id,
    $end_date,
    $start_date
);

$checkStmt->execute();

$result =
    $checkStmt->get_result();

if ($result->num_rows > 0) {

    echo json_encode([
        "error" => "Termin zajęty"
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| DODAWANIE REZERWACJI
|--------------------------------------------------------------------------
*/

$sql = "
INSERT INTO reservations
(
    user_id,
    car_id,
    start_date,
    end_date,
    status
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    'active'
)
";

$stmt = $conn->prepare($sql);

if (!$stmt) {

    die(json_encode([
        "error" => $conn->error
    ]));
}

$stmt->bind_param(
    "iiss",
    $user_id,
    $car_id,
    $start_date,
    $end_date
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true
    ]);

} else {

    echo json_encode([
        "error" => $stmt->error
    ]);
}

$stmt->close();

$conn->close();