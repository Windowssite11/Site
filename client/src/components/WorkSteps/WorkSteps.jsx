import React from "react";
import {
  FaPhoneAlt,
  FaRulerCombined,
  FaFileContract,
  FaTools,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import "./WorkSteps.css";

const WorkSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Заявка или звонок",
      description: "На сайте или звонок",
      icon: <FaPhoneAlt className="step-icon" />,
    },
    {
      id: 2,
      title: "Замер",
      description: "В удобное для вас время",
      icon: <FaRulerCombined className="step-icon" />,
    },
    {
      id: 3,
      title: "Расчет",
      description: "Расчет стоимости окон",
      icon: <FaFileContract className="step-icon" />,
    },
    {
      id: 4,
      title: "Доставка",
      description: "Быстрая доставка",
      icon: <TbTruckDelivery className="step-icon" />,
    },
    {
      id: 5,
      title: "Монтаж",
      description: "Аккуратная установка с гарантией качества",
      icon: <FaTools className="step-icon" />,
    },
  ];

  return (
    <section className="work-steps-section">
      <div className="container">
        <h2 className="section-title">Схема работы</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-item" key={step.id}>
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <div className="icon-wrapper">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-arrow">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2a7d2e"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSteps;
