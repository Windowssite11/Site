import React, { useState } from "react";
import Header from "../components/Header/Header.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Products from "../components/Products/Products.jsx";
import Promotions from "../components/Promotions/Promotions.jsx";
import Advantages from "../components/Advantages/Advantages.jsx";
import WorkSteps from "../components/WorkSteps/WorkSteps.jsx";
import Message from "../components/Message/Message.jsx";
import Contacts from "../components/Contacts/Contacts.jsx";
import SpecialDiscounts from "../components/AdditionalDiscounts/SpecialDiscounts.jsx";
import FloatingButton from "../components/FloatingButton/FloatingButton.jsx";
import "../App.css";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const handleOpenModal = (discount = null) => {
    setSelectedDiscount(discount);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDiscount(null);
  };

  return (
    <div className="app">
      <Header />
      <Hero />
      <WorkSteps />
      <Products />
      <Message />
      <Promotions />
      <Advantages />
      <SpecialDiscounts onDetailsClick={handleOpenModal} />
      <Contacts />
      <FloatingButton
        isOpen={isModalOpen}
        onOpen={() => handleOpenModal()}
        onClose={handleCloseModal}
        discount={selectedDiscount}
      />
    </div>
  );
}

export default Home;
