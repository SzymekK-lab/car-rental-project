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

if ($conn->connect_error) {

    die(json_encode([
        "success" => false,
        "message" => $conn->connect_error
    ]));
}

$data =
    json_decode(
        file_get_contents("php://input"),
        true
    );

$id =
    intval($data["id"]);

$start_date =
    $data["start_date"];

$end_date =
    $data["end_date"];



/*
|--------------------------------------------------------------------------
| POBIERZ AUTO DLA TEJ REZERWACJI
|--------------------------------------------------------------------------
*/

$getSql = "
SELECT car_id
FROM reservations
WHERE id = ?
";

$getStmt =
    $conn->prepare($getSql);

$getStmt->bind_param(
    "i",
    $id
);

$getStmt->execute();

$getResult =
    $getStmt->get_result();

$reservation =
    $getResult->fetch_assoc();

if (!$reservation) {

    echo json_encode([
        "success" => false,
        "message" => "Nie znaleziono rezerwacji"
    ]);

    exit;
}

$car_id =
    $reservation["car_id"];



/*
|--------------------------------------------------------------------------
| SPRAWDŹ KOLIZJĘ TERMINÓW
|--------------------------------------------------------------------------
*/

$checkSql = "
SELECT id
FROM reservations
WHERE car_id = ?
AND status = 'active'
AND id != ?
AND (
    start_date <= ?
    AND end_date >= ?
)
";

$checkStmt =
    $conn->prepare($checkSql);

$checkStmt->bind_param(
    "iiss",
    $car_id,
    $id,
    $end_date,
    $start_date
);

$checkStmt->execute();

$checkResult =
    $checkStmt->get_result();

if ($checkResult->num_rows > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Termin zajęty"
    ]);

    exit;
}



/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

$sql = "
UPDATE reservations
SET start_date = ?,
    end_date = ?
WHERE id = ?
";

$stmt =
    $conn->prepare($sql);

$stmt->bind_param(
    "ssi",
    $start_date,
    $end_date,
    $id
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();