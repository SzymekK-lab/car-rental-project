import {
    useEffect,
    useState
} from "react"

import toast from "react-hot-toast"

function Dashboard() {

    const [reservations, setReservations] =
        useState([])

    useEffect(() => {

        fetchReservations()

    }, [])

    const fetchReservations =
        async () => {

            const response =
                await fetch(
                    "http://localhost/car-rental-api/getReservations.php"
                )

            const data =
                await response.json()

            setReservations(data)
        }

    const finishReservation =
        async (id) => {

            const response =
                await fetch(

                    "http://localhost/car-rental-api/finishReservation.php",

                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            id
                        })
                    }
                )

            const data =
                await response.json()

            if (data.success) {

                toast.success(
                    "Wynajem zakończony"
                )

                fetchReservations()

            } else {

                toast.error(
                    "Błąd zakończenia"
                )
            }
        }

    return (

        <div className="p-10">

            <h1 className="text-6xl font-bold mb-12">
                Panel pracownika
            </h1>

            {
                reservations.length === 0
                    ? (
                        <p className="text-3xl text-gray-400">
                            Brak rezerwacji
                        </p>
                    )
                    : (
                        <div className="flex flex-col gap-6">

                            {
                                reservations.map(
                                    (reservation) => (

                                        <div

                                            key={
                                                reservation.id
                                            }

                                            className="bg-zinc-900 p-8 rounded-3xl"
                                        >

                                            <h2 className="text-4xl font-bold mb-4">

                                                {
                                                    reservation.car
                                                }

                                            </h2>

                                            <p className="text-2xl text-gray-400 mb-2">

                                                Klient:
                                                {" "}
                                                {
                                                    reservation.username
                                                }

                                            </p>

                                            <p className="text-2xl text-gray-400 mb-2">

                                                Od:
                                                {" "}
                                                {
                                                    reservation.startDate
                                                }

                                            </p>

                                            <p className="text-2xl text-gray-400">

                                                Do:
                                                {" "}
                                                {
                                                    reservation.endDate
                                                }

                                            </p>

                                            <button
                                                onClick={() =>
                                                    finishReservation(
                                                        reservation.id
                                                    )
                                                }

                                                className="bg-green-500 px-6 py-4 rounded-2xl font-bold mt-6"
                                            >
                                                Zakończ wynajem
                                            </button>

                                        </div>
                                    )
                                )
                            }

                        </div>
                    )
            }

        </div>
    )
}

export default Dashboard