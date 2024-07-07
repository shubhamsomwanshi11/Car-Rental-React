import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCar from './Pages/AddCar'
import Contact from "./Pages/Contact";
import Login from './Pages/Login'
import Register from './Pages/Register'
import Logout from './Pages/Logout'
import Available from './Pages/Available'
import BookingHistory from './Pages/BookingHistory'
import Layout from './components/Layout'
import UserProvider from './context/userContext'
import CarBooking from "./Pages/CarBooking";
import Cars from "./Pages/Cars";
import CarDetailsPage from "./Pages/CarDetails.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout /></UserProvider>,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: < About /> },
      { path: "contact", element: < Contact /> },
      { path: "login", element: < Login /> },
      { path: "register", element: < Register /> },
      { path: "available", element: < Available /> },
      { path: "add-car", element: < AddCar /> },
      { path: "logout", element: < Logout /> },
      { path: "car-bookings", element: < CarBooking /> },
      { path: "history", element: < BookingHistory /> },
      { path: "cars", element: < Cars /> },
      { path: "cars/:id", element: < CarDetailsPage /> },
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
