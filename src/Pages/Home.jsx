import Hero from "../components/Hero";
import BookCar from "../components/BookCar";
import PlanTrip from "../components/PlanTrip";
import Banner from "../components/Banner";
import ChooseUs from "../components/ChooseUs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      {/* <BookCar /> */}
      <PlanTrip />
      <Banner />
      <ChooseUs />
      <Faq />
    </>
  );
}

export default Home;
