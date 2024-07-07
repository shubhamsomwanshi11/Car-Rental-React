import React from 'react'
import { Link } from 'react-router-dom';
import './Cardata.css';
import { useContext } from 'react';
import { userContext } from '../context/userContext'
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
        <div className="car-item">
            <img src={carData.img} alt={carData.model} className="car-image" />
            <h2>{carData.name}</h2>
            <p><strong>Price:</strong> ₹{carData.price}</p>
            <p><strong>Year:</strong> {carData.year}</p>
            <p><strong>Doors:</strong> {carData.doors}</p>
            <p><strong>Transmission:</strong> {carData.transmission}</p>
            <p><strong>Fuel:</strong> {carData.fuel}</p>
            <div style={buttonContainerStyle}>
                {token && (
                    <Popup
                        trigger={<button type="button" style={buttonStyle}>Book Now</button>}
                        modal
                        nested
                    >
                        {(close) => (
                            <div className="popup-content">
                                <button className="close-popup" onClick={close}>&times;</button>
                                <BookCar carData={carData} />
                            </div>
                        )}
                    </Popup>
                )}
                <Link to={`/cars/${carData._id}`} style={{ ...buttonStyle, backgroundColor: 'skyblue' }} >
                    View Details
                </Link>
            </div>
        </div >
    )
}

export default Car