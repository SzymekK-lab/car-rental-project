import {
    Link
} from "react-router-dom";

function Home() {

    return (

        <div
            style={{
                background: "#000",
                minHeight: "100vh",
                color: "white",
                padding: "60px"
            }}
        >

            <h1
                style={{
                    fontSize: "64px",
                    fontWeight: "bold"
                }}
            >
                Wypożyczalnia Samochodów Premium
            </h1>

            <p
                style={{
                    fontSize: "28px",
                    color: "#aaa",
                    marginTop: "20px"
                }}
            >
                Wynajmuj nowoczesne
                i luksusowe samochody
                szybko i wygodnie.
            </p>

            <Link to="/cars">

                <button
                    style={{
                        marginTop: "40px",
                        background: "white",
                        color: "black",
                        border: "none",
                        padding: "20px 40px",
                        borderRadius: "20px",
                        fontSize: "22px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Przeglądaj auta
                </button>

            </Link>

        </div>
    );
}

export default Home;