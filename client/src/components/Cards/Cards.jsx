import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cards.css";

import balcon from "../../images/balcon.jpg";
import okna from "../../images/okna.jpg";
import fix from "../../images/fix.avif";

export default function Cards() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const products = [
    {
      id: 1,
      title: "Оконные изделия",
      description: "Готовые окна со склада. Узнать стоимость и наличие",
      image: okna,
      isWindow: true,
    },
    {
      id: 2,
      title: "Балконные изделия",
      description:
        "Балконное остекление из ПВХ, теплого или холодного алюминиевого профиля",
      image: balcon,
      isWindow: false,
    },
    {
      id: 3,
      title: "Ремонт",
      description: "Ремонт всех наших изделий",
      image: fix,
      isWindow: false,
    },
  ];

  const handleProductClick = (product) => {
    if (product.isWindow) {
      navigate("/window-sizes");
    } else {
      setSelectedProduct(product.title);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
    setSubmitError(null);
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
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          product: selectedProduct,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке формы");
      }

      alert("Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      handleCloseModal();
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
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
      <h1 className="title">Продукция</h1>
      <div className="cards">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <div className="card-content">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <button
                className="card-button"
                onClick={() => handleProductClick(product)}
              >
                {product.isWindow ? "Выбрать размер" : "Оставить заявку"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно для неоконных продуктов */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>
              ×
            </button>
            <h3 className="modal-title">Заявка на {selectedProduct}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ваше имя</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Дополнительная информация</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              {submitError && (
                <div
                  style={{
                    color: "red",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  {submitError}
                </div>
              )}
              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
