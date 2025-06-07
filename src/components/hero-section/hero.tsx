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
