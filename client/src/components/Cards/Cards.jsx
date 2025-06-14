import React from "react";
import "./Cards.css";

import balcon from "../../images/balcon.jpg";
import okna from "../../images/okna.jpg";
import fix from "../../images/fix.avif";
export default function Cards() {
  return (
    <div className="__page">
      <h1 className="title">Продукция</h1>
      <div className="cards">
        <div className="card">
          <img src={okna} alt="" />
          <h2>Оконные изделия</h2>
          <p>
            Окна из ПВХ и алюминиевого профиля любых форм, размеров и цветов
          </p>
        </div>
        <div className="card">
          <img src={balcon} alt="" />
          <h2>Балконные изделия</h2>
          <p>
            Балконное остекление из ПВХ, теплого или холодного алюминиевого
            профиля
          </p>
        </div>
        <div className="card">
          <img src={fix} alt="" />
          <h2>Ремонт</h2>
          <p>Ремонт всех наших изделий</p>
        </div>
      </div>
    </div>
  );
}
