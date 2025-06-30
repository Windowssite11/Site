import React, { useState, useEffect, useRef } from "react";
import "./ContactsPage.css";
import Header from "../components/Header/Header";

const offices = [
  {
    id: 1,
    coords: [52.037982, 113.495221], // Широта, долгота
    address: "Курнатовского 25 бутик 80",
    markerColor: "red",
  },
  {
    id: 2,
    coords: [52.039, 113.497],
    address: "Ямаровская 3",
    markerColor: "blue",
  },
];

const ContactsPage = () => {
  const [selectedOffice, setSelectedOffice] = useState(null);
  const iframeRef = useRef(null);

  // Данные об офисах

  // Центральная точка между всеми офисами
  const centerCoords = offices.reduce(
    (acc, office) => {
      return [
        acc[0] + office.coords[0] / offices.length,
        acc[1] + office.coords[1] / offices.length,
      ];
    },
    [0, 0]
  );

  // Обработчик клика по адресу
  const handleAddressClick = (office) => {
    setSelectedOffice(office);
    sendMessageToMap({
      type: "centerMap",
      coords: office.coords,
      zoom: 17,
    });
  };

  // Отправка сообщения в iframe с картой
  const sendMessageToMap = (message) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(message, "*");
    }
  };

  // Обработчик сообщений от карты
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "markerClick") {
        const office = offices.find((o) => o.id === event.data.id);
        setSelectedOffice(office);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Генерация URL для iframe
  const getMapUrl = () => {
    const markersParam = offices
      .map(
        (office) =>
          `${office.id},${office.coords.join(",")},${
            office.markerColor
          },${encodeURIComponent(office.address)}`
      )
      .join("|");

    return `/map.html?markers=${markersParam}&center=${centerCoords.join(",")}`;
  };

  return (
    <>
      <Header />
      <div className="contacts-page-p">
        {/* Секция контактов */}
        <div className="contacts-section-p">
          <div className="contacts-card-p">
            <h2>Наши контакты</h2>

            <div className="contact-item-p">
              <h3>Адреса офисов</h3>
              {offices.map((office) => (
                <div
                  key={office.id}
                  className={`address-item ${
                    selectedOffice?.id === office.id ? "selected" : ""
                  }`}
                  onClick={() => handleAddressClick(office)}
                >
                  <span
                    className="marker"
                    style={{ backgroundColor: office.markerColor }}
                  ></span>
                  <div>
                    <p className="address-text">{office.address}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-item-p">
              <h3>Телефоны</h3>
              <p>
                <a href="tel:+79148086655">+79148086655</a>
              </p>
              <p>
                <a href="tel:+79148087755">+79148087755</a>
              </p>
              <p>
                <a href="tel:5566555">556655</a>
              </p>
            </div>

            <div className="contact-item-p">
              <h3>Email</h3>
              <p>
                <a href="mailto:windowssite11@gmail.com">
                  windowssite11@gmail.com
                </a>
              </p>
            </div>

            <div className="contact-item-p">
              <h3>График работы</h3>
              <p>Пн-Пт: 9:00 - 20:00</p>
              <p>Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
        </div>

        {/* Секция карты */}
        <div className="map-section-p">
          <iframe
            ref={iframeRef}
            src={getMapUrl()}
            className="contacts-map-p"
            title="Карта офисов"
            allowFullScreen
          />

          {/* Подсказка с выбранным офисом */}
          {selectedOffice && (
            <div className="map-tooltip">
              <div className="tooltip-content">
                <h4>{selectedOffice.address}</h4>
                <a href={`tel:${selectedOffice.phone}`} className="call-button">
                  Позвонить
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactsPage;
