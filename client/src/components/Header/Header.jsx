import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaPhoneAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../images/5375118457202406721.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">
          <img src={logo} alt="Окна КБЕ" />
        </div>

        {/* Десктопное меню */}
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className="nav-item"
                exact
                activeClassName="active"
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="nav-item"
                activeClassName="active"
              >
                Продукция
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/promotions"
                className="nav-item"
                activeClassName="active"
              >
                Акции
              </NavLink>
            </li>
            <li>
              <NavLink to="/fix" className="nav-item" activeClassName="active">
                Ремонт
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className="nav-item"
                activeClassName="active"
              >
                Контакты
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__contacts">
          <FaPhoneAlt />
          <a href="tel:+79148087755">
            <span>+7 914 808-77-55</span>
          </a>
          <a href="tel:+79148086655">
            <span>+7 914 808-66-55</span>
          </a>
          <a href="tel:5566555">
            <span>556655</span>
          </a>
        </div>

        {/* Бургер-меню */}
        <div
          className={`burger-menu ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Меню"
        >
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              className="nav-item"
              exact
              activeClassName="active"
              onClick={toggleMenu}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="nav-item"
              activeClassName="active"
              onClick={toggleMenu}
            >
              Продукция
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/promotions"
              className="nav-item"
              activeClassName="active"
              onClick={toggleMenu}
            >
              Акции
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fix"
              className="nav-item"
              activeClassName="active"
              onClick={toggleMenu}
            >
              Ремонт
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacts"
              className="nav-item"
              activeClassName="active"
              onClick={toggleMenu}
            >
              Контакты
            </NavLink>
          </li>
        </ul>

        <div className="mobile-contacts">
          <a href="tel:+79148087755">
            <FaPhoneAlt />
            <span>+7 914 808-77-55</span>
          </a>
          <a href="tel:+79148086655">
            <FaPhoneAlt />
            <span>+7 914 808-66-55</span>
          </a>
          <a href="tel:5566555">
            <FaPhoneAlt />
            <span>556655</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
