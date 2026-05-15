import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

function Client() {

    const [reservations, setReservations] = useState([]);

    const [editId, setEditId] = useState(null);

    const [editStart, setEditStart] = useState("");
    const [editEnd, setEditEnd] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        fetchReservations();

    }, []);

    const fetchReservations = async () => {

        try {

            const res = await axios.get(
                `http://localhost/car-rental-api/getUserReservations.php?user_id=${user.id}`
            );

            setReservations(res.data);

        } catch {

            toast.error(
                "Błąd pobierania"
            );
        }
    };

    const finishReservation = async (id) => {

        try {

            const res = await axios.post(
                "http://localhost/car-rental-api/finishReservation.php",
                {
                    id
                }
            );

            if (res.data.success) {

                toast.success(
                    "Zakończono rezerwację"
                );

                fetchReservations();
            }

        } catch {

            toast.error(
                "Błąd serwera"
            );
        }
    };

    const updateReservation = async () => {

        try {

            const res = await axios.post(
                "http://localhost/car-rental-api/updateReservation.php",
                {
                    id: editId,
                    start_date: editStart,
                    end_date: editEnd
                }
            );

            if (res.data.success) {

                toast.success(
                    "Zaktualizowano rezerwację"
                );

                setEditId(null);

                fetchReservations();

            } else {

                toast.error(
                    res.data.message
                );
            }

        } catch {

            toast.error(
                "Błąd serwera"
            );
        }
    };

    return (

        <div
            style={{
                background: "#000",
                minHeight: "100vh",
                color: "white",
                padding: "50px"
            }}
        >

            <h1
                style={{
                    fontSize: "72px",
                    marginBottom: "50px"
                }}
            >
                Moje wypożyczenia
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: "30px"
                }}
            >

                {reservations.map((r) => {

                    const images = JSON.parse(r.images);

                    return (

                        <div
                            key={r.id}
                            style={{
                                background: "#111",
                                borderRadius: "30px",
                                overflow: "hidden",
                                border: "1px solid #222"
                            }}
                        >

                            <img
                                src={images[0]}
                                alt=""
                                style={{
                                    width: "100%",
                                    height: "250px",
                                    objectFit: "cover"
                                }}
                            />

                            <div
                                style={{
                                    padding: "30px"
                                }}
                            >

                                <h2
                                    style={{
                                        fontSize: "42px",
                                        marginBottom: "20px"
                                    }}
                                >
                                    {r.brand} {r.model}
                                </h2>

                                <p
                                    style={{
                                        fontSize: "24px",
                                        color: "#aaa"
                                    }}
                                >
                                    {r.start_date}
                                </p>

                                <p
                                    style={{
                                        fontSize: "24px",
                                        color: "#aaa",
                                        marginBottom: "20px"
                                    }}
                                >
                                    {r.end_date}
                                </p>

                                <p
                                    style={{
                                        fontSize: "28px",
                                        fontWeight: "bold",
                                        marginBottom: "20px"
                                    }}
                                >
                                    {r.price} zł / dzień
                                </p>

                                <p
                                    style={{
                                        fontSize: "22px",
                                        marginBottom: "20px",
                                        color:
                                            r.status === "active"
                                                ? "#00ff88"
                                                : "#ff5555"
                                    }}
                                >
                                    {r.status}
                                </p>

                                {r.status === "active" && (

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "15px"
                                        }}
                                    >

                                        {editId === r.id ? (

                                            <>

                                                <input
                                                    type="date"
                                                    value={editStart}
                                                    onChange={(e) =>
                                                        setEditStart(
                                                            e.target.value
                                                        )
                                                    }
                                                    style={{
                                                        padding: "12px",
                                                        borderRadius: "12px",
                                                        fontSize: "18px"
                                                    }}
                                                />

                                                <input
                                                    type="date"
                                                    value={editEnd}
                                                    onChange={(e) =>
                                                        setEditEnd(
                                                            e.target.value
                                                        )
                                                    }
                                                    style={{
                                                        padding: "12px",
                                                        borderRadius: "12px",
                                                        fontSize: "18px"
                                                    }}
                                                />

                                                <button
                                                    onClick={
                                                        updateReservation
                                                    }
                                                    style={{
                                                        background: "#00ff88",
                                                        color: "black",
                                                        border: "none",
                                                        padding:
                                                            "18px 30px",
                                                        borderRadius:
                                                            "18px",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    Zapisz zmiany
                                                </button>

                                            </>

                                        ) : (

                                            <button
                                                onClick={() => {

                                                    setEditId(r.id);

                                                    setEditStart(
                                                        r.start_date
                                                    );

                                                    setEditEnd(
                                                        r.end_date
                                                    );
                                                }}
                                                style={{
                                                    background: "#ffaa00",
                                                    color: "black",
                                                    border: "none",
                                                    padding:
                                                        "18px 30px",
                                                    borderRadius:
                                                        "18px",
                                                    fontWeight: "bold",
                                                    fontSize: "20px",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                Edytuj rezerwację
                                            </button>

                                        )}

                                        <button
                                            onClick={() =>
                                                finishReservation(r.id)
                                            }
                                            style={{
                                                background: "white",
                                                color: "black",
                                                border: "none",
                                                padding:
                                                    "18px 30px",
                                                borderRadius:
                                                    "18px",
                                                fontWeight: "bold",
                                                fontSize: "20px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Zakończ rezerwację
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    );
                })}

            </div>

        </div>
    );
}

export default Client;