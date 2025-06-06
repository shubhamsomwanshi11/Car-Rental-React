import React, { useContext, useEffect, useState } from 'react';
import HeroPages from "../components/HeroPages";
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AddCar/AddCar.scss';
const AddCar = () => {
  const [carInfo, setCarInfo] = useState({
    modelName: '',
    year: '',
    color: '',
    price: '',
    mileage: '',
    name: '',
    mark: '',
    doors: '',
    air: '',
    transmission: '',
    fuel: '',
  });

  const { currentUser } = useContext(userContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        toast.error("Unauthorized.");
        navigate('/login');
      }, 1500);
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'price', 'modelName', 'mark', 'year', 'doors', 'air', 'transmission', 'fuel'];
    for (let field of requiredFields) {
      if (!carInfo[field]) {
        toast.error("Please fill in all fields.");
        return;
      }
    }
    if (!photo) {
      toast.error("Please upload a car image.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      for (let key in carInfo) {
        formData.append(key, carInfo[key]);
      }
      formData.append('img', photo);

      await axios.post(`${process.env.REACT_APP_BASE_URL}cars/register`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setCarInfo({
        modelName: '',
        year: '',
        color: '',
        price: '',
        mileage: '',
        name: '',
        mark: '',
        doors: '',
        air: '',
        transmission: '',
        fuel: '',
      });
      setPhoto(null);
      toast.success("Car registered successfully.");
      navigate('/');
    } catch (err) {
      toast.error("An error occurred.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <section className="contact-page">
      <HeroPages name="Add Car" />
      <div className="container">
        <div className="contact-div">
          <div className="contact-div__text">
            <h2>Want to list your car?</h2>
            <p>
              Please provide all necessary car details and upload an image. Ensure the data is accurate for the best experience.
            </p>
            <a href="/"><i className="fa-solid fa-phone"></i>&nbsp; (123) 456-7869</a>
            <a href="/"><i className="fa-solid fa-envelope"></i>&nbsp; support@carrental.com</a>
            <a href="/"><i className="fa-solid fa-location-dot"></i>&nbsp; Pune, India</a>
          </div>

          <div className="contact-div__form">
            <form onSubmit={handleSubmit} className="add-car-form">

              {/* Row 1 */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name <b>*</b></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={carInfo.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mark">Mark <b>*</b></label>
                  <input
                    type="text"
                    id="mark"
                    name="mark"
                    value={carInfo.mark}
                    onChange={handleChange}
                    placeholder="Enter mark"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="modelName">Model Name <b>*</b></label>
                  <input
                    type="text"
                    id="modelName"
                    name="modelName"
                    value={carInfo.modelName}
                    onChange={handleChange}
                    placeholder="Enter model name"
                    required
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="year">Year <b>*</b></label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={carInfo.year}
                    onChange={handleChange}
                    placeholder="Enter year"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="color">Color <b>*</b></label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={carInfo.color}
                    onChange={handleChange}
                    placeholder="Enter color"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price <b>*</b></label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={carInfo.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mileage">Mileage <b>*</b></label>
                  <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    value={carInfo.mileage}
                    onChange={handleChange}
                    placeholder="Enter mileage"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="doors">Doors <b>*</b></label>
                  <input
                    type="text"
                    id="doors"
                    name="doors"
                    value={carInfo.doors}
                    onChange={handleChange}
                    placeholder="Enter doors"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="air">Air <b>*</b></label>
                  <input
                    type="text"
                    id="air"
                    name="air"
                    value={carInfo.air}
                    onChange={handleChange}
                    placeholder="Enter air"
                    required
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="transmission">Transmission <b>*</b></label>
                  <input
                    type="text"
                    id="transmission"
                    name="transmission"
                    value={carInfo.transmission}
                    onChange={handleChange}
                    placeholder="Enter transmission"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fuel">Fuel <b>*</b></label>
                  <input
                    type="text"
                    id="fuel"
                    name="fuel"
                    value={carInfo.fuel}
                    onChange={handleChange}
                    placeholder="Enter fuel"
                    required
                  />
                </div>

                {/* Empty div for alignment */}
                <div className="form-group" style={{ visibility: "hidden" }}></div>
              </div>

              {/* Upload photo alone row */}
              <div className="form-row">
                <div className="form-group" style={{ flex: "1 1 100%" }}>
                  <label htmlFor="photo">Upload Car Image <b>*</b></label>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    required
                  />
                  {photo && (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Preview"
                      style={{ maxWidth: '100%', marginTop: '10px' }}
                    />
                  )}
                </div>
              </div>

              <button type="submit">
                <i className="fa-solid fa-car-side"></i>&nbsp; Add Car
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="book-banner">
        <div className="book-banner__overlay"></div>
        <div className="container">
          <div className="text-content">
            <h2 style={{ color: "white" }}>List your car by filling out the form above</h2>
            <span>
              <i className="fa-solid fa-phone"></i>
              <h3>(123) 456-7869</h3>
            </span>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default AddCar;
