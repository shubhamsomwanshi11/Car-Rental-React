import React, { useContext, useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import HeroPages from "../components/HeroPages";
import Loader from '../components/Loader'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
    const [carInfo, setCarInfo] = useState({
        modelName: '',
        year: '',
        color: '',
        price: '',
        mileage: '',
        name: '',
        doors: '',
        air: '',
        transmission: '',
        fuel: '',
    });
    const { currentUser } = useContext(userContext);
    const token = currentUser?.token;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setTimeout(() => {
                toast.error("Unauthorized.");
                navigate('/login');
            }, 1500);
        }
    }, [token, navigate]);

    const [photo, setPhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, price, modelName, mark, year, doors, air, transmission, fuel } = carInfo;
        if (!name || !price || !modelName || !mark || !year || !doors || !air || !transmission || !fuel || !photo) {
            toast.error("Fill in all fields.");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('modelName', modelName);
            formData.append('mark', mark);
            formData.append('year', year);
            formData.append('doors', doors);
            formData.append('air', air);
            formData.append('transmission', transmission);
            formData.append('fuel', fuel);
            formData.append('img', photo);

            await axios.post(`${process.env.REACT_APP_BASE_URL}cars/register`, formData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });

            setCarInfo({
                modelName: '',
                year: '',
                color: '',
                price: '',
                mileage: '',
                name: '',
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
        }
        setIsLoading(false);
    };


    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f0f0',
            fontFamily: 'Arial, sans-serif',
        },
        formContainer: {
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '800px',
            margin: ' 20px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // Two columns for larger screens
            gap: '20px',
        },
        title: {
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '35px',
        },
        formGroup: {
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
        },
        input: {
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            marginTop: '5px',
            width: '100%',
        },
        uploadArea: {
            border: '2px dashed #ccc',
            borderRadius: '4px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            minHeight: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gridColumn: 'span 2',
        },
        uploadIcon: {
            fontSize: '24px',
            marginBottom: '10px',
        },
        uploadedPhoto: {
            maxWidth: '100%',
            maxHeight: '200px',
            marginTop: '10px',
            borderRadius: '4px',
        },
        buttonContainer: {
            gridColumn: 'span 2',
            textAlign: 'center',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '10px',
        },
        '@media (max-width: 768px)': {
            formContainer: {
                gridTemplateColumns: '1fr',
                padding: '20px',
            },
            title: {
                fontSize: '28px',
            },
            button: {
                fontSize: '16px',
            },
        },
    };

    if (isLoading) return <Loader />;
    return (
        <div>
            <HeroPages name="Add Car" />
            <div style={styles.container}>
                <form onSubmit={handleSubmit} style={styles.formContainer} className="add-car-form">
                    <div>
                        {['name', 'year', 'color', 'price', 'mark'].map((field) => (
                            <div className="form-group" style={styles.formGroup} key={field}>
                                <label htmlFor={field} style={styles.label}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    type={field === 'year' || field === 'price' ? 'number' : 'text'}
                                    id={field}
                                    name={field}
                                    value={carInfo[field]}
                                    onChange={handleChange}
                                    required
                                    style={styles.input}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="modelName" style={styles.label}>Model Name</label>
                            <input
                                type="text"
                                id="modelName"
                                name="modelName"
                                value={carInfo.modelName}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="doors" style={styles.label}>Doors</label>
                            <input
                                type="text"
                                id="doors"
                                name="doors"
                                value={carInfo.doors}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="air" style={styles.label}>Air</label>
                            <input
                                type="text"
                                id="air"
                                name="air"
                                value={carInfo.air}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="transmission" style={styles.label}>Transmission</label>
                            <input
                                type="text"
                                id="transmission"
                                name="transmission"
                                value={carInfo.transmission}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                        <div className="form-group" style={styles.formGroup}>
                            <label htmlFor="fuel" style={styles.label}>Fuel</label>
                            <input
                                type="text"
                                id="fuel"
                                name="fuel"
                                value={carInfo.fuel}
                                onChange={handleChange}
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.uploadArea}>
                        <label htmlFor="photo" style={{ marginBottom: '10px' }}>
                            {photo ? 'Photo Uploaded' : 'Drag & Drop or Click to Upload Photo'}
                        </label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <label htmlFor="photo" style={{ cursor: 'pointer' }}>
                                <FaCloudUploadAlt style={styles.uploadIcon} />
                            </label>
                            {photo && (
                                <img src={URL.createObjectURL(photo)} alt="Uploaded" style={styles.uploadedPhoto} />
                            )}
                        </div>
                    </div>
                    <div style={styles.buttonContainer}>
                        <button type="submit" style={styles.button}>Add Car</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddCar;
