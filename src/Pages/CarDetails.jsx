import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FaUser, FaCar, FaGasPump, FaTachometerAlt,
  FaSnowflake, FaPhone, FaEnvelope
} from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';
import HeroPages from '../components/HeroPages';
import Popup from 'reactjs-popup';
import BookCar from '../components/BookCar';
import Loader from '../components/Loader';
import AboutMain from "../images/about/about-main.jpg";
import PlanTrip from '../components/PlanTrip';
import './cardetails.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCarData = async () => {
      setLoading(true);
      try {
        const carRes = await axios.get(`${process.env.REACT_APP_BASE_URL}cars/${id}`);
        if (carRes.data) {
          setCar(carRes.data);
          const ownerRes = await axios.get(`${process.env.REACT_APP_BASE_URL}users/${carRes.data.owner}`);
          if (ownerRes.data) setOwner(ownerRes.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarData();
  }, [id]);

  if (loading) return <Loader />;
  if (!car || !owner) return <div className="text-center py-10">Data not available.</div>;

  return (
    <>
      <section className="about-page">
        <HeroPages name={car.modelName} />
        <div className="container">
          <div className="about-main">
            <img className="about-main__img" src={car.img || AboutMain} alt="car" />
            <div className="about-main__text">
             
           <p>
  {car.modelName} ({car.year}) by {car.mark}, features {car.doors} doors, runs on {car.fuel.toLowerCase()} fuel with {car.transmission.toLowerCase()} transmission, includes {car.air.toLowerCase() === 'yes' ? 'air conditioning' : 'no air conditioning'}, available at ₹{car.price} per hour.
</p>



              <div className="car-details">
                <div className="car-detail-item"><FaCar /> {car.doors} Doors</div>
                <div className="car-detail-item"><FaTachometerAlt /> {car.modelName}</div>
                <div className="car-detail-item"><FaGasPump /> {car.fuel}</div>
                <div className="car-detail-item"><FaSnowflake /> {car.air}</div>
                <div className="car-detail-item"><GiGearStickPattern /> {car.transmission}</div>
                  <div className="car-detail-item">₹ {car.price} per hour</div>
              </div>

            
             

              <div className="owner-details mt-8">
                <h3>Owner Details</h3>
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
          </div>
        </div>
      <PlanTrip />

         
      </section>
    </>
  );
};

export default CarDetailsPage;
