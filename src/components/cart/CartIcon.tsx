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
