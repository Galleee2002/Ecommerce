import React, { useState } from "react";
import "./navbar.scss";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logo: string;
  navItems: NavItem[];
  rightContent?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ logo, navItems, rightContent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <h1 className="navbar__logo">{logo}</h1>
        </div>

        <div
          className={`navbar__menu ${isMenuOpen ? "navbar__menu--active" : ""}`}
        >
          <ul className="navbar__nav">
            {navItems.map((item, index) => (
              <li key={index} className="navbar__item">
                <button
                  className="navbar__link"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar__right">
          {rightContent}
          <button
            className="navbar__toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
