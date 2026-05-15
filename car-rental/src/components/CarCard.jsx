import { Link } from "react-router-dom";

export default function CarCard({
                                    car
                                }) {

    let images = [];

    try {

        images =
            typeof car.images === "string"
                ? JSON.parse(car.images)
                : car.images;

    } catch {

        images = [];
    }

    return (

        <div className="car-card">

            <img
                src={images[0]}
                alt={car.model}
                className="car-image"
            />

            <div className="car-content">

                <h2>
                    {car.brand} {car.model}
                </h2>

                <p>
                    Rocznik: {car.year}
                </p>

                <h3>
                    {car.price} zł / dzień
                </h3>

                <Link
                    to={`/cars/${car.id}`}
                >
                    <button>
                        Zobacz szczegóły
                    </button>
                </Link>
            </div>
        </div>
    );
}