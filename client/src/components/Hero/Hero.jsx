import React from "react";
import "./Hero.css";
import img1 from "../../images/1.webp";

const Hero = () => {
  return (
    <section className="hero">
      <div className="black__bg"></div>
      <div className="container">
        <div className="hero__content">
          <img src={img1} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
