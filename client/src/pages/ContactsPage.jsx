import React from "react";
import "./ContactsPage.css";
import Header from "../components/Header/Header";

const ContactsPage = () => {
  const handleCallClick = () => {
    window.location.href = "tel:+79148087755";
  };

  return (
    <>
      <Header />
      <div className="contacts-page-p">
        {/* Секция контактов - теперь сверху на мобильных */}
        <div className="contacts-section-p">
          <div className="contacts-card-p">
            <h2>Наши контакты</h2>

            <div className="contact-item-p">
              <h3>Адрес офиса</h3>
              <p>Офис Ямаровская 3, Курнатовского 25 бутик 80</p>
            </div>

            <div className="contact-item-p">
              <h3>Телефоны</h3>
              <p>
                <a href="tel:+79148086655">+7 914 808 66 55</a>
              </p>
              <p>
                <a href="tel:+79148087755">+7 914 808 77 55</a>
              </p>
              <p>
                <a href="tel:+79145566555">+7 914 556 65 55</a>
              </p>
            </div>

            <div className="contact-item-p">
              <h3>Email</h3>
              <p>
                <a href="mailto:info@okna-zavodkbe.ru">info@okna-zavodkbe.ru</a>
              </p>
            </div>

            <div className="contact-item-p">
              <h3>График работы</h3>
              <p>Пн-Пт: 9:00 - 20:00</p>
              <p>Сб-Вс: 10:00 - 18:00</p>
            </div>

            <button className="callback-button-p" onClick={handleCallClick}>
              Позвонить
            </button>
          </div>
        </div>

        {/* Секция карты - теперь снизу на мобильных */}
        <div className="map-section-p">
          <iframe
            className="contacts-map-p"
            src="https://yandex.ru/map-widget/v1/?ll=113.495221%2C52.037982&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjA1Njg0NxJm0KDQvtGB0YHQuNGPLCDQl9Cw0LHQsNC50LrQsNC70YzRgdC60LjQuSDQutGA0LDQuSwg0KfQuNGC0LAsINGD0LvQuNGG0LAg0JrRg9GA0L3QsNGC0L7QstGB0LrQvtCz0L4sIDI1IgoNd_3iQhXzJlBC&z=18"
            title="Карта с расположением офиса"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactsPage;
