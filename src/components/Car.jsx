// src/components/Car.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/userContext';
import Popup from 'reactjs-popup';
import BookCar from './BookCar';

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '18px',
};

const buttonStyle = {
  flex: '1',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  marginRight: '10px',
};

const Car = ({ carData }) => {
  const { currentUser } = useContext(userContext);
  const token = currentUser?.token;

  return (
    <div className="models-div__box" style={{ padding: '10px' }}>
      <div className="models-div__box__img">
        <img src={carData.img} alt="car_img" style={{ width: '100%', height: 'auto' }} />
        <div className="models-div__box__descr">
          <div className="models-div__box__descr__name-price">
            <div className="models-div__box__descr__name-price__name">
              <p>{carData.name}</p>
              <span>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>
            </div>
            <div className="models-div__box__descr__name-price__price">
              <h4>₹{carData.price}</h4>
              <p>per day</p>
            </div>
          </div>

   <div
  className="models-div__box__descr__name-price__details"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px 20px",
    marginTop: "15px",
    fontSize: "15px"
  }}
>
  <span><strong>Doors:</strong> {carData.doors}</span>
  <span><strong>Transmission:</strong> {carData.transmission}</span>

  <span><strong>Fuel:</strong> {carData.fuel}</span>
  <span><strong>Year:</strong> {carData.year}</span>

  <span><strong>Air:</strong> {carData.air}</span>
  <span><strong>Brand:</strong> {carData.mark}</span>
</div>



          <div style={buttonContainerStyle}>
            {token && (
              <Popup
                trigger={<button type="button" style={buttonStyle}>Book Now</button>}
                modal
                nested
              >
                {(close) => (
                  <div className="popup-content">
                    <button className="close-popup" onClick={close}></button>
                    <BookCar carData={carData} />
                  </div>
                )}
              </Popup>
            )}

            <Link 
              to={`/cars/${carData._id}`} 
              style={{ ...buttonStyle, backgroundColor: 'skyblue', marginRight: 0 }}
            >
              View Details
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Car;
