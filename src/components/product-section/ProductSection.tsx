import React, { useEffect, useState } from "react";
import "./productSection.scss";
import { Product } from "../../contexts/CartContext";
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

const ProductCard: React.FC<ProductCardProps> = ({
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
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    onAddToCart(id);
    console.log(`Producto ${id} agregado al carrito`);
  };

  const handleQuickView = () => {
    onQuickView(id);
    console.log(`Vista rápida del producto ${id}`);
  };

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
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

      {/* Imagen del producto */}
      <div className="product-card__image-container">
        <img src={image} alt={name} className="product-card__image" />

        {/* Overlay con acciones */}
        <div className="product-card__overlay">
          <div className="product-card__actions">
            <button
              className="product-card__action-btn"
              onClick={handleQuickView}
              aria-label="Vista rápida"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button
              className="product-card__action-btn"
              onClick={() => onWishlistToggle(id)}
              aria-label="Agregar a favoritos"
            >
              {isInWishlist(id) ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>

      {/* Información del producto */}
      <div className="product-card__info">
        <div className="product-card__category">{category}</div>
        <h3 className="product-card__name">{name}</h3>

        {/* Precios */}
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

        {/* Colores disponibles */}
        {colors.length > 0 && (
          <div className="product-card__colors">
            {colors.map((color, index) => (
              <button
                key={index}
                className={`product-card__color ${
                  selectedColor === color ? "product-card__color--selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>
        )}

        {/* Tallas disponibles */}
        {sizes.length > 0 && (
          <div className="product-card__sizes">
            {sizes.slice(0, 5).map((size, index) => (
              <button
                key={index}
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

        <button className="product-card__add-to-cart" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

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

  // Obtener categorías únicas
  const categories = [
    "Todos",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Filtrar productos
  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  return (
    <section className="product-section">
      <div className="container">
        {/* Header de la sección */}
        {(title || subtitle) && (
          <div className="product-section__header">
            {title && <h2 className="product-section__title">{title}</h2>}
            {subtitle && (
              <p className="product-section__subtitle">{subtitle}</p>
            )}
          </div>
        )}

        {/* Filtros y ordenamiento */}
        {showFilters && (
          <div className="product-section__filters">
            <div className="product-section__filter-group">
              <label htmlFor="category-filter">Categoría:</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                onChange={(e) => setSortBy(e.target.value)}
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

        {/* Mensaje si no hay productos */}
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
