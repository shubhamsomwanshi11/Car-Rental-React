import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';


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

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    },
    registerContainer: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '500px',
      margin: '120px 20px',

    },
    title: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '35px',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontSize: '16px',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '5px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      marginTop: '10px',
    },
    buttonV: {
      width: '50%',
      marginLeft: '10px',
      marginTop: '30px',
      height: '45px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px'
    },
    buttonSecondary: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      marginTop: '10px',
    },
    '@media (max-width: 768px)': {
      registerContainer: {
        padding: '20px',
      },
      title: {
        fontSize: '28px',
      },
      button: {
        fontSize: '16px',
      },
      buttonSecondary: {
        fontSize: '16px',
      },
    },
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
    <div style={styles.container}>
      <div style={styles.registerContainer}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              {['name', 'email'].map((field) => (
                <div className="form-group" style={styles.formGroup} key={field}>
                  <label htmlFor={field} style={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    style={styles.input}
                    disabled={field === 'email' && verified} // Disable email field if verified is true
                  />
                  {errors[field] && <p style={styles.error}>{errors[field]}</p>}
                </div>
              ))}

              {
                !showVerify && <button style={{ ...styles.buttonV, marginTop: '0px', marginBottom: '20px' }} onClick={sendOTP} >Verify Mail</button>
              }

              {!verified && showVerify && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div className='form-group'>
                  <label style={styles.label}>
                    Enter OTP :
                  </label>
                  <input
                    type="text"
                    style={styles.input}
                    onChange={(e) => setOTP(e.target.value)}
                    placeholder="Enter OTP"
                  />
                </div>
                <button style={styles.buttonV} onClick={handleMailVerification} >Verify Mail</button>
              </div>}

              {['mobile', 'age'].map((field) => (
                <div className="form-group" style={styles.formGroup} key={field}>
                  <label htmlFor={field} style={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'age' ? 'number' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  {errors[field] && <p style={styles.error}>{errors[field]}</p>}
                </div>
              ))}
              {verified && <button type="button" style={styles.button} onClick={handleNext}>
                Next
              </button>}
            </>
          )}
          {step === 2 && (
            <>
              {['address', 'password', 'password2'].map((field) => (
                <div className="form-group" style={styles.formGroup} key={field}>
                  <label htmlFor={field} style={styles.label}>
                    {field == 'password2' ? ' Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'address' ? 'text' : 'password'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  {field === 'age' && errors.age && <p style={styles.error}>{errors.age}</p>}
                </div>
              ))}
              <div className="form-group" style={styles.formGroup}>
                <label htmlFor="avatar" style={styles.label}>Avatar</label>
                <input
                  type="file"
                  className="form-control"
                  id="avatar"
                  name="avatar"
                  onChange={handleChange}
                  style={styles.input}
                />
                {errors.avatar && <p style={styles.error}>{errors.avatar}</p>}
              </div>

              <button type="button" style={styles.buttonSecondary} onClick={handleBack}>
                Back
              </button>
              <button type="submit" style={styles.button} onClick={registerUser}>
                Register
              </button>
            </>
          )}
        </form>
        <p style={{ paddingTop: '12px', textAlign: 'center' }}>Already have an account ? <a style={{ color: 'green' }} href="/login">Login</a></p>
      </div>
      <ToastContainer />

    </div >
  );
};

export default Register;
