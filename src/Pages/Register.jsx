import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import HeroPages from "../components/HeroPages";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    mobile: '',
    avatar: null,
    address: '',
    age: '',
  });

  const [verified, setVerified] = useState(false);
  const [showVerify, setShowVerified] = useState(false);
  const [otp, setOTP] = useState();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Age validation
    if (name === 'age' && value !== '' && parseInt(value) <= 18) {
      setErrors({ ...errors, age: 'Age must be greater than 18' });
    } else {
      setErrors({ ...errors, age: '' });
    }

    if (name === 'avatar') {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) { // Limit to 2MB
        setErrors({ ...errors, avatar: 'File size must be under 2MB' });
      } else if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors({ ...errors, avatar: 'Only JPEG or PNG files are allowed' });
      } else {
        setErrors({ ...errors, avatar: '' });
        setFormData({ ...formData, avatar: file });
      }
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success('Registration successful!');
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const handleNext = () => {
    if (step === 1) {
      const step1Fields = ['name', 'email', 'age', 'mobile'];
      const newErrors = {};
      step1Fields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = 'This field is required';
        }
      });
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        setStep(2);
      }
    }
  };

  const handleMailVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}email/verifyOTP`, { email: formData.email, otp });
      if (response.status === 200) {
        toast.success('Email verified successfully.');
        setVerified(true);
        setShowVerified(true);
      } else {
        toast.error(response.data.message || 'Failed to verify email.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred.');
    }
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}email/sendOTP`, { email: formData.email });
    if (response.status == '201') {
      setShowVerified(true);
      toast.success('Email Sent Successfully.');
    }
    else {
      toast.error('An error occured.');
    }
  }

  const handleBack = () => {
    setStep(1);
  };

  const registerUser = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setErrors({});

    // Create a new FormData object
    const data = new FormData();

    // Append all form data to the FormData object
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}users/register`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setIsLoading(false);
      if (response && response.data) {
        toast.success('Registration successful!');
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } else {
        toast.error('Could not register user. Please try again later.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  if (isLoading) return <Loader />

  return (
    <section className="contact-page">
      <HeroPages name="Register" />
      <div className="container">
        <div className="contact-div">
          <div className="contact-div__text">
            <h2>Join Our Community</h2>
            <p>
              Create your account to access our car rental services. Please provide accurate information for the best experience.
            </p>
            <a href="/"><i className="fa-solid fa-phone"></i>&nbsp; (123) 456-7869</a>
            <a href="/"><i className="fa-solid fa-envelope"></i>&nbsp; support@carrental.com</a>
            <a href="/"><i className="fa-solid fa-location-dot"></i>&nbsp; Pune, India</a>
          </div>

          <div className="contact-div__form">
            <form onSubmit={handleSubmit} className="add-car-form">
              {step === 1 && (
                <>
                  {/* Row 1 - Name and Email */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name <b>*</b></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                      {errors.name && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.name}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email <b>*</b></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        disabled={verified}
                        required
                      />
                      {errors.email && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.email}</p>}
                    </div>

                    {/* Email Verification Button */}
                    <div className="form-group">
                      {!showVerify && (
                        <button 
                          type="button"
                          onClick={sendOTP}
                          style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            marginTop: '25px'
                          }}
                        >
                          Verify Email
                        </button>
                      )}
                    </div>
                  </div>

                  {/* OTP Verification Row */}
                  {!verified && showVerify && (
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="otp">Enter OTP <b>*</b></label>
                        <input
                          type="text"
                          id="otp"
                          onChange={(e) => setOTP(e.target.value)}
                          placeholder="Enter OTP"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <button 
                          type="button"
                          onClick={handleMailVerification}
                          style={{
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            marginTop: '25px'
                          }}
                        >
                          Verify OTP
                        </button>
                      </div>

                      {/* Empty div for alignment */}
                      <div className="form-group" style={{ visibility: "hidden" }}></div>
                    </div>
                  )}

                  {/* Row 2 - Mobile and Age */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="mobile">Mobile <b>*</b></label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                        required
                      />
                      {errors.mobile && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.mobile}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="age">Age <b>*</b></label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        required
                      />
                      {errors.age && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.age}</p>}
                    </div>

                    {/* Empty div for alignment */}
                    <div className="form-group" style={{ visibility: "hidden" }}></div>
                  </div>

                  {verified && (
                    <button type="button" onClick={handleNext}>
                      <i className="fa-solid fa-arrow-right"></i>&nbsp; Next Step
                    </button>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  {/* Row 1 - Address */}
                  <div className="form-row">
                    <div className="form-group" style={{ flex: "1 1 100%" }}>
                      <label htmlFor="address">Address <b>*</b></label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        required
                      />
                      {errors.address && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.address}</p>}
                    </div>
                  </div>

                  {/* Row 2 - Password and Confirm Password */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="password">Password <b>*</b></label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                      {errors.password && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.password}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password2">Confirm Password <b>*</b></label>
                      <input
                        type="password"
                        id="password2"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                      />
                      {errors.password2 && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.password2}</p>}
                    </div>

                    {/* Empty div for alignment */}
                    <div className="form-group" style={{ visibility: "hidden" }}></div>
                  </div>

                  {/* Row 3 - Avatar Upload */}
                  <div className="form-row">
                    <div className="form-group" style={{ flex: "1 1 100%" }}>
                      <label htmlFor="avatar">Profile Picture</label>
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleChange}
                        accept="image/jpeg,image/png"
                      />
                      {errors.avatar && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.avatar}</p>}
                      {formData.avatar && (
                        <img
                          src={URL.createObjectURL(formData.avatar)}
                          alt="Avatar Preview"
                          style={{ maxWidth: '100px', marginTop: '10px', borderRadius: '8px' }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button 
                      type="button" 
                      onClick={handleBack}
                      style={{
                        flex: '1',
                        padding: '12px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
                    </button>
                    <button 
                      type="submit" 
                      onClick={registerUser}
                      style={{
                        flex: '2',
                        padding: '12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      <i className="fa-solid fa-user-plus"></i>&nbsp; Complete Registration
                    </button>
                  </div>
                </>
              )}
            </form>

            <p style={{ paddingTop: '20px', textAlign: 'center', fontSize: '16px' }}>
              Already have an account? <a style={{ color: '#007bff', textDecoration: 'none' }} href="/login">Login here</a>
            </p>
          </div>
        </div>
      </div>

      <div className="book-banner">
        <div className="book-banner__overlay"></div>
        <div className="container">
          <div className="text-content">
            <h2 style={{ color: "white" }}>Join us today and start your journey</h2>
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

export default Register;