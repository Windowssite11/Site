import React from "react";
import "./OurWorks.css";
import work1 from "../../images/1TTGjINbyH8.jpg";
import work2 from "../../images/AY1Iub9nKB4.jpg";
import work3 from "../../images/B6AXY8Sn22Q.jpg";
import work4 from "../../images/GEFquBl5ofU.jpg";
import work5 from "../../images/Xf2VaVbmego.jpg";
import work6 from "../../images/e3vTiezqtcg.jpg";
import work7 from "../../images/nC3C57lG7RA.jpg";

const OurWorks = () => {
  const works = [
    { id: 1, image: work1 },
    { id: 2, image: work2 },
    { id: 3, image: work3 },
    { id: 4, image: work4 },
    { id: 5, image: work5 },
    { id: 6, image: work6 },
    { id: 7, image: work7 },
  ];

  return (
    <section className="our-works">
      <div className="container">
        <h2 className="section-title">Наши работы</h2>
        <p className="section-subtitle">
          Реализованные проекты с гарантией качества
        </p>

        <div className="works-grid">
          {works.map((work) => (
            <div key={work.id} className="work-card">
              <div className="work-image-container">
                <img src={work.image} alt="img" className="work-image" />
                <div className="work-overlay"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorks;
