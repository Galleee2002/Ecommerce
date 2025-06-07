import React from "react";
import "./footer.scss";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  const footerClasses = ["footer", className].filter(Boolean).join(" ");

  return (
    <footer className={footerClasses}>
      <div className="footer__container">
       
        <div className="footer__content">
      
          <div className="footer__brand">
            <h3 className="footer__brand-title">FUERADECONTEXTO</h3>
            <p className="footer__brand-tagline">Moda que rompe esquemas</p>
            <p className="footer__brand-description">
              Creamos piezas únicas que desafían las tendencias convencionales,
              para personas que no temen expresar su autenticidad.
            </p>
          </div>

        
          <div className="footer__nav">
            <div className="footer__nav-group">
              <h4 className="footer__nav-title">Navegación</h4>
              <ul className="footer__nav-list">
                <li>
                  <a href="#inicio" className="footer__nav-link">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#colecciones" className="footer__nav-link">
                    Colecciones
                  </a>
                </li>
                <li>
                  <a href="#nosotros" className="footer__nav-link">
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="footer__nav-link">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <h4 className="footer__nav-title">Soporte</h4>
              <ul className="footer__nav-list">
                <li>
                  <a href="#" className="footer__nav-link">
                    Guía de tallas
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__nav-link">
                    Envíos
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__nav-link">
                    Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__nav-link">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <h4 className="footer__nav-title">Legal</h4>
              <ul className="footer__nav-list">
                <li>
                  <a href="#" className="footer__nav-link">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__nav-link">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__nav-link">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="footer__contact">
            <h4 className="footer__contact-title">Conecta con nosotros</h4>
            <div className="footer__contact-info">
              <p className="footer__contact-item">
                <span className="footer__contact-icon">📧</span>
                info@fueradecontexto.com
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">📱</span>
                +54 11 1234-5678
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">📍</span>
                Buenos Aires, Argentina
              </p>
            </div>

            <div className="footer__social">
              <a href="#" className="footer__social-link">
                <span>Instagram</span>
              </a>
              <a href="#" className="footer__social-link">
                <span>Facebook</span>
              </a>
              <a href="#" className="footer__social-link">
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider"></div>

        {/* Bottom section */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear}{" "}
            <span className="footer__copyright-brand">FUERADECONTEXTO</span>.
            Todos los derechos reservados.
          </p>

          <div className="footer__credits">
            <p className="footer__credits-text">
              Diseñado con <span className="footer__heart">♥</span> en Buenos
              Aires
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
