import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function BookCar({ carData }) {
  const { currentUser } = useContext(userContext);
  const token = currentUser?.token;
  const [formData, setFormData] = useState({
    car: carData._id,
    owner: carData.owner,
    destination: 'Kolhapur',
    pickUp: '2024-07-08',
    drop: '2024-07-09',
    pickUpTime: '10:00 AM',
    dropTime: '12:00 PM',
    transactionId: ''
  });

  const amount = parseFloat(carData.price) * 100;
  const currency = "INR";
  const receiptId = `rcpt1`;

  const validateForm = async () => {
    const { destination, pickUp, drop, pickUpTime, dropTime } = formData;
    const validationErrors = [];

    if (!destination) {
      validationErrors.push('Destination is required.');
    }

    if (!pickUp) {
      validationErrors.push('Pick-up location is required.');
    }

    if (!drop) {
      validationErrors.push('Drop-off location is required.');
    }

    if (!pickUpTime) {
      validationErrors.push('Pick-up time is required.');
    }

    if (!dropTime) {
      validationErrors.push('Drop-off time is required.');
    }

    if (validationErrors.length === 0) {
      const moment = require('moment');

      const pickUpDateTime = moment(`${pickUp}T${pickUpTime}`, 'YYYY-MM-DDTHH:mm');
      const dropDateTime = moment(`${drop}T${dropTime}`, 'YYYY-MM-DDTHH:mm');
      const now = moment();

      if (pickUpDateTime.isBefore(now)) {
        validationErrors.push('Pick-up date and time cannot be in the past.');
      }

      if (dropDateTime.isBefore(now)) {
        validationErrors.push('Drop-off date and time cannot be in the past.');
      }

      if (dropDateTime.isSameOrBefore(pickUpDateTime)) {
        validationErrors.push('Drop-off date and time must be after pick-up date and time.');
      }
    }

    if (validationErrors.length > 0) {
      toast.error(validationErrors.join('\n'));
      return false;
    } else {
      return true;
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (await validateForm()) {
      try {
        // Create order
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}payment/create`, {
          method: "POST",
          body: JSON.stringify({
            amount,
            currency,
            receipt: receiptId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const order = await response.json();

        const options = {
          key: "rzp_test_NtRrXpF4ViPkMH",
          amount: amount,
          currency: currency,
          name: "Car Rental",
          description: "This is the payment.",
          image: "https://t3.ftcdn.net/jpg/02/56/94/74/360_F_256947432_mW9bJpGFdJo9kw9XovizaHcQI2NOVXc8.jpg",
          order_id: order.id,
          handler: async function (response) {
            console.log(response);

            if (response.razorpay_payment_id) {
              const updatedFormData = {
                ...formData,
                transactionId: response.razorpay_payment_id
              };
              setFormData(updatedFormData);
              confirmBooking(updatedFormData);
            } else {
              console.log("Payment failed or incomplete");
            }
          },
          prefill: {
            name: currentUser?.name,
            email: currentUser?.email,
            contact: currentUser?.mobile,
          },
          notes: {
            address: "",
          },
          theme: {
            color: "#f6223f",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      } catch (error) {
        console.error("Error during payment creation:", error);
      }
    }
  };

  const confirmBooking = async (updatedFormData) => {
    console.log(updatedFormData);
    const booking = await axios.post(`${process.env.REACT_APP_BASE_URL}booking/book`, updatedFormData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (booking.status === 201) {
      toast.success("Car booked successfully.");
      setFormData({
        car: carData._id,
        owner: carData.owner,
        destination: '',
        pickUp: '',
        drop: '',
        pickUpTime: '',
        dropTime: '',
        transactionId: ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>

              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
              </p>

              <form className="box-form">

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Destination<b>*</b>
                  </label>
                  <input
                    style={{ height: '100%' }}
                    name="destination"
                    placeholder="Goa"
                    value={formData.destination}
                    onChange={handleInputChange}
                    type="text"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up Date<b>*</b>
                  </label>
                  <input
                    name="pickUp"
                    value={formData.pickUp}
                    onChange={handleInputChange}
                    type="date"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up Time<b>*</b>
                  </label>
                  <input
                    name="pickUpTime"
                    value={formData.pickUpTime}
                    onChange={handleInputChange}
                    type="time"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Drop-off Date<b>*</b>
                  </label>
                  <input
                    name="drop"
                    value={formData.drop}
                    onChange={handleInputChange}
                    type="date"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Drop-off Time<b>*</b>
                  </label>
                  <input
                    name="dropTime"
                    value={formData.dropTime}
                    onChange={handleInputChange}
                    type="time"
                  ></input>
                </div>

              </form>

              <button onClick={paymentHandler}>
                Book Now
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default BookCar;
