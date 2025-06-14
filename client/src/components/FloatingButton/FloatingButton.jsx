import React, { useState } from "react";
import "./FloatingButton.css";
import { FaPhone } from "react-icons/fa";

const FloatingButton = ({ isOpen, onOpen, onClose, discount }) => {
  const [phone, setPhone] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) {
      setError("Пожалуйста, введите номер телефона");
      return;
    }

    setIsSending(true);
    setError("");

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          discount: discount ? discount.title : null,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Ошибка при отправке");
      }

      setIsSuccess(true);
      setPhone("");
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <button
        className="floating-button"
        onClick={onOpen}
        aria-label="Заказать звонок"
      >
        <FaPhone className="floating-button-icon" />
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Закрыть"
            >
              &times;
            </button>

            {isSuccess ? (
              <div className="success-message">
                <h3>Спасибо за заявку!</h3>
                <p>Наш менеджер свяжется с вами в течение 15 минут</p>
              </div>
            ) : (
              <>
                <h3>Оставьте заявку</h3>
                <p>Мы перезвоним вам в удобное время</p>

                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="tel"
                      placeholder="Ваш номер телефона"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    {error && <span className="error-message">{error}</span>}
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSending}
                  >
                    {isSending ? "Отправка..." : "Отправить"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButton;
