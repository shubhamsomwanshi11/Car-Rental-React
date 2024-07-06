import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CarB = ({ carId }) => {
    const [car, setCar] = useState([]);
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}cars/${carId}`)
                if (response.data)
                    setCar(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCars();
    })
    return (
        <div>
            <div className="car-image">
                <img src={car.img} alt={`${car.brand} ${car.model}`} />
            </div>
            <p><strong>Brand:</strong> {car.name}</p>
            <p><strong>Model:</strong> {car.modelName}</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Price:</strong> {car.price}</p>
        </div>
    )
}

export default CarB