import {
    useState
} from "react";

import axios from "axios";

import {
    useNavigate,
    Link
} from "react-router-dom";

import toast from "react-hot-toast";

export default function Register() {

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            login: "",
            password: ""
        });

    const handleChange =
        (e) => {

            setFormData({
                ...formData,
                [e.target.name]:
                e.target.value
            });
        };

    const validate =
        () => {

            const nameRegex =
                /^[A-Za-zÀ-ž]{2,}$/;

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            const phoneRegex =
                /^[0-9]{9}$/;

            const loginRegex =
                /^[a-zA-Z0-9_]{4,20}$/;

            const passwordRegex =
                /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;

            if (
                !nameRegex.test(
                    formData.firstName
                )
            ) {

                toast.error(
                    "Niepoprawne imię"
                );

                return false;
            }

            if (
                !nameRegex.test(
                    formData.lastName
                )
            ) {

                toast.error(
                    "Niepoprawne nazwisko"
                );

                return false;
            }

            if (
                !emailRegex.test(
                    formData.email
                )
            ) {

                toast.error(
                    "Niepoprawny email"
                );

                return false;
            }

            if (
                !phoneRegex.test(
                    formData.phone
                )
            ) {

                toast.error(
                    "Telefon musi mieć 9 cyfr"
                );

                return false;
            }

            if (
                !loginRegex.test(
                    formData.login
                )
            ) {

                toast.error(
                    "Login 4-20 znaków"
                );

                return false;
            }

            if (
                !passwordRegex.test(
                    formData.password
                )
            ) {

                toast.error(
                    "Hasło musi mieć dużą literę i cyfrę"
                );

                return false;
            }

            return true;
        };

    const handleRegister =
        async (e) => {

            e.preventDefault();

            if (!validate()) {
                return;
            }

            try {

                const response =
                    await axios.post(
                        "http://localhost/car-rental-api/register.php",
                        formData
                    );

                if (
                    response.data.success
                ) {

                    toast.success(
                        "Konto utworzone"
                    );

                    navigate("/login");

                } else {

                    toast.error(
                        response.data.message
                    );
                }

            } catch {

                toast.error(
                    "Błąd serwera"
                );
            }
        };

    return (

        <div className="auth-page">

            <form
                onSubmit={
                    handleRegister
                }
                className="auth-box"
            >

                <h1>
                    Rejestracja
                </h1>

                <input
                    type="text"
                    name="firstName"
                    placeholder="Imię"
                    value={
                        formData.firstName
                    }
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Nazwisko"
                    value={
                        formData.lastName
                    }
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={
                        formData.email
                    }
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Telefon"
                    value={
                        formData.phone
                    }
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="text"
                    name="login"
                    placeholder="Login"
                    value={
                        formData.login
                    }
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Hasło"
                    value={
                        formData.password
                    }
                    onChange={
                        handleChange
                    }
                />

                <button type="submit">
                    Załóż konto
                </button>

                <p>
                    Masz konto?

                    <Link to="/login">
                        Logowanie
                    </Link>
                </p>

            </form>
        </div>
    );
}