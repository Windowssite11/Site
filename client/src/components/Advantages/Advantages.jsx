import React from "react";
import "./Advantages.css";
import img1 from "../../images/proiz.png";
import img2 from "../../images/garant.png";
import img3 from "../../images/expen.png";
import img4 from "../../images/num.png";

const Advantages = () => {
  const advantages = [
    {
      icon: img1,
      title: "Собственное производство",
      description: "Изготавливаем окна на современных немецких линиях",
    },
    {
      icon: img2,
      title: "Гарантия 10 лет",
      description: "Официальная гарантия на профиль и фурнитуру",
    },
    {
      icon: img3,
      title: "15 лет опыта",
      description: "Установили более 25 000 окон в Москве и области",
    },
    {
      icon: img4,
      title: "Цены от производителя",
      description: "Без посредников и накруток",
    },
  ];

  return (
    <section className="advantages-section">
      <div className="container">
        <h2 className="section-title">Почему клиенты выбирают нас</h2>

        <div className="advantages-grid">
          {advantages.map((item, index) => (
            <div className="advantage-card" key={index}>
              <div className="advantage-icon">
                <img src={item.icon} alt={item.title} />
              </div>
              <h3 className="advantage-title">{item.title}</h3>
              <p className="advantage-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
