import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import toast from "react-hot-toast";

const CarDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [car, setCar] =
        useState(null);

    const [reservations, setReservations] =
        useState([]);

    const [mainImage, setMainImage] =
        useState("");

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    useEffect(() => {

        fetchCar();
        fetchReservations();

    }, []);

    const fetchCar = async () => {

        try {

            const res = await axios.get(
                `http://localhost/car-rental-api/getCar.php?id=${id}`
            );

            setCar(res.data);

            const parsedImages =
                JSON.parse(
                    res.data.images
                );

            setMainImage(
                parsedImages[0]
            );

        } catch {

            toast.error(
                "Błąd pobierania auta"
            );
        }
    };

    const fetchReservations =
        async () => {

            try {

                const res =
                    await axios.get(
                        `http://localhost/car-rental-api/getReservations.php?car_id=${id}`
                    );

                setReservations(
                    res.data
                );

            } catch {

                toast.error(
                    "Błąd pobierania rezerwacji"
                );
            }
        };

    const calculateDays = () => {

        if (
            !startDate ||
            !endDate
        ) return 0;

        const start =
            new Date(startDate);

        const end =
            new Date(endDate);

        const diff =
            end - start;

        return Math.ceil(
            diff /
            (1000 * 60 * 60 * 24)
        );
    };

    const getPricePerDay = (
        days
    ) => {

        if (!car?.pricing)
            return car.price;

        let pricing = [];

        try {

            pricing =
                JSON.parse(
                    car.pricing
                );

        } catch {

            return car.price;
        }

        if (days <= 2)
            return pricing[0]?.price || car.price;

        if (days <= 5)
            return pricing[1]?.price || car.price;

        if (days <= 9)
            return pricing[2]?.price || car.price;

        if (days <= 13)
            return pricing[3]?.price || car.price;

        if (days <= 17)
            return pricing[4]?.price || car.price;

        if (days <= 25)
            return pricing[5]?.price || car.price;

        return pricing[6]?.price || car.price;
    };

    const handleReservation =
        async () => {

            if (!user) {

                toast.error(
                    "Zaloguj się aby wynająć auto"
                );

                navigate("/login");

                return;
            }

            if (
                !startDate ||
                !endDate
            ) {

                toast.error(
                    "Wybierz daty"
                );

                return;
            }

            try {

                const res =
                    await axios.post(
                        "http://localhost/car-rental-api/createReservation.php",
                        {
                            user_id: user.id,
                            car_id: car.id,
                            start_date: startDate,
                            end_date: endDate
                        }
                    );

                if (res.data.error) {

                    toast.error(
                        res.data.error
                    );

                    return;
                }

                toast.success(
                    "Rezerwacja powiodła się"
                );

                fetchReservations();

            } catch (err) {

                console.log(err);

                toast.error(
                    "Błąd serwera"
                );
            }
        };

    if (!car) return null;

    const images =
        JSON.parse(car.images);

    const days =
        calculateDays();

    const pricePerDay =
        getPricePerDay(days);

    const totalPrice =
        days * pricePerDay;

    const pricing =
        car.pricing
            ? JSON.parse(car.pricing)
            : [];

    return (

        <div className="details-page">

            <img
                src={mainImage}
                alt=""
                className="details-image"
            />

            <div className="details-thumbnails">

                {images.map(
                    (img, index) => (

                        <img
                            key={index}
                            src={img}
                            alt=""
                            onClick={() =>
                                setMainImage(img)
                            }
                        />
                    )
                )}

            </div>

            <div className="details-content">

                <h1>
                    {car.brand} {car.model}
                </h1>

                <h2>
                    {pricePerDay}zł / dzień
                </h2>

                <p>
                    Rocznik:
                    {car.year}
                </p>

                <div className="details-form">

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate(
                                e.target.value
                            )
                        }
                    />

                    <button
                        onClick={
                            handleReservation
                        }
                    >
                        Wypożycz
                    </button>

                </div>

                {days > 0 && (

                    <div className="price-box">

                        <h3>
                            Podsumowanie wynajmu
                        </h3>

                        <p>
                            Liczba dni:
                            {days}
                        </p>

                        <p>
                            Cena za dobę:
                            {pricePerDay}zł
                        </p>

                        <h2>
                            Razem:
                            {totalPrice} zł
                        </h2>

                    </div>
                )}

                <div className="specs-box">

                    <h3>
                        Specyfikacja
                    </h3>

                    <div className="specs-grid">

                        <div className="spec-card">
                            <span>Moc</span>
                            <h4>
                                {car.horsepower}
                            </h4>
                        </div>

                        <div className="spec-card">
                            <span>0-100</span>
                            <h4>
                                {car.acceleration}
                            </h4>
                        </div>

                        <div className="spec-card">
                            <span>Skrzynia</span>
                            <h4>
                                {car.gearbox}
                            </h4>
                        </div>

                        <div className="spec-card">
                            <span>Napęd</span>
                            <h4>
                                {car.drive}
                            </h4>
                        </div>

                        <div className="spec-card">
                            <span>Silnik</span>
                            <h4>
                                {car.engine}
                            </h4>
                        </div>

                        <div className="spec-card">
                            <span>Miejsca</span>
                            <h4>
                                {car.seats}
                            </h4>
                        </div>

                        <div className="spec-card">
                            <span>Drzwi</span>
                            <h4>
                                {car.doors}
                            </h4>
                        </div>

                        <div className="spec-card">
                            <span>Moment</span>
                            <h4>
                                {car.torque}
                            </h4>
                        </div>

                    </div>

                </div>

                <div className="description-box">

                    <h3>
                        Opis samochodu
                    </h3>

                    <p>
                        {car.description}
                    </p>

                </div>

                {pricing.length > 0 && (

                    <div className="pricing-table">

                        <h3>
                            Cennik wynajmu
                        </h3>

                        {pricing.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="pricing-row"
                                >

                                    <span>
                                        {item.days}
                                    </span>

                                    <strong>
                                        {item.price}
                                        zł/doba
                                    </strong>

                                </div>
                            )
                        )}

                    </div>
                )}

                <div className="reservations-box">

                    <h3>
                        Zarezerwowane terminy
                    </h3>

                    {reservations.length === 0 && (
                        <p>
                            Brak rezerwacji
                        </p>
                    )}

                    {reservations.map(
                        (reservation) => (

                            <p
                                key={
                                    reservation.id
                                }
                            >
                                {
                                    reservation.start_date
                                }
                                {" — "}
                                {
                                    reservation.end_date
                                }
                            </p>
                        )
                    )}

                </div>

            </div>

        </div>
    );
};

export default CarDetails;