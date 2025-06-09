import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../context/userContext';
import axios from 'axios';
import HeroPages from '../components/HeroPages';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(userContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userData = { email, password };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}users/login`, userData);
      const user = response.data;

      if (response.status === 200 && user) {
        setCurrentUser(user);
        toast.success("Login Successful");
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      <section className="contact-page">
        <HeroPages name="Login" />
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Welcome Back!</h2>
              <p>
                Enter your credentials to log into your account and continue your journey.
              </p>
              <a href="/">
                <i className="fa-solid fa-phone"></i>&nbsp; (123) 456-7869
              </a>
              <a href="/">
                <i className="fa-solid fa-envelope"></i>&nbsp; support@carrental.com
              </a>
              <a href="/">
                <i className="fa-solid fa-location-dot"></i>&nbsp; Belgrade, Serbia
              </a>
            </div>
            <div className="contact-div__form">
              <form onSubmit={handleSubmit}>
                <label>
                  Email <b>*</b>
                </label>
                <input
                  type="email"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label>
                  Password <b>*</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit">
                  <i className="fa-solid fa-right-to-bracket"></i>&nbsp; Login
                </button>
              </form>
              <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                Don't have an account?{' '}
                <a href="/register" style={{ color: 'green' }}>Register</a>
              </p>
            </div>
          </div>
        </div>

        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2 style={{ color: 'white' }}>Need Help?</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-left" />
      {loading && <Loader/>}
     
    </>
  );
};

export default Login;
