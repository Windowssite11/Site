import React from "react";
import "./Advantages.css";
import img2 from "../../images/garant.png";
import img3 from "../../images/expen.png";

const Advantages = () => {
  const advantages = [
    {
      icon: img2,
      title: "Гарантия 1 год",
      description: "Официальная гарантия на профиль и фурнитуру",
    },
    {
      icon: img3,
      title: "15 лет опыта",
      description: "Установили более 10 000 окон в Чите и области",
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
