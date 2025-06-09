import React, { useState, useEffect, useContext } from 'react';
import '../styles/History/history.scss';
import { userContext } from '../context/userContext';
import HeroPages from "../components/HeroPages";
import { ToastContainer } from 'react-toastify';
import Loader from "../components/Loader";
import CarB from '../components/CarB';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const BookingHistory = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(userContext);
  const token = currentUser?.token;

  const [isLoading, setIsLoading] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}booking/getUserBooking`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
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
    <>
      <section className="testimonial-page">
        <HeroPages name="Booking History" />

        <div className="container">
          <div className="booking-history-wrapper">
            {bookingHistory.length ? (
              bookingHistory.map((booking) => (
                <div key={booking._id} className="booking-card">
                  <div className="car-wrapper">
                    <CarB carId={booking.car} />
                  </div>
                  <div className="booking-info">
                    <p><strong>Pickup:</strong> {booking.pickUp}</p>
                    <p><strong>DropOff:</strong> {booking.drop}</p>
                  </div>
                </div>
              ))
            ) : (
              <h2 style={{ textAlign: 'center' }}>No bookings yet.</h2>
            )}
          </div>
        </div>

        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2 style={{ color: "white" }}>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>

        <Footer />
      </section>

      <ToastContainer />
    </>
  );
};

export default BookingHistory;
