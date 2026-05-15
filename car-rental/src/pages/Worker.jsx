import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

const Worker = () => {

    const [reservations, setReservations] =
        useState([]);

    const fetchReservations = async () => {

        try {

            const res = await axios.get(
                "http://localhost/car-rental-api/workerReservations.php"
            );

            setReservations(res.data);

        } catch {

            toast.error(
                "Błąd pobierania"
            );
        }
    };

    const finishReservation = async (
        id
    ) => {

        try {

            await axios.post(
                "http://localhost/car-rental-api/finishReservation.php",
                { id }
            );

            toast.success(
                "Zakończono wypożyczenie"
            );

            fetchReservations();

        } catch {

            toast.error(
                "Błąd serwera"
            );
        }
    };

    useEffect(() => {

        fetchReservations();

    }, []);

    return (

        <div
            style={{
                background: "black",
                minHeight: "100vh",
                color: "white",
                padding: "40px"
            }}
        >

            <h1
                style={{
                    fontSize: "64px",
                    marginBottom: "40px"
                }}
            >
                Wszystkie wypożyczenia
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(420px, 1fr))",
                    gap: "30px"
                }}
            >

                {reservations.map((r) => {

                    let image = "";

                    try {

                        image =
                            JSON.parse(
                                r.images
                            )[0];

                    } catch {

                        image = r.images;
                    }

                    return (

                        <div
                            key={r.id}
                            style={{
                                background:
                                    "#111",
                                borderRadius:
                                    "24px",
                                overflow:
                                    "hidden"
                            }}
                        >

                            <img
                                src={image}
                                alt=""
                                style={{
                                    width: "100%",
                                    height:
                                        "260px",
                                    objectFit:
                                        "cover"
                                }}
                            />

                            <div
                                style={{
                                    padding:
                                        "25px"
                                }}
                            >

                                <h2
                                    style={{
                                        fontSize:
                                            "40px"
                                    }}
                                >
                                    {r.brand}{" "}
                                    {r.model}
                                </h2>

                                <p
                                    style={{
                                        color:
                                            "#aaa",
                                        marginTop:
                                            "10px"
                                    }}
                                >
                                    Klient:{" "}
                                    {r.first_name}{" "}
                                    {
                                        r.last_name
                                    }
                                </p>

                                <p
                                    style={{
                                        marginTop:
                                            "10px"
                                    }}
                                >
                                    Od:{" "}
                                    {
                                        r.start_date
                                    }
                                </p>

                                <p>
                                    Do:{" "}
                                    {
                                        r.end_date
                                    }
                                </p>

                                <p
                                    style={{
                                        marginTop:
                                            "15px",
                                        color:
                                            r.status ===
                                            "active"
                                                ? "#00ff88"
                                                : "#ff4444"
                                    }}
                                >
                                    {
                                        r.status
                                    }
                                </p>

                                {r.status ===
                                    "active" && (

                                        <button
                                            onClick={() =>
                                                finishReservation(
                                                    r.id
                                                )
                                            }
                                            style={{
                                                marginTop:
                                                    "20px",
                                                width:
                                                    "100%",
                                                background:
                                                    "white",
                                                color:
                                                    "black",
                                                border:
                                                    "none",
                                                padding:
                                                    "18px",
                                                borderRadius:
                                                    "16px",
                                                fontWeight:
                                                    "bold",
                                                fontSize:
                                                    "18px",
                                                cursor:
                                                    "pointer"
                                            }}
                                        >
                                            Zakończ
                                            wypożyczenie
                                        </button>

                                    )}

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default Worker;