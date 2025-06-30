import React from "react";
import Header from "../components/Header/Header.jsx";
import img from "../images/main-window.jpg";
import SpecialDiscounts from "../components/AdditionalDiscounts/SpecialDiscounts.jsx";

export default function PromotionPage({ onDetailsClick }) {
  return (
    <>
      <Header />
      <div className="all">
        <div className="__page">
          <section className="promo-banner-section">
            <div className="container">
              <h1 className="title">Акции</h1>
              <div className="promo-banner">
                <div className="promo-banner__content">
                  <div className="promo-banner__tag">Акция</div>
                  <h2 className="promo-banner__title">
                    Экономия до 30% на окна
                  </h2>
                  <p className="promo-banner__text">
                    Успей сэкономить на ремонте!
                  </p>
                  <div className="promo-banner__timer">
                    <span>Скидки 30% на окна и балконное остекление</span>
                  </div>
                </div>
                <div className="promo-banner__image">
                  <img src={img} alt="Акция на остекление" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <SpecialDiscounts onDetailsClick={onDetailsClick} />
      </div>
    </>
  );
}
