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
              👁️
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
              {isInWishlist(id) ? "❤️" : "🤍"}
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
