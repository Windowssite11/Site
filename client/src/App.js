import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import PromotionPage from "./pages/PromotionPage";
import Fix from "./pages/Fix";
import ContactsPage from "./pages/ContactsPage";
import WindowSizes from "./pages/WindowSizes";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import TradeInPage from "./pages/TradeInPage";

export default function App() {
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
    <div>
      <BrowserRouter>
        <FloatingButton
          isOpen={isModalOpen}
          onOpen={handleOpenModal}
          onClose={handleCloseModal}
          discount={selectedDiscount}
        />

        <Routes>
          <Route path="/" element={<Home onDetailsClick={handleOpenModal} />} />
          <Route
            path="/promotions"
            element={<PromotionPage onDetailsClick={handleOpenModal} />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/fix" element={<Fix />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/window-sizes" element={<WindowSizes />} />
          <Route path="/TradeIn" element={<TradeInPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
