import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WindowSizes.css";

const WindowSizes = () => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    width: "",
    height: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const standardSizes = [
    { id: 1, width: 500, height: 500 },
    { id: 2, width: 600, height: 600 },
    { id: 3, width: 700, height: 1200 },
    { id: 4, width: 750, height: 1250 },
    { id: 5, width: 800, height: 1200 },
    { id: 6, width: 800, height: 1250 },
    { id: 7, width: 850, height: 1250 },
    { id: 8, width: 900, height: 800 },
    { id: 9, width: 900, height: 900 },
    { id: 10, width: 900, height: 1000 },
    { id: 11, width: 1000, height: 800 },
    { id: 12, width: 1000, height: 900 },
    { id: 13, width: 1000, height: 1000 },
    { id: 14, width: 1100, height: 800 },
    { id: 15, width: 1100, height: 900 },
    { id: 16, width: 1100, height: 1000 },
    { id: 17, width: 1100, height: 1100 },
    { id: 18, width: 1100, height: 1200 },
    { id: 19, width: 1100, height: 1250 },
    { id: 20, width: 1100, height: 1300 },
    { id: 21, width: 1200, height: 800 },
    { id: 22, width: 1200, height: 900 },
    { id: 23, width: 1200, height: 1000 },
    { id: 24, width: 1260, height: 1300 },
    { id: 25, width: 1260, height: 1400 },
    { id: 26, width: 1300, height: 1500 },
    { id: 27, width: 1400, height: 1400 },
    { id: 28, width: 2050, height: 1300 },
    { id: 29, width: 2050, height: 1400 },
    { id: 30, width: "custom", height: "custom", name: "Нестандартный размер" },
  ];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    if (size.id !== 30) {
      setFormData({
        ...formData,
        width: size.width,
        height: size.height,
      });
    } else {
      setFormData({
        ...formData,
        width: "",
        height: "",
      });
    }
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
      const response = await fetch("/api/submit-window-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          size:
            selectedSize.id === 30
              ? `Нестандартный (${formData.width}×${formData.height} см)`
              : `${selectedSize.width}×${selectedSize.height} см`,
          width: formData.width,
          height: formData.height,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ошибка при отправке формы");
      }

      alert(
        "Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
      );
      navigate("/products");
    } catch (error) {
      setSubmitError(
        error.message ||
          "Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="window-sizes-page">
      <h1>Выберите размер окна</h1>

      <div className="size-cards">
        {standardSizes.map((size) => (
          <div
            key={size.id}
            className={`size-card ${
              selectedSize?.id === size.id ? "selected" : ""
            }`}
            onClick={() => handleSizeSelect(size)}
          >
            {size.id === 30 ? (
              <div className="custom-size">
                <span>Нестандартный размер</span>
              </div>
            ) : (
              <>
                <div className="size-dimensions">
                  {size.width} × {size.height} см
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedSize && (
        <form className="size-form" onSubmit={handleSubmit}>
          {selectedSize.id === 30 ? (
            <h2>Вы выбрали: Нестандартный размер</h2>
          ) : (
            <h2>
              Вы выбрали: {selectedSize.width} × {selectedSize.height} см
            </h2>
          )}

          {selectedSize.id === 30 && (
            <div className="custom-size-inputs">
              <div className="form-group">
                <label>Ширина (см)</label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleInputChange}
                  required
                  min="50"
                  max="5000"
                  placeholder="Укажите ширину"
                />
              </div>
              <div className="form-group">
                <label>Высота (см)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                  min="50"
                  max="5000"
                  placeholder="Укажите высоту"
                />
              </div>
            </div>
          )}

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
            <label>
              Дополнительные пожелания (тип открывания, цвет и т.д.)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="3"
              placeholder="Укажите дополнительные параметры..."
            />
          </div>

          {submitError && <div className="form-error">{submitError}</div>}

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
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
      )}
    </div>
  );
};

export default WindowSizes;
