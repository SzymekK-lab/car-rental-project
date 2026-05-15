import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

const Login = () => {

    const navigate = useNavigate();

    const [login, setLogin] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async (
        e
    ) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost/car-rental-api/login.php",
                {
                    login,
                    password
                }
            );

            console.log(res.data);

            if (
                res.data.success
            ) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        res.data.user
                    )
                );

                toast.success(
                    "Zalogowano"
                );

                const role =
                    res.data.user.role;

                if (
                    role === "admin"
                ) {

                    window.location.href =
                        "/admin";

                } else if (
                    role === "worker"
                ) {

                    window.location.href =
                        "/worker";

                } else {

                    window.location.href =
                        "/account";
                }

            } else {

                toast.error(
                    "Nieprawidłowy login lub hasło"
                );
            }

        } catch (err) {

            console.log(err);

            toast.error(
                "Błąd serwera"
            );
        }
    };

    return (

        <div className="auth-page">

            <form
                className="auth-box"
                onSubmit={handleLogin}
            >

                <h1>
                    Logowanie
                </h1>

                <input
                    type="text"
                    placeholder="Login"
                    value={login}
                    onChange={(e) =>
                        setLogin(
                            e.target.value
                        )
                    }
                />

                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button type="submit">
                    Zaloguj się
                </button>

                <p>

                    Nie masz konta?

                    <Link to="/register">
                        Rejestracja
                    </Link>

                </p>

            </form>

        </div>
    );
};

export default Login;