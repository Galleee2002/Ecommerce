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
            ×
          </button>
        </div>

        <div className="cart-content">
          {state.items.length === 0 ? (
            <div className="cart-empty">
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
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="remove-btn"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "16px", height: "16px" }}
                        >
                          <polyline points="3,6 5,6 21,6"></polyline>
                          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
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
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 3h2l.4 2m0 0L6 13h12l1-8H6.4z"></path>
      <circle cx="9" cy="20" r="1"></circle>
      <circle cx="20" cy="20" r="1"></circle>
    </svg>
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
