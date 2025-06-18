# Código del Proyecto

## src\App.test.tsx

```
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

## src\App.tsx

```
import React, { useState } from "react";
import "./App.scss";
import Button from "./components/button-component/Button";
import HeroMinimal from "./components/hero-section/hero";
import Navbar from "./components/navbar/Navbar";
import Contact from "./components/contact-section/Contact";
import Footer from "./components/footer-section/Footer";
import ProductSection from "./components/product-section/ProductSection";
import Cart, { CartIcon } from "./components/cart/Cart";
import {
  CartProvider,
  useCart,
  Product,
  getProductImage,
} from "./contexts/CartContext";
import { WishlistProvider, useWishlist } from "./contexts/WishlistContext";

const AppContent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const productos: Product[] = [
    {
      id: 1,
      name: "Remera Lisa",
      price: 21000,
      originalPrice: 30000,
      image: getProductImage(1, "#ffffff"),
      category: "Camisas",
      colors: [
        "#ffffff",
        "#000000",
        "#6b7280",
        "#8b5cf6",
        "#059669",
        "#1e3a8a",
        "#ec4899",
        "#dc2626",
        "#ea580c",
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 2,
      name: "Hoodie Liso",
      price: 44000,
      image: getProductImage(2, "#ffffff"),
      category: "Pantalones",
      colors: [
        "#ffffff",
        "#000000",
        "#6b7280",
        "#8b5cf6",
        "#059669",
        "#1e3a8a",
        "#ec4899",
        "#dc2626",
        "#ea580c",
      ],
      sizes: ["28", "30", "32", "34", "36", "38"],
    },
    {
      id: 3,
      name: "Polo Clásico",
      price: 35000,
      image: getProductImage(3, "#ffffff"),
      category: "Polos",
      colors: [
        "#ffffff",
        "#000000",
        "#6b7280",
        "#8b5cf6",
        "#059669",
        "#1e3a8a",
        "#ec4899",
        "#dc2626",
        "#ea580c",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 4,
      name: "Chaqueta Denim",
      price: 85000,
      originalPrice: 110000,
      image: getProductImage(4, "#ffffff"),
      category: "Chaquetas",
      colors: [
        "#ffffff",
        "#000000",
        "#6b7280",
        "#8b5cf6",
        "#059669",
        "#1e3a8a",
        "#ec4899",
        "#dc2626",
        "#ea580c",
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 5,
      name: "Sneakers Classic",
      price: 95000,
      image: getProductImage(5, "#ffffff"),
      category: "Calzado",
      colors: [
        "#ffffff",
        "#000000",
        "#6b7280",
        "#8b5cf6",
        "#059669",
        "#1e3a8a",
        "#ec4899",
        "#dc2626",
        "#ea580c",
      ],
      sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
    },
    {
      id: 6,
      name: "Camiseta Premium",
      price: 28000,
      image: getProductImage(6, "#ffffff"),
      category: "Camisetas",
      colors: [
        "#ffffff",
        "#000000",
        "#6b7280",
        "#8b5cf6",
        "#059669",
        "#1e3a8a",
        "#ec4899",
        "#dc2626",
        "#ea580c",
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: 7,
      name: "Shorts Casual",
      price: 35000,
      originalPrice: 45000,
      image: getProductImage(7, "#ffffff"),
      category: "Shorts",
      colors: [
        "#ffffff",
        "#000000",
        "#6b7280",
        "#8b5cf6",
        "#059669",
        "#1e3a8a",
        "#ec4899",
        "#dc2626",
        "#ea580c",
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 8,
      name: "Sudadera Oversize",
      price: 65000,
      image: getProductImage(8, "#ffffff"),
      category: "Sudaderas",
      colors: [
        "#ffffff",
        "#000000",
        "#6b7280",
        "#8b5cf6",
        "#059669",
        "#1e3a8a",
        "#ec4899",
        "#dc2626",
        "#ea580c",
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 9,
      name: "Buzo hoodie",
      price: 75000,
      image: getProductImage(9, "#ffffff"),
      category: "Nuevo",
      colors: [
        "#ffffff",
        "#000000",
        "#6b7280",
        "#8b5cf6",
        "#059669",
        "#1e3a8a",
        "#ec4899",
        "#dc2626",
        "#ea580c",
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
  ];

  const handleAddToCart = (productId: number) => {
    const product = productos.find((p) => p.id === productId);
    if (product) {
      addItem(product, product.colors[0] || "", product.sizes[0] || "");
      setIsCartOpen(true);
    }
  };

  const handleWishlistToggle = (productId: number) => {
    const product = productos.find((p) => p.id === productId);
    if (product) {
      if (isInWishlist(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
        });
      }
    }
  };

  const handleQuickView = (productId: number) => {
    console.log(`Vista rápida del producto ${productId}`);
  };

  const handleExploreClick = () => {
    document
      .getElementById("productos")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCollectionsClick = () => {
    document
      .getElementById("collections")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <Navbar
        logo="FUERADECONTEXTO"
        navItems={[
          { label: "Inicio", href: "#home" },
          { label: "Productos", href: "#productos" },
          { label: "Colecciones", href: "#collections" },
          { label: "Contacto", href: "#contact" },
        ]}
        rightContent={<CartIcon onClick={() => setIsCartOpen(true)} />}
      />

      <main>
        <section id="home">
          <HeroMinimal
            title="FUERADECONTEXTO"
            subtitle="Moda que rompe esquemas"
            description="Descubre piezas únicas que desafían las tendencias convencionales y expresan tu personalidad auténtica"
            primaryButtonText="Explorar"
            secondaryButtonText="Colecciones"
            onPrimaryClick={handleExploreClick}
            onSecondaryClick={handleCollectionsClick}
          />
        </section>

        <section id="productos">
          <ProductSection
            products={productos}
            onAddToCart={handleAddToCart}
            onWishlistToggle={handleWishlistToggle}
            onQuickView={handleQuickView}
            title="Nuestros Productos"
            subtitle="Descubre nuestra colección completa"
          />
        </section>

        <section className="featured-section section section--light">
          <div className="container">
            <ProductSection
              products={productos.filter((product) => product.originalPrice)}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
              onQuickView={handleQuickView}
              title="Productos Destacados"
              subtitle="Lo más nuevo y las mejores ofertas"
            />
          </div>
        </section>

        <section id="collections" className="collections-showcase section">
  <div className="container">
    <div className="section-header">
      <h2>Nuestras Colecciones</h2>
      <p>Explora nuestras diferentes líneas de productos</p>
    </div>

    <div className="collections-grid">
      <div className="collection-item">
        <div className="collection-image">
          <img
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=400&fit=crop"
            alt="Streetwear Collection"
          />
        </div>
        <div className="collection-content">
          <h3>Streetwear</h3>
          <p>Estilo urbano y cómodo para el día a día</p>
          <Button
            text="Ver Colección"
            onClick={() => console.log("Streetwear")}
            variant="outline-primary"
          />
        </div>
      </div>

      <div className="collection-item">
        <div className="collection-image">
          <img
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=400&fit=crop"
            alt="Formal Collection"
          />
        </div>
        <div className="collection-content">
          <h3>Formal</h3>
          <p>Elegancia para ocasiones especiales</p>
          <Button
            text="Ver Colección"
            onClick={() => console.log("Formal")}
            variant="outline-primary"
          />
        </div>
      </div>

      <div className="collection-item">
        <div className="collection-image">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=400&fit=crop"
            alt="Casual Collection"
          />
        </div>
        <div className="collection-content">
          <h3>Casual</h3>
          <p>Comodidad y estilo para cualquier momento</p>
          <Button
            text="Ver Colección"
            onClick={() => console.log("Casual")}
            variant="outline-primary"
          />
        </div>
      </div>
    </div>
  </div>
</section>

        <Contact />
      </main>

      <Footer />

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;

```

## src\components\button-component\Button.tsx

```
import React from "react";
import "./Button.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-danger"
    | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  rounded?: boolean;
  className?: string;
  useContainer?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  rounded = false,
  className = "",
  useContainer = false,
}) => {
  const buttonClasses = [
    "btn-main",
    variant !== "primary" && `btn-main--${variant}`,
    size !== "medium" && `btn-main--${size}`,
    disabled && "btn-main--disabled",
    loading && "btn-main--loading",
    rounded && "btn-main--rounded",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      e.preventDefault();
      e.stopPropagation();

      const button = e.currentTarget;
      button.classList.add("btn-main--clicked");

      const ripple = document.createElement("span");
      ripple.className = "btn-main__ripple";
      button.appendChild(ripple);

      setTimeout(() => {
        button.classList.remove("btn-main--clicked");
        ripple.remove();
      }, 300);

      onClick();
    }
  };

  const buttonElement = (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      type="button"
    >
      {loading && <span className="btn-main__spinner"></span>}
      <span className="btn-main__text">{text}</span>
    </button>
  );

  return useContainer ? (
    <div className="btn-container">{buttonElement}</div>
  ) : (
    buttonElement
  );
};

export const ButtonGroup: React.FC<{
  children: React.ReactNode;
  gap?: string;
  align?: "start" | "center" | "end";
  direction?: "row" | "column";
}> = ({ children, gap = "1rem", align = "center", direction = "row" }) => (
  <div
    className="btn-group"
    style={{
      display: "flex",
      alignItems: align,
      gap: gap,
      flexDirection: direction,
    }}
  >
    {children}
  </div>
);

export default Button;

```

## src\components\cart\Cart.tsx

```
import React from "react";
import { useCart } from "../../contexts/CartContext";
import Button from "../button-component/Button";
import "./cart.scss";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    alert(`Procesando compra por ${formatPrice(state.total)}`);
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Carrito de Compras</h2>
          <button className="cart-close" onClick={onClose}>
            <i className="bx bx-x"></i>
          </button>
        </div>

        <div className="cart-content">
          {state.items.length === 0 ? (
            <div className="cart-empty">
              <i 
                className="bx bx-cart" 
                style={{ fontSize: '3rem', color: '#ccc', marginBottom: '1rem' }}
              ></i>
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {state.items.map((item, index) => (
                  <div
                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                    className="cart-item"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item__image"
                    />

                    <div className="cart-item__details">
                      <h4>{item.name}</h4>
                      <p className="cart-item__variant">
                        Color:{" "}
                        <span
                          style={{
                            backgroundColor: item.selectedColor,
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginLeft: "4px",
                          }}
                        ></span>
                        | Talla: {item.selectedSize}
                      </p>
                      <p className="cart-item__price">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="cart-item__controls">
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="quantity-btn"
                        >
                          <i className="bx bx-minus"></i>
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="quantity-btn"
                        >
                          <i className="bx bx-plus"></i>
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="remove-btn"
                      >
                        <i className="bx bx-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <p>Total de productos: {state.itemCount}</p>
                  <h3>Total: {formatPrice(state.total)}</h3>
                </div>

                <div className="cart-actions">
                  <Button
                    text="Vaciar Carrito"
                    onClick={clearCart}
                    variant="outline-danger"
                    size="small"
                  />
                  <Button
                    text={`Comprar ${formatPrice(state.total)}`}
                    onClick={handleCheckout}
                    variant="primary"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface CartIconProps {
  onClick: () => void;
  icon?: React.ReactNode;
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick, icon }) => {
  const { state } = useCart();

  const defaultIcon = (
    <i className="bx bx-shopping-bag" style={{ fontSize: '24px' }}></i>
  );

  return (
    <button className="cart-icon" onClick={onClick}>
      <div className="cart-icon__content">{icon || defaultIcon}</div>
      {state.itemCount > 0 && (
        <span className="cart-badge">{state.itemCount}</span>
      )}
    </button>
  );
};

export default Cart;
```

## src\components\cart\CartIcon.tsx

```
import React from "react";
import { useCart } from "../../contexts/CartContext";

interface CartIconProps {
  onClick: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { state } = useCart();

  return (
    <button className="cart-icon" onClick={onClick}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="m1 1 4 4 11 1 2 8H7"></path>
      </svg>
      {state.itemCount > 0 && (
        <span className="cart-badge">{state.itemCount}</span>
      )}
    </button>
  );
};

```

## src\components\cart\index.ts

```
export { default as Cart, CartIcon } from "./Cart";
export { CartProvider, useCart } from "../../contexts/CartContext";
export type { Product, CartItem } from "../../contexts/CartContext";

```

## src\components\contact-section\Contact.tsx

```
import React, { useState, useRef, useEffect } from "react";
import "./contact.scss";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactProps {
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío del formulario
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      alert("¡Mensaje enviado correctamente!");
    } catch (error) {
      alert("Error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactClasses = ["contact", isVisible && "contact--visible", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section ref={contactRef} id="contact" className={contactClasses}>
      <div className="contact__container">
        {/* Header */}
        <div className="contact__header">
          <h2 className="contact__title">
            <span className="contact__title-main">Conectemos</span>
          </h2>
          <p className="contact__subtitle">
            Cuéntanos tu historia y construyamos algo extraordinario juntos
          </p>
        </div>

        {/* Content */}
        <div className="contact__content">
          {/* Contact Info */}
          <div className="contact__info">
            <div className="contact__info-item">
              <div className="contact__info-icon">
                <i className='bx bx-map'></i>
              </div>
              <div className="contact__info-text">
                <h4>Ubicación</h4>
                <p>Buenos Aires, Argentina</p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">
                <i className='bx bx-envelope'></i>
              </div>
              <div className="contact__info-text">
                <h4>Email</h4>
                <p>info@fueradecontexto.com</p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">
                <i className='bx bx-phone'></i>
              </div>
              <div className="contact__info-text">
                <h4>Teléfono</h4>
                <p>+54 11 1234-5678</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="contact__social">
              <h4>Síguenos</h4>
              <div className="contact__social-links">
                <a href="#" className="contact__social-link">
                  <i className='bx bxl-instagram'></i>
                  <span>Instagram</span>
                </a>
                <a href="#" className="contact__social-link">
                  <i className='bx bxl-facebook'></i>
                  <span>Facebook</span>
                </a>
                <a href="#" className="contact__social-link">
                  <i className='bx bxl-twitter'></i>
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="contact__form-input"
                placeholder=" "
                required
              />
              <label className="contact__form-label">Nombre completo</label>
            </div>

            <div className="contact__form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="contact__form-input"
                placeholder=" "
                required
              />
              <label className="contact__form-label">Email</label>
            </div>

            <div className="contact__form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="contact__form-input"
                placeholder=" "
                required
              />
              <label className="contact__form-label">Asunto</label>
            </div>

            <div className="contact__form-group contact__form-group--textarea">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="contact__form-textarea"
                placeholder=" "
                rows={6}
                required
              />
              <label className="contact__form-label">Mensaje</label>
            </div>

            <button
              type="submit"
              className="contact__form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="contact__form-spinner"></span>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensaje
                  <i className='bx bx-right-arrow-alt contact__form-arrow'></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

## src\components\footer-section\Footer.tsx

```
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

          <div className="footer__contact">
            <h4 className="footer__contact-title">Conecta con nosotros</h4>
            <div className="footer__contact-info">
              <p className="footer__contact-item">
                <span className="footer__contact-icon">
                  <i className="bx bx-envelope"></i>
                </span>
                info@fueradecontexto.com
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">
                  <i className="bx bx-phone"></i>
                </span>
                +54 11 1234-5678
              </p>
              <p className="footer__contact-item">
                <span className="footer__contact-icon">
                  <i className="bx  bx-globe"></i>
                </span>
                Buenos Aires, Argentina
              </p>
            </div>

            <div className="footer__social">
              <a href="#" className="footer__social-link">
                <i className="bx bxl-instagram"></i>
                <span>Instagram</span>
              </a>
              <a href="#" className="footer__social-link">
                <i className="bx bxl-facebook"></i>
                <span>Facebook</span>
              </a>
              <a href="#" className="footer__social-link">
                <i className="bx bxl-twitter"></i>
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
              Diseñado con{" "}
              <i className="bx bx-heart" style={{ color: "#e91e63" }}></i> en
              Buenos Aires
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

```

## src\components\hero-section\hero.tsx

```
import React, { useEffect, useRef, useState } from "react";
import "./hero.scss";

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundImage?: string;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "FUERADECONTEXTO",
  subtitle = "Moda que rompe esquemas",
  description = "Descubre piezas únicas que desafían las tendencias convencionales",
  primaryButtonText = "Explorar",
  secondaryButtonText = "Colecciones",
  onPrimaryClick = () => console.log("Explorar clicked"),
  onSecondaryClick = () => console.log("Colecciones clicked"),
  backgroundImage,
  className = "",
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const heroClasses = [
    "hero",
    backgroundImage && "hero--with-bg",
    isVisible && "hero--visible",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const heroStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
      }
    : {};

  return (
    <section ref={heroRef} className={heroClasses} style={heroStyle}>
      {/* Background overlay */}
      {backgroundImage && <div className="hero__overlay"></div>}

      {/* Content container */}
      <div className="hero__container">
        {/* Main content */}
        <div className="hero__content">
          {/* Title with scroll animation */}
          <h1 ref={titleRef} className="hero__title">
            <span className="hero__title-main">{title}</span>
          </h1>

          {/* Subtitle */}
          <h2 className="hero__subtitle">{subtitle}</h2>

          {/* Description */}
          <p className="hero__description">{description}</p>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <button
              className="hero__btn hero__btn--primary"
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
              <span className="hero__btn-icon">→</span>
            </button>

            <button
              className="hero__btn hero__btn--secondary"
              onClick={onSecondaryClick}
            >
              {secondaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

```

## src\components\navbar\Navbar.tsx

```
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

```

## src\components\product-section\ProductCard.tsx

```
import React from "react";
import { useWishlist } from "../../contexts/WishlistContext";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  onAddToCart: (id: number) => void;
  onWishlistToggle: (id: number) => void;
  onQuickView: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  colors,
  sizes,
  onAddToCart,
  onWishlistToggle,
  onQuickView,
}) => {
  const { isInWishlist } = useWishlist();

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img src={image} alt={name} className="product-card__image" />
        <div className="product-card__overlay">
          <div className="product-card__actions">
            <button
              className="product-card__action-btn"
              onClick={() => onQuickView(id)}
            >
              <i className='bx bx-show'></i>
            </button>
            <button
              className="product-card__action-btn"
              onClick={() => {
                console.log("🔥 Button clicked!", id);
                console.log("🔥 onWishlistToggle function:", onWishlistToggle);
                onWishlistToggle(id);
              }}
              aria-label="Agregar a favoritos"
            >
              {isInWishlist(id) ? 
                <i className='bx bxs-heart' style={{ color: '#e91e63' }}></i> : 
                <i className='bx bx-heart'></i>
              }
            </button>
          </div>
        </div>
      </div>

      <div className="product-card__info">
        <p className="product-card__category">{category}</p>
        <h3 className="product-card__name">{name}</h3>
        <div className="product-card__price">
          <span className="product-card__current-price">
            ${price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="product-card__original-price">
              ${originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <button
          className="product-card__add-to-cart"
          onClick={() => onAddToCart(id)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
```

## src\components\product-section\ProductSection.tsx

```
import React, { useEffect, useState, memo, useCallback, useMemo } from "react";
import "./productSection.scss";
import { Product, getProductImage } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  colors?: string[];
  sizes?: string[];
  onAddToCart?: (productId: number) => void;
  onWishlistToggle?: (productId: number) => void;
  onQuickView?: (productId: number) => void;
}

interface ProductSectionProps {
  products: Product[];
  onAddToCart: (id: number) => void;
  onWishlistToggle: (id: number) => void;
  onQuickView: (id: number) => void;
  title: string;
  subtitle: string;
  showFilters?: boolean;
  itemsPerRow?: number;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({
    id,
    name,
    price,
    originalPrice,
    image,
    category,
    isNew = false,
    isSale = false,
    colors = [],
    sizes = [],
    onAddToCart = () => {},
    onWishlistToggle = () => {},
    onQuickView = () => {},
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colors[0] || "");
    const [selectedSize, setSelectedSize] = useState("");
    const [currentImage, setCurrentImage] = useState(image);
    const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
      new Set()
    );
    const { isInWishlist } = useWishlist();

    const discountPercentage = useMemo(
      () =>
        originalPrice
          ? Math.round(((originalPrice - price) / originalPrice) * 100)
          : 0,
      [originalPrice, price]
    );

    const preloadImage = useCallback(
      (src: string) => {
        if (!preloadedImages.has(src)) {
          const img = new Image();
          img.src = src;
          setPreloadedImages((prev) => new Set(prev).add(src));
        }
      },
      [preloadedImages]
    );

    useEffect(() => {
      if (colors.length > 0) {
        colors.slice(0, 3).forEach((color) => {
          const imageSrc = getProductImage(id, color);
          preloadImage(imageSrc);
        });
      }
    }, [id, colors, preloadImage]);

    const handleColorChange = useCallback(
      (color: string) => {
        setSelectedColor(color);
        const newImage = getProductImage(id, color);
        setCurrentImage(newImage);
        preloadImage(newImage);
      },
      [id, preloadImage]
    );

    const handleAddToCart = useCallback(() => {
      onAddToCart(id);
    }, [id, onAddToCart]);

    const handleQuickView = useCallback(() => {
      onQuickView(id);
    }, [id, onQuickView]);

    const handleWishlistToggle = useCallback(() => {
      onWishlistToggle(id);
    }, [id, onWishlistToggle]);

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
      if (colors.length > 3) {
        colors.slice(3, 6).forEach((color) => {
          const imageSrc = getProductImage(id, color);
          preloadImage(imageSrc);
        });
      }
    }, [colors, id, preloadImage]);

    return (
      <div
        className="product-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-card__badges">
          {isNew && (
            <span className="product-card__badge product-card__badge--new">
              Nuevo
            </span>
          )}
          {isSale && (
            <span className="product-card__badge product-card__badge--sale">
              -{discountPercentage}%
            </span>
          )}
        </div>

        <div className="product-card__image-container">
          <img
            src={currentImage}
            alt={name}
            className="product-card__image"
            loading="lazy"
          />

          <div className="product-card__overlay">
            <div className="product-card__actions">
              <button
                className="product-card__action-btn"
                onClick={handleQuickView}
                aria-label="Vista rápida"
              >
                <i className='bx bx-show'></i>
              </button>
              <button
                className="product-card__action-btn"
                onClick={handleWishlistToggle}
                aria-label="Agregar a favoritos"
              >
                {isInWishlist(id) ? 
                  <i className='bx bxs-heart' style={{ color: '#e91e63' }}></i> : 
                  <i className='bx bx-heart'></i>
                }
              </button>
            </div>
          </div>
        </div>

        <div className="product-card__info">
          <div className="product-card__category">{category}</div>
          <h3 className="product-card__name">{name}</h3>

          <div className="product-card__price">
            <span className="product-card__current-price">
              ${price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="product-card__original-price">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {colors.length > 0 && (
            <div className="product-card__colors">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`product-card__color ${
                    selectedColor === color
                      ? "product-card__color--selected"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          )}

          {sizes.length > 0 && (
            <div className="product-card__sizes">
              {sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  className={`product-card__size ${
                    selectedSize === size ? "product-card__size--selected" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
              {sizes.length > 5 && (
                <span className="product-card__size product-card__size--more">
                  +{sizes.length - 5}
                </span>
              )}
            </div>
          )}

          <button
            className="product-card__add-to-cart"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  title = "Productos",
  subtitle,
  onAddToCart = () => {},
  onWishlistToggle = () => {},
  onQuickView = () => {},
  showFilters = false,
  itemsPerRow = 4,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [sortBy, setSortBy] = useState<string>("name");

  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      selectedCategory === "Todos"
        ? products
        : products.filter((product) => product.category === selectedCategory),
    [products, selectedCategory]
  );

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(e.target.value);
    },
    []
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value);
    },
    []
  );

  return (
    <section className="product-section">
      <div className="container">
        {(title || subtitle) && (
          <div className="product-section__header">
            {title && <h2 className="product-section__title">{title}</h2>}
            {subtitle && (
              <p className="product-section__subtitle">{subtitle}</p>
            )}
          </div>
        )}

        {showFilters && (
          <div className="product-section__filters">
            <div className="product-section__filter-group">
              <label htmlFor="category-filter">Categoría:</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="product-section__select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-section__filter-group">
              <label htmlFor="sort-filter">Ordenar por:</label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={handleSortChange}
                className="product-section__select"
              >
                <option value="name">Nombre</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        )}

        <div
          className="product-section__grid"
          style={
            {
              gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
              "--items-per-row": itemsPerRow,
            } as any
          }
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={onAddToCart}
              onWishlistToggle={onWishlistToggle}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="product-section__empty">
            <p>No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
```

## src\contexts\CartContext.tsx

```
import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: { product: Product; color: string; size: string };
    }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const COLOR_MAP: Record<string, string> = {
  "#ffffff": "white",
  "#000000": "black",
  "#6b7280": "gray",
  "#8b5cf6": "purple",
  "#059669": "green",
  "#1e3a8a": "blue",
  "#ec4899": "pink",
  "#dc2626": "red",
  "#ea580c": "orange",
};

const IMAGE_MAP: Record<string, string> = {
  "1-white": "1596755094514-f87e34085b2c",
  "1-black": "1503341504253-dff4815485f1",
  "1-gray": "1571945153237-4929e783af4a",
  "1-purple": "1586790170083-2f9ceadc732d",
  "1-green": "1618354691373-d851c5c3a990",
  "1-blue": "1521572163474-6864f9cf17ab",
  "1-pink": "1562157873-818bc0726f68",
  "1-red": "1583743814966-8936f37f4651",
  "1-orange": "1556821840-3a63f95609a7",
  "2-white": "1542272604-787c3835535d",
  "2-black": "1503341504253-dff4815485f1",
  "2-gray": "1571945153237-4929e783af4a",
  "2-purple": "1586790170083-2f9ceadc732d",
  "2-green": "1618354691373-d851c5c3a990",
  "2-blue": "1521572163474-6864f9cf17ab",
  "2-pink": "1562157873-818bc0726f68",
  "2-red": "1583743814966-8936f37f4651",
  "2-orange": "1556821840-3a63f95609a7",
  "3-white": "1586790170083-2f9ceadc732d",
  "3-black": "1503341504253-dff4815485f1",
  "3-gray": "1571945153237-4929e783af4a",
  "3-purple": "1586790170083-2f9ceadc732d",
  "3-green": "1618354691373-d851c5c3a990",
  "3-blue": "1521572163474-6864f9cf17ab",
  "3-pink": "1562157873-818bc0726f68",
  "3-red": "1583743814966-8936f37f4651",
  "3-orange": "1556821840-3a63f95609a7",
  "4-white": "1551028719-00167b16eac5",
  "4-black": "1503341504253-dff4815485f1",
  "4-gray": "1571945153237-4929e783af4a",
  "4-purple": "1586790170083-2f9ceadc732d",
  "4-green": "1618354691373-d851c5c3a990",
  "4-blue": "1521572163474-6864f9cf17ab",
  "4-pink": "1562157873-818bc0726f68",
  "4-red": "1583743814966-8936f37f4651",
  "4-orange": "1556821840-3a63f95609a7",
  "5-white": "1549298916-b41d501d3772",
  "5-black": "1503341504253-dff4815485f1",
  "5-gray": "1571945153237-4929e783af4a",
  "5-purple": "1586790170083-2f9ceadc732d",
  "5-green": "1618354691373-d851c5c3a990",
  "5-blue": "1521572163474-6864f9cf17ab",
  "5-pink": "1562157873-818bc0726f68",
  "5-red": "1583743814966-8936f37f4651",
  "5-orange": "1556821840-3a63f95609a7",
  "6-white": "1521572163474-6864f9cf17ab",
  "6-black": "1503341504253-dff4815485f1",
  "6-gray": "1571945153237-4929e783af4a",
  "6-purple": "1586790170083-2f9ceadc732d",
  "6-green": "1618354691373-d851c5c3a990",
  "6-blue": "1521572163474-6864f9cf17ab",
  "6-pink": "1562157873-818bc0726f68",
  "6-red": "1583743814966-8936f37f4651",
  "6-orange": "1556821840-3a63f95609a7",
  "7-white": "1591195853828-11db59a44f6b",
  "7-black": "1503341504253-dff4815485f1",
  "7-gray": "1571945153237-4929e783af4a",
  "7-purple": "1586790170083-2f9ceadc732d",
  "7-green": "1618354691373-d851c5c3a990",
  "7-blue": "1521572163474-6864f9cf17ab",
  "7-pink": "1562157873-818bc0726f68",
  "7-red": "1583743814966-8936f37f4651",
  "7-orange": "1556821840-3a63f95609a7",
  "8-white": "1556821840-3a63f95609a7",
  "8-black": "1503341504253-dff4815485f1",
  "8-gray": "1571945153237-4929e783af4a",
  "8-purple": "1586790170083-2f9ceadc732d",
  "8-green": "1618354691373-d851c5c3a990",
  "8-blue": "1521572163474-6864f9cf17ab",
  "8-pink": "1562157873-818bc0726f68",
  "8-red": "1583743814966-8936f37f4651",
  "8-orange": "1556821840-3a63f95609a7",
  "9-white": "1596755094514-f87e34085b2c",
  "9-black": "1503341504253-dff4815485f1",
  "9-gray": "1571945153237-4929e783af4a",
  "9-purple": "1586790170083-2f9ceadc732d",
  "9-green": "1618354691373-d851c5c3a990",
  "9-blue": "1521572163474-6864f9cf17ab",
  "9-pink": "1562157873-818bc0726f68",
  "9-red": "1583743814966-8936f37f4651",
  "9-orange": "1556821840-3a63f95609a7",
};

export const getProductImage = (
  productId: number,
  colorHex: string
): string => {
  const colorName = COLOR_MAP[colorHex] || "white";
  const imageId =
    IMAGE_MAP[`${productId}-${colorName}`] ||
    IMAGE_MAP[`${productId}-white`] ||
    "1596755094514-f87e34085b2c";
  return `https://images.unsplash.com/photo-${imageId}?w=400&h=500&fit=crop`;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, color, size } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === existingItem.id &&
          item.selectedColor === color &&
          item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: state.total + product.price,
          itemCount: state.itemCount + 1,
        };
      }

      const newItem: CartItem = {
        ...product,
        quantity: 1,
        selectedColor: color,
        selectedSize: size,
      };

      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + product.price,
        itemCount: state.itemCount + 1,
      };
    }

    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
        itemCount: state.itemCount - itemToRemove.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: id });
      }

      const item = state.items.find((item) => item.id === id);
      if (!item) return state;

      const quantityDiff = quantity - item.quantity;
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: updatedItems,
        total: state.total + item.price * quantityDiff,
        itemCount: state.itemCount + quantityDiff,
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product, color: string, size: string) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  const addItem = (product: Product, color: string, size: string) => {
    dispatch({ type: "ADD_ITEM", payload: { product, color, size } });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

```

## src\contexts\WishlistContext.tsx

```
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => {
    return items.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        itemCount: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};

```

## src\index.tsx

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

## src\react-app-env.d.ts

```
/// <reference types="react-scripts" />

```

## src\reportWebVitals.ts

```
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

```

## src\setupTests.ts

```
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

```

