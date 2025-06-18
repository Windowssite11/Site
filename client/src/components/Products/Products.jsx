import React, { useState } from "react";
import "./Products.css";
import img1 from "../../images/lite.webp";
import img2 from "../../images/norm.webp";
import img3 from "../../images/biz.webp";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const products = [
    {
      id: 1,
      title: "Эконом",
      subtitle: "ПРОФИЛЬНАЯ СИСТЕМА Nordprof 58 ММ",
      description1: "Для домов, квартир и наружных помещений",
      description2: "3 камеры",
      description3: "Стеклопакет до 32 мм",
      image: img1,
    },
    {
      id: 2,
      title: "Стандарт",
      subtitle: "ПРОФИЛЬНАЯ СИСТЕМА Nordprof 70 ММ",
      description1: "Для домов, квартир, детских садов, школ, больниц",
      description2: "5 камер",
      description3: "Стеклопакет до 40 мм",
      image: img2,
    },
    {
      id: 3,
      title: "Бизнес",
      subtitle: "ПРОФИЛЬНАЯ СИСТЕМА DECOR 70 ММ",
      description1: "Для домов, квартир, детских садов, школ, больниц",
      description2: "5 камер",
      description3: "Цветовой профиль - Графит, Антрацит, Темный дуб",
      image: img3,
    },
  ];

  const openModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", phone: "" });
    setSubmitStatus(null);
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

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          product: currentProduct.title,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "" });
      } else {
        throw new Error("Ошибка отправки формы");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Ошибка:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="products" id="products">
      <div className="container">
        <h2 className="section-title">Выберите свое окно</h2>
        <div className="products__grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-card__image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-card__content">
                <h3>{product.title}</h3>
                <h4>{product.subtitle}</h4>
                <p> {product.description1}</p>
                <p>{product.description2}</p>
                <p>{product.description3}</p>
                <button onClick={() => openModal(product)}>
                  Узнать стоимость
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Узнать стоимость: {currentProduct?.title}</h3>

            {submitStatus === "success" ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <h4 style={{ color: "#2a7d2e" }}>Спасибо за заявку!</h4>
                <p>Наш менеджер свяжется с вами в ближайшее время.</p>
                <button
                  onClick={closeModal}
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#2a7d2e",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Ваше имя</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Номер телефона</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Отправить"}
                  </button>
                  <button
                    type="button"
                    className="close-btn"
                    onClick={closeModal}
                  >
                    Закрыть
                  </button>
                </div>
                {submitStatus === "error" && (
                  <p style={{ color: "red", marginTop: "10px" }}>
                    Ошибка при отправке. Пожалуйста, попробуйте позже.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
