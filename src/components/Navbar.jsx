import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo/logo.png";
import { userContext } from "../context/userContext";
import { useContext } from "react";
import { useState} from "react";

function Navbar() {
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const { currentUser } = useContext(userContext);
  const token = currentUser?.token;
  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            {token &&
              <li>
                <Link onClick={openNav} to="/add-car">
                  Add Car
                </Link>
              </li>
            }
            {
              token &&
              <li>
                <Link onClick={openNav} to="/history">
                  History
                </Link>
              </li>
            }
            {
              token &&
              <li>
                <Link onClick={openNav} to="/car-bookings">
                  Car Bookings
                </Link>
              </li>
            }
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>


            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/available">
                Available Cars
              </Link>
            </li>
          </ul>
        </div>

        {/* desktop */}

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>


            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link className="testi-link" to="/available">
                Available Cars
              </Link>
            </li>
            {
              token && <li>
                {" "}
                <Link className="contact-link" to="/add-car">
                  Add Car
                </Link>
              </li>
            }
            {
              token && <li>
                {" "}
                <Link className="contact-link" to="/history">
                  History
                </Link>
              </li>
            }
            {
              token && <li>
                {" "}
                <Link className="contact-link" to="/car-bookings">
                  Car Bookings
                </Link>
              </li>
            }
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {
            token ?
              < div className="navbar__buttons">
                <Link className="navbar__buttons__register" to="/logout">
                  Logout
                </Link>
              </div>
              :
              <div className="navbar__buttons">
                <Link className="navbar__buttons__sign-in" to="/login">
                  Sign In
                </Link>
                <Link className="navbar__buttons__register" to="/register">
                  Register
                </Link>
              </div>
          }


          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav >
    </>
  );
}

export default Navbar;
