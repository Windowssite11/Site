import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import PromotionPage from "./pages/PromotionPage";
import Fix from "./pages/Fix";
import ContactsPage from "./pages/ContactsPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/promotions" element={<PromotionPage />} />
          <Route path="/fix" element={<Fix />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
