import React, { useState } from "react";
import "./Message.css";

export default function Message() {
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
      const response = await fetch("api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Ошибка при отправке");
      }

      setIsSuccess(true);
      setPhone("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="Message__block success-message">
        <div className="container">
          <h1>Спасибо за заявку!</h1>
          <p>Наш менеджер свяжется с вами в течение 15 минут</p>
        </div>
      </div>
    );
  }

  return (
    <div className="Message__block">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1 className="m_mess">Запишитесь на бесплатный замер</h1>
          <div className="input__block">
            <label htmlFor="phone">Ваш номер телефона</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          <button type="submit" disabled={isSending}>
            {isSending ? "Отправка..." : "Записаться"}
          </button>
        </form>
      </div>
    </div>
  );
}
