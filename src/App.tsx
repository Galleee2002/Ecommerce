import React, { useState } from "react";
import "./App.scss";
import Button from "./components/button-component/Button";
import HeroMinimal from "./components/hero-section/hero";
import Navbar from "./components/navbar/Navbar";
import Contact from "./components/contact-section/Contact";
import Footer from "./components/footer-section/Footer";
import ProductSection from "./components/product-section/ProductSection";
import Cart, { CartIcon } from "./components/cart/Cart";
import { CartProvider, useCart, Product } from "./contexts/CartContext";
import { WishlistProvider, useWishlist } from "./contexts/WishlistContext";

const AppContent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const productos: Product[] = [
    {
      id: 1,
      name: "Camisa Casual Moderna",
      price: 45000,
      originalPrice: 55000,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
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
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "Jean Slim Fit Unisex",
      price: 75000,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=500&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
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
      image:
        "https://via.placeholder.com/400x500/f3f4f6/6b7280?text=Próximamente",
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
    // 🔥 DEBE ESTAR
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
