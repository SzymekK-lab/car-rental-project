import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import AdminCars from "./pages/AdminCars";
import Worker from "./pages/Worker";
import Client from "./pages/Client";
import CarDetails from "./pages/CarDetails";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/cars"
                    element={<Cars />}
                />

                <Route
                    path="/cars/:id"
                    element={<CarDetails />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/admin"
                    element={<Admin />}
                />

                <Route
                    path="/admin/cars"
                    element={<AdminCars />}
                />

                <Route
                    path="/worker"
                    element={<Worker />}
                />

                <Route
                    path="/account"
                    element={<Client />}
                />

            </Routes>

            <Toaster position="top-center" />

        </BrowserRouter>
    );
}

export default App;