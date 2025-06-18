import React, { useState, useEffect } from "react";
import "./SaleBanner.css";
import sale from "../../images/sale.webp";

const JuneSaleBanner = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const endOfJune = new Date(now.getFullYear(), 5, 30, 23, 59, 59); // 30 июня текущего года
    const difference = endOfJune - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div className="june-sale-banner">
      <div className="container">
        <div className="banner-content">
          <div className="banner-text">
            <div className="sale-tag">Акция</div>
            <h2>Только в Июне скидка 50% на самовывоз</h2>
            <p>
              Успейте забрать свои окна по специальной цене до 30.06.
              {new Date().getFullYear()}
            </p>
            <div className="timer">
              <span>До конца акции осталось:</span>
              <div className="timer-digits">
                {timeLeft.days} дней {formatTime(timeLeft.hours)}:
                {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>
          <div className="banner-image">
            <img src={sale} alt="Скидка 50% на самовывоз" />
          </div>
          <button className="banner-button">
            Узнать подробности
            <span className="button-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JuneSaleBanner;
