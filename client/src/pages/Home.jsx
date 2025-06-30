import React from "react";
import Header from "../components/Header/Header.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Products from "../components/Products/Products.jsx";
import Promotions from "../components/Promotions/Promotions.jsx";
import Advantages from "../components/Advantages/Advantages.jsx";
import WorkSteps from "../components/WorkSteps/WorkSteps.jsx";
import Message from "../components/Message/Message.jsx";
import Contacts from "../components/Contacts/Contacts.jsx";
import SpecialDiscounts from "../components/AdditionalDiscounts/SpecialDiscounts.jsx";
import OurWorks from "../components/OurWorks/OurWorks.jsx";
import "../App.css";

function Home({ onDetailsClick }) {
  return (
    <div className="app">
      <Header />
      <Hero />
      <WorkSteps />
      <Products />
      <Message />
      <Promotions />
      <Advantages />
      <SpecialDiscounts onDetailsClick={onDetailsClick} />
      <Contacts />
      <OurWorks />
    </div>
  );
}

export default Home;
