import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

const Admin = () => {

    const [workers, setWorkers] =
        useState([]);

    const [form, setForm] =
        useState({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            login: "",
            password: ""
        });

    const fetchWorkers = async () => {

        try {

            const res = await axios.get(
                "http://localhost/car-rental-api/getWorkers.php"
            );

            setWorkers(res.data);

        } catch {

            toast.error(
                "Błąd pobierania pracowników"
            );
        }
    };

    useEffect(() => {

        fetchWorkers();

    }, []);

    const addWorker = async () => {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex =
            /^[0-9]{9}$/;

        const loginRegex =
            /^[a-zA-Z0-9_]{3,20}$/;

        if (
            !form.first_name ||
            !form.last_name ||
            !form.email ||
            !form.phone ||
            !form.login ||
            !form.password
        ) {

            toast.error(
                "Uzupełnij wszystkie pola"
            );

            return;
        }

        if (
            !emailRegex.test(
                form.email
            )
        ) {

            toast.error(
                "Niepoprawny email"
            );

            return;
        }

        if (
            !phoneRegex.test(
                form.phone
            )
        ) {

            toast.error(
                "Telefon musi mieć 9 cyfr"
            );

            return;
        }

        if (
            !loginRegex.test(
                form.login
            )
        ) {

            toast.error(
                "Niepoprawny login"
            );

            return;
        }

        if (
            form.password.length < 6
        ) {

            toast.error(
                "Hasło musi mieć minimum 6 znaków"
            );

            return;
        }

        try {

            await axios.post(
                "http://localhost/car-rental-api/createWorker.php",
                form
            );

            toast.success(
                "Dodano pracownika"
            );

            setForm({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                login: "",
                password: ""
            });

            fetchWorkers();

        } catch {

            toast.error(
                "Błąd serwera"
            );
        }
    };

    const deleteWorker = async (
        id
    ) => {

        try {

            await axios.post(
                "http://localhost/car-rental-api/deleteWorker.php",
                { id }
            );

            toast.success(
                "Usunięto pracownika"
            );

            fetchWorkers();

        } catch {

            toast.error(
                "Błąd serwera"
            );
        }
    };

    return (

        <div className="admin-page">

            <h1 className="admin-title">
                Panel administratora
            </h1>

            <div className="admin-box">

                <h2>
                    Dodaj pracownika
                </h2>

                <div className="admin-form">

                    <input
                        type="text"
                        placeholder="Imię"
                        value={
                            form.first_name
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                first_name:
                                e.target
                                    .value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Nazwisko"
                        value={
                            form.last_name
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                last_name:
                                e.target
                                    .value
                            })
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email:
                                e.target
                                    .value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Telefon"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                phone:
                                e.target
                                    .value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Login"
                        value={form.login}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                login:
                                e.target
                                    .value
                            })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Hasło"
                        value={
                            form.password
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password:
                                e.target
                                    .value
                            })
                        }
                    />

                </div>

                <button
                    className="admin-btn"
                    onClick={addWorker}
                >
                    Dodaj pracownika
                </button>

            </div>

            <h2 className="workers-title">
                Lista pracowników
            </h2>

            <div className="workers-grid">

                {workers.map((worker) => (

                    <div
                        key={worker.id}
                        className="worker-card"
                    >

                        <div>

                            <h3>
                                {
                                    worker.first_name
                                }{" "}
                                {
                                    worker.last_name
                                }
                            </h3>

                            <p>
                                {worker.email}
                            </p>

                            <p>
                                {worker.login}
                            </p>

                        </div>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                deleteWorker(
                                    worker.id
                                )
                            }
                        >
                            Usuń
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Admin;