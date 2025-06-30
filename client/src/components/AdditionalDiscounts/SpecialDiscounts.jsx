import React from "react";
import "./SpecialDiscounts.css";
import { useNavigate } from "react-router-dom";
import img1 from "../../images/TradeIn.webp";
import img2 from "../../images/family.avif";

const SpecialDiscounts = ({ onDetailsClick }) => {
  const navigate = useNavigate();
  const discounts = [
    {
      id: 1,
      title: "Trade-in",
      description:
        "Trade-in система, где Вам не придётся тратить силы и время для обновления старых окон",
      image: img1,
    },
    {
      id: 2,
      title: "Скидка семьям с детьми",
      description:
        "Для семей с двумя и более детьми предоставляем специальную скидку на все виды остекления",
      image: img2,
    },
  ];

  return (
    <section className="special-discounts">
      <div className="container">
        <h2 className="section-title">Специальные скидки</h2>

        <div className="discounts-row">
          {discounts.map((discount) => (
            <div className="discount-card" key={discount.id}>
              <div className="discount-image">
                <img src={discount.image} alt={discount.title} />
              </div>
              <div className="discount-content">
                <h3>{discount.title}</h3>
                <p>{discount.description}</p>
                {discount.id === 1 ? (
                  <button
                    className="discount-button"
                    onClick={() => navigate("/TradeIn")}
                  >
                    Узнать больше
                  </button>
                ) : (
                  <button
                    className="discount-button"
                    onClick={() => onDetailsClick(discount)}
                  >
                    Заказать звонок
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialDiscounts;
