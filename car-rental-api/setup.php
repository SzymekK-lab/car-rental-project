<?php

$conn = new mysqli(
    "localhost",
    "root",
    ""
);

if ($conn->connect_error) {

    die(
        "Connection failed: " .
        $conn->connect_error
    );
}





$conn->query("
CREATE DATABASE IF NOT EXISTS car_rental
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
");

$conn->select_db("car_rental");





$conn->query("
CREATE TABLE IF NOT EXISTS users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(100),

    last_name VARCHAR(100),

    email VARCHAR(255),

    phone VARCHAR(20),

    login VARCHAR(100),

    password VARCHAR(255),

    role VARCHAR(50)
    DEFAULT 'client'
)
");



$conn->query("
CREATE TABLE IF NOT EXISTS cars (

    id INT AUTO_INCREMENT PRIMARY KEY,

    brand VARCHAR(100),

    model VARCHAR(100),

    year INT,

    price INT,

    images TEXT,

    description TEXT,

    horsepower VARCHAR(50),

    acceleration VARCHAR(50),

    gearbox VARCHAR(50),

    drive VARCHAR(50),

    engine VARCHAR(50),

    seats VARCHAR(50),

    doors VARCHAR(50),

    torque VARCHAR(50),

    pricing TEXT
)
");



$conn->query("
CREATE TABLE IF NOT EXISTS reservations (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    car_id INT NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    status ENUM(
        'active',
        'finished',
        'cancelled'
    )
    DEFAULT 'active',

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
)
");



$checkAdmin =
    $conn->query("
    SELECT *
    FROM users
    WHERE login='admin'
");

if (
    $checkAdmin->num_rows == 0
) {

    $password =
        password_hash(
            "admin123",
            PASSWORD_DEFAULT
        );

    $conn->query("
    INSERT INTO users (

        first_name,
        last_name,
        email,
        phone,
        login,
        password,
        role

    ) VALUES (

        'Admin',
        'System',
        'admin@admin.pl',
        '123123123',
        'admin',
        '$password',
        'admin'
    )
    ");
}



$checkCars =
    $conn->query("
    SELECT *
    FROM cars
");

if (
    $checkCars->num_rows == 0
) {

    $images =
        json_encode([
            "/cars/bmwm4front.jpg",
            "/cars/bmwm4side.jpg",
            "/cars/bmwm4inside.jpg"
        ]);

    $pricing =
        json_encode([

            [
                "days" => "1-2 dni",
                "price" => 1590
            ],

            [
                "days" => "3-5 dni",
                "price" => 1290
            ],

            [
                "days" => "6-9 dni",
                "price" => 850
            ]
        ]);

    $description =
        "BMW M4 Competition xDrive.";

    $conn->query("
    INSERT INTO cars (

        brand,
        model,
        year,
        price,
        images,
        description,
        horsepower,
        acceleration,
        gearbox,
        drive,
        engine,
        seats,
        doors,
        torque,
        pricing

    ) VALUES (

        'BMW',
        'M4 Competition',
        2023,
        1590,
        '$images',
        '$description',
        '530 KM',
        '3.7 s',
        'Automatyczna',
        'AWD',
        '3.0 R6 TwinTurbo',
        '5',
        '3',
        '650 Nm',
        '$pricing'
    )
    ");
}

echo "SETUP COMPLETED";