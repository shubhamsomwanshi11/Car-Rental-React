import React, { useState, useEffect, useContext } from 'react';
import './History.css';
import { userContext } from '../context/userContext';
import HeroPages from "../components/HeroPages";
import { ToastContainer } from 'react-toastify';
import Loader from "../components/Loader";
import CarB from '../components/CarB';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookingHistory = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(userContext);
    const token = currentUser?.token;

    const [isLoading, setIsLoading] = useState(false);
    const [bookingHistory, setBookingHistory] = useState([]);

    const removeBooking = (id) => {
        setBookingHistory(bookingHistory.filter(booking => booking.id !== id));
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}booking/getUserBooking`, { headers: { 'Authorization': `Bearer ${token}` } });
                if (response.data) {
                    setBookingHistory(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token, navigate]);

    if (isLoading) return <Loader />;

    return (
        <div>
            <HeroPages name="Booking History" />
            <div className="booking-history-container">
                {bookingHistory.length ?
                    bookingHistory.map((booking) => (
                        <div key={booking._id} className="booking-item">
                            <div className="booking-details">
                                <CarB carId={booking.car} />
                                <p><strong>Pickup : </strong> {booking.pickUp}</p>
                                <p><strong>DropOff Date & Time:</strong> {booking.drop}</p>
                            </div>
                        </div>
                    )) : <h2>No bookings yet.</h2>}
            </div>
            <ToastContainer />
        </div>
    );
};

export default BookingHistory;
