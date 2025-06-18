import React from "react";
import Header from "../components/Header/Header.jsx";
import img from "../images/main-window.jpg";
import img1 from "../images/pens.jpg";
import img2 from "../images/family.avif";
export default function PromotionPage() {
  const discounts = [
    {
      id: 1,
      title: "Скидка пенсионерам 15%",
      description:
        "При предъявлении пенсионного удостоверения вы получаете дополнительную скидку ко всем текущим акциям",
      image: img1,
    },
    {
      id: 2,
      title: "Скидка семьям с детьми 15%",
      description:
        "Для семей с двумя и более детьми предоставляем специальную скидку на все виды остекления",
      image: img2,
    },
  ];
  return (
    <>
      <Header />
      <div className="__page">
        <section className="promo-banner-section">
          <div className="container">
            <h1 className="title">Акции</h1>
            <div className="promo-banner">
              <div className="promo-banner__content">
                <div className="promo-banner__tag">Акция</div>
                <h2 className="promo-banner__title">Экономия до 30% на окна</h2>
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
      <section className="special-discounts">
        <div className="container">
          <div className="discounts-row">
            {discounts.map((discount) => (
              <div className="discount-card" key={discount.id}>
                <div className="discount-image">
                  <img src={discount.image} alt={discount.title} />
                </div>
                <div className="discount-content">
                  <h3>{discount.title}</h3>
                  <p>{discount.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
