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
                onClick={handleWishlistToggle}
                aria-label="Agregar a favoritos"
              >
                {isInWishlist(id) ? "❤️" : "🤍"}
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
