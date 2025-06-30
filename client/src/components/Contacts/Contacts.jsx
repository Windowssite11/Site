import React from "react";
import "./Contacts.css";

const Contacts = () => {
  // Координаты для адреса: Московская обл., г. Химки, ул. Заводская, д. 15
  const mapUrl =
    "https://yandex.ru/map-widget/v1/?ll=113.495221%2C52.037982&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjA1Njg0NxJm0KDQvtGB0YHQuNGPLCDQl9Cw0LHQsNC50LrQsNC70YzRgdC60LjQuSDQutGA0LDQuSwg0KfQuNGC0LAsINGD0LvQuNGG0LAg0JrRg9GA0L3QsNGC0L7QstGB0LrQvtCz0L4sIDI1IgoNd_3iQhXzJlBC&z=18";
  return (
    <section className="contacts-section">
      <div className="container">
        <h2 className="section-title">Наши контакты</h2>

        <div className="contacts-grid">
          <div className="contacts-info">
            <div className="contact-item">
              <h3>Адрес производства</h3>
              <p>Чита, Офис Ямаровская 3, Курнатовского 25 бутик 80</p>
              <a
                href=" https://yandex.ru/maps/68/chita/house/ulitsa_kurnatovskogo_25/ZUgFaANpTEUDVEJvYWJxcnRjYAg=/?ll=113.495221%2C52.037982&utm_medium=mapframe&utm_source=maps&z=18"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                Открыть в Яндекс.Картах
              </a>
            </div>

            {/* Остальные контактные блоки без изменений */}
            <div className="contact-item">
              <h3>Телефон</h3>
              <a href="tel:+79148087755">+7 914 808 77 55</a>
              <p>Ежедневно с 9:00 до 21:00</p>
            </div>

            <div className="contact-item">
              <h3>Email</h3>
              <a href="mailto:windowssite11@gmail.com">
                windowssite11@gmail.com
              </a>
            </div>
          </div>

          <div className="contacts-map">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Карта с расположением производства"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
