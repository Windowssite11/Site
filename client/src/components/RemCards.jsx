import React, { useState } from "react";
import "./RemCards.css";

import reg from "../images/reg.jpg";
import res from "../images/res.jpg";
import win from "../images/win.avif";

export default function RemCards() {
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const services = [
    {
      id: 1,
      title: "Ремонт и регулировка фурнитуры",
      description: "Профессиональная регулировка и ремонт оконной фурнитуры",
      image: reg,
    },
    {
      id: 2,
      title: "Замена резинового уплотнителя",
      description:
        "Замена изношенного уплотнителя на новые качественные материалы",
      image: res,
    },
    {
      id: 3,
      title: "Демонтаж и замена стеклопакета",
      description: "Полная замена стеклопакета с гарантией качества работ",
      image: win,
    },
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!formData.name || !formData.phone) {
        throw new Error("Имя и телефон обязательны для заполнения");
      }

      if (!selectedService) {
        throw new Error("Пожалуйста, выберите тип ремонта");
      }

      const response = await fetch("/api/submit-repair", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: selectedService.title,
          message: formData.message,
          date: new Date().toLocaleString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка сервера");
      }

      alert(
        "Ваша заявка на ремонт успешно отправлена! Мы свяжемся с вами в ближайшее время."
      );
      setFormData({ name: "", phone: "", email: "", message: "" });
      setSelectedService(null);
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      setSubmitError(
        error.message ||
          "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="__page">
      <h1 className="title">Ремонт окон и балконов в Чите</h1>
      <div className="cards">
        {services.map((service) => (
          <div
            key={service.id}
            className={`card ${
              selectedService?.id === service.id ? "selected" : ""
            }`}
            onClick={() => handleServiceSelect(service)}
          >
            <img src={service.image} alt={service.title} />
            <div className="card-content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="repair-form-container">
          <form className="repair-form" onSubmit={handleSubmit}>
            <h3>Заявка на: {selectedService.title}</h3>

            <div className="form-group">
              <label>Ваше имя *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Иван Иванов"
              />
            </div>

            <div className="form-group">
              <label>Телефон *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@mail.com"
              />
            </div>

            <div className="form-group">
              <label>Описание проблемы</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="Опишите проблему подробнее..."
              />
            </div>

            {submitError && <div className="form-error">{submitError}</div>}

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Отправка...
                </>
              ) : (
                "Отправить заявку"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
