import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import Car from '../components/Car'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from '../components/Loader'

function Models() {
    const [cars, setCars] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true); // Start loading

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}cars/`);
                setCars(response.data);
            } catch (err) {
                toast.error(err.response.data.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();

    }, []);

    if (isLoading) return <Loader />
    return (
        <>
            <section className="models-section">
                <HeroPages name="Available Cars" />
                <div className="container">
                    <div className="car-data-container">
                        {cars && cars.length ? (
                            cars.map((car) => (
                                <Car key={car._id} carData={car} />
                            ))
                        ) : (
                            <h2>No cars Available</h2>
                        )}

                    </div>
                </div>
                <div className="book-banner">
                    <div className="book-banner__overlay"></div>
                    <div className="container">
                        <div className="text-content">
                            <h2 style={{color:"white"}}>Book a car by getting in touch with us</h2>
                            <span>
                                <i className="fa-solid fa-phone"></i>
                                <h3>(123) 456-7869</h3>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Models;
