import React from "react";
import "./SpecialDiscounts.css";
import img1 from "../../images/pens.jpg";
import img2 from "../../images/family.avif";

const SpecialDiscounts = ({ onDetailsClick }) => {
  const discounts = [
    {
      id: 1,
      title: "Скидка пенсионерам 7%",
      description:
        "При предъявлении пенсионного удостоверения вы получаете дополнительную скидку ко всем текущим акциям",
      image: img1,
    },
    {
      id: 2,
      title: "Скидка семьям с детьми 5%",
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
                <button
                  className="discount-button"
                  onClick={() => onDetailsClick(discount)}
                >
                  Заказать звонок
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialDiscounts;
