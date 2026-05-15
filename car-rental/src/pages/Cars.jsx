import {
    useEffect,
    useState
} from "react";

import CarCard from
        "../components/CarCard";

export default function Cars() {

    const [cars, setCars] =
        useState([]);

    useEffect(() => {

        fetch(
            "http://localhost/car-rental-api/getCars.php"
        )
            .then(res => res.json())
            .then(data => {

                setCars(data);
            });

    }, []);

    return (

        <div className="cars-page">

            <h1>
                Dostępne samochody
            </h1>

            <div className="cars-grid">

                {cars.map(car => (

                    <CarCard
                        key={car.id}
                        car={car}
                    />
                ))}

            </div>
        </div>
    );
}