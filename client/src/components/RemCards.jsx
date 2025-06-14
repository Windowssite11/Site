import React from "react";

import reg from "../images/reg.jpg";
import res from "../images/res.jpg";
import win from "../images/win.avif";
export default function RemCards() {
  return (
    <div className="__page">
      <h1 className="title">Ремонт окон и балконов в Чите</h1>
      <div className="cards">
        <div className="card">
          <img src={reg} alt="" />
          <h2>Ремонт и регулировка фурнитуры</h2>
        </div>
        <div className="card">
          <img src={res} alt="" />
          <h2>Замена резинового уплотнителя</h2>
        </div>
        <div className="card">
          <img src={win} alt="" />
          <h2>Демонтаж и замена стеклопакета</h2>
        </div>
      </div>
    </div>
  );
}
