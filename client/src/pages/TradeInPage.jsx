import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import "./TradeInPage.css";
import tradeInImage from "../images/TradeIn.webp";

const TradeInPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="trade-in-page">
        <section className="trade-in-hero">
          <div className="container">
            <h1>Trade-in программа</h1>
            <p className="subtitle">Обменяйте старые окна на новые с выгодой</p>
          </div>
        </section>

        <section className="trade-in-content">
          <div className="container">
            <div className="trade-in-grid">
              <div className="trade-in-info">
                <h2>Выгода при использовании услуги Trade-in?</h2>
                <div className="steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3>
                        Вам не придется тратить деньги и силы, чтобы избавится
                        от старых окон
                      </h3>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h3>
                        Вывоз ПВХ окна (б/у) с объекта заказчика осуществляется
                        бесплатно и будет производиться в день монтажа нового
                        ПВХ окна
                      </h3>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h3>
                        Экономия денежных средств, за счёт замены старого окна
                        на новое
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="trade-in-image">
                <img src={tradeInImage} alt="Trade-in программа" />
              </div>
            </div>

            <div className="benefits">
              <h2>Стоимость ПВХ окон б/у от 1000 руб.</h2>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <h3>Двухстворчатое</h3>
                  <p>1500/1500</p>
                </div>
                <div className="benefit-card">
                  <h3>Трёхстворчатое</h3>
                  <p>1500/2100</p>
                </div>
                <div className="benefit-card">
                  <h3>Балконный блок</h3>
                  <p>2100/2100</p>
                </div>
              </div>
              <p>
                <b>Примечание</b> <br /> На ПВХ остекления и ПВХ окна свыше
                представленных габаритов услуга trade-in не предоставляется
              </p>
            </div>

            <div className="cta-section">
              <h2>Готовы обменять свои окна?</h2>
              <p>
                Оставьте заявку и наш менеджер свяжется с вами для расчета
                скидки
              </p>
              <button
                className="cta-button"
                onClick={() => navigate("/contacts")}
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TradeInPage;
