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
