import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {

    const [user, setUser] =
        useState(null);

    useEffect(() => {

        const checkUser = () => {

            const loggedUser =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    )
                );

            setUser(loggedUser);
        };

        checkUser();

        window.addEventListener(
            "storage",
            checkUser
        );

        return () => {

            window.removeEventListener(
                "storage",
                checkUser
            );
        };

    }, []);

    const logout = () => {

        localStorage.removeItem(
            "user"
        );

        window.location.href = "/";
    };

    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                AutoRent
            </Link>

            <div className="nav-links">

                <Link to="/">
                    Strona główna
                </Link>

                <Link to="/cars">
                    Samochody
                </Link>

                {!user && (
                    <>
                        <Link to="/login">
                            Logowanie
                        </Link>

                        <Link to="/register">
                            Rejestracja
                        </Link>
                    </>
                )}

                {user?.role ===
                    "client" && (
                        <Link to="/account">
                            Moje konto
                        </Link>
                    )}

                {user?.role ===
                    "worker" && (
                        <Link to="/worker">
                            Panel pracownika
                        </Link>
                    )}

                {user?.role ===
                    "admin" && (

                        <div className="admin-dropdown">

                            <div className="admin-dropdown-trigger">
                                Panel admina
                            </div>

                            <div className="admin-dropdown-menu">

                                <Link
                                    to="/admin"
                                    className="dropdown-item"
                                >
                                    Pracownicy
                                </Link>

                                <Link
                                    to="/admin/cars"
                                    className="dropdown-item"
                                >
                                    Samochody
                                </Link>

                            </div>

                        </div>
                    )}

                {user && (
                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Wyloguj
                    </button>
                )}

            </div>

        </nav>
    );
};

export default Navbar;