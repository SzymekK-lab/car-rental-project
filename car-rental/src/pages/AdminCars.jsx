import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminCars = () => {

    const [cars, setCars] = useState([]);

    const [form, setForm] = useState({
        brand: "",
        model: "",
        year: "",
        price: "",

        images: "",

        description: "",

        horsepower: "",
        acceleration: "",
        gearbox: "",
        drive: "",
        engine: "",
        seats: "",
        doors: "",
        torque: "",

        pricing: ""

    });

    const [editingId, setEditingId] =
        useState(null);

    const fetchCars = async () => {

        try {

            const res = await axios.get(
                "http://localhost/car-rental-api/getCars.php"
            );

            setCars(res.data);

        } catch {

            toast.error(
                "Błąd pobierania"
            );
        }
    };

    useEffect(() => {

        fetchCars();

    }, []);

    const saveCar = async () => {

        try {

            if (editingId) {

                await axios.post(
                    "http://localhost/car-rental-api/updateCar.php",
                    {
                        id: editingId,
                        ...form
                    }
                );

                toast.success(
                    "Auto zaktualizowane"
                );

            } else {

                await axios.post(
                    "http://localhost/car-rental-api/createCar.php",
                    form
                );

                toast.success(
                    "Dodano auto"
                );
            }

            setForm({
                brand: "",
                model: "",
                year: "",
                price: "",

                images: "",

                description: "",

                horsepower: "",
                acceleration: "",
                gearbox: "",
                drive: "",
                engine: "",
                seats: "",
                doors: "",
                torque: "",

                pricing: ""

            });

            setEditingId(null);

            fetchCars();

        } catch (err) {

            console.log(err);

            toast.error(
                "Błąd serwera"
            );
        }
    };

    const deleteCar = async (id) => {

        try {

            await axios.post(
                "http://localhost/car-rental-api/deleteCar.php",
                { id }
            );

            toast.success(
                "Usunięto auto"
            );

            fetchCars();

        } catch {

            toast.error(
                "Błąd serwera"
            );
        }
    };

    const editCar = (car) => {

        setEditingId(car.id);

        setForm({
            brand: car.brand || "",
            model: car.model || "",
            year: car.year || "",
            price: car.price || "",

            images: car.images || "",

            description: car.description || "",

            horsepower: car.horsepower || "",
            acceleration: car.acceleration || "",
            gearbox: car.gearbox || "",
            drive: car.drive || "",
            engine: car.engine || "",
            seats: car.seats || "",
            doors: car.doors || "",
            torque: car.torque || "",
            pricing: car.pricing || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (

        <div className="admin-page">

            <h1 className="admin-title">
                Zarządzanie samochodami
            </h1>

            <div className="admin-form">

                <input
                    placeholder="Marka"
                    value={form.brand}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            brand: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Model"
                    value={form.model}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            model: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Rocznik"
                    type="number"
                    value={form.year}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            year: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Cena za dzień"
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            price: e.target.value
                        })
                    }
                />

                <input
                    placeholder='["/cars/bmw1.jpg","/cars/bmw2.jpg"]'
                    value={form.images}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            images: e.target.value
                        })
                    }
                />

                <textarea
                    placeholder="Opis samochodu"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value
                        })
                    }
                    className="admin-textarea"
                />

                <input
                    placeholder="Moc"
                    value={form.horsepower}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            horsepower: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Przyspieszenie"
                    value={form.acceleration}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            acceleration: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Skrzynia"
                    value={form.gearbox}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            gearbox: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Napęd"
                    value={form.drive}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            drive: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Silnik"
                    value={form.engine}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            engine: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Miejsca"
                    value={form.seats}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            seats: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Drzwi"
                    value={form.doors}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            doors: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Moment obrotowy"
                    value={form.torque}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            torque: e.target.value
                        })
                    }
                />

                <textarea
                    placeholder='[{"days":"1-2","price":1590}]'
                    value={form.pricing}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            pricing: e.target.value
                        })
                    }
                    className="admin-textarea"
                />

                <button onClick={saveCar}>

                    {editingId
                        ? "Zapisz zmiany"
                        : "Dodaj auto"}

                </button>

            </div>

            <div className="cars-grid">

                {cars.map((car) => {

                    let firstImage = "";

                    try {

                        const parsed =
                            JSON.parse(car.images);

                        firstImage =
                            parsed[0];

                    } catch {

                        firstImage =
                            "/cars/default.jpg";
                    }

                    return (

                        <div
                            key={car.id}
                            className="car-card"
                        >

                            <img
                                src={firstImage}
                                alt=""
                                className="car-image"
                            />

                            <div className="car-content">

                                <h2>
                                    {car.brand}{" "}
                                    {car.model}
                                </h2>

                                <p>
                                    {car.price} zł / dzień
                                </p>

                                <div className="car-actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            editCar(car)
                                        }
                                    >
                                        Edytuj
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteCar(
                                                car.id
                                            )
                                        }
                                    >
                                        Usuń
                                    </button>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default AdminCars;