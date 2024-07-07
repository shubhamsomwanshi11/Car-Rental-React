import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaUser, FaCar, FaGasPump, FaCalendarAlt, FaTachometerAlt, FaSnowflake, FaCog, FaCalendarCheck, FaMoneyBillWave, FaShieldAlt, FaExclamationTriangle, FaInfoCircle, FaStar, FaPhone, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import BookCar from '../components/BookCar';
import { GiGearStickPattern } from 'react-icons/gi';
import HeroPages from '../components/HeroPages';
import Loader from '../components/Loader';
import './cardetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const carData = await axios.get(`${process.env.REACT_APP_BASE_URL}cars/${id}`);
        if (carData.data) {
          setCar(carData.data);
          const ownerData = await axios.get(`${process.env.REACT_APP_BASE_URL}users/${carData.data.owner}`);
          if (ownerData.data) setOwner(ownerData.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [id]);

  if (loading) return <Loader />;
  if (!car) return <div>No car data available</div>;
  if (!owner) return <div>No owner data available</div>;

  return (
    <section className="models-section">
      <HeroPages name="Car Name" />
      <div className="container">
        <div className="car-details-container">
          <div className="car-card">
            <div className="car-image-container">
              <img src={car.img} alt={car.modelName} className="car-image" />
            </div>
            <div className="car-details-content">
              <h1 className='car-category'> {car.modelName} {car.year}</h1>
              <div className="car-details">
                <div className="car-detail-item"><FaUser /> {car.seats}</div>
                <div className="car-detail-item"><FaCar /> {car.doors} doors</div>
                <div className="car-detail-item"><FaTachometerAlt /> {car.mileage}</div> {/* Corrected carDetails to car */}
                <div className="car-detail-item"><FaGasPump /> {car.fuel}</div>
                <div className="car-detail-item"><FaSnowflake /> {car.air}</div>
                <div className="car-detail-item"><GiGearStickPattern /> {car.transmission} Transmission</div>
              </div>
              <div className="price"> ₹{car.price}</div>
            </div>
          </div>
          <div className="last-info">
            <div className="owner-details-content">
              <h3>Owner Details</h3>
              <div className="owner-info">
                <div className="owner-card">
                  <div className="owner-image-container">
                    <img src={owner.avatar} alt="Owner" className="owner-image" />
                  </div>
                  <div>
                    <div className="owner-detail-item"><FaUser /> {owner.name}</div>
                    <div className="owner-detail-item"><FaPhone /> {owner.mobile}</div>
                    <div className="owner-detail-item"><FaEnvelope /> {owner.email}</div>
                    <div className="owner-detail-item"><FaEnvelope /> {owner.address}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='book-button'>
              <Popup
                trigger={<button className='book-now-button'>Book Now</button>} // Corrected class to className
                modal
                nested
              >
                {(close) => (
                  <div className="popup-content">
                    <button className="close-popup" onClick={close}>&times;</button>
                    <BookCar carData={car} />
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsPage;