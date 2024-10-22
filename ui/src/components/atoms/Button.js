import React from "react";

const Button = ({
  onClick,
  children,
  className = "",
  variation = "filled",
  color = "default",
  disabled = false,
  isLoading = false,
}) => {
  let buttonClasses = "btn";

  if (variation === "outlined") {
    buttonClasses += " btn-outline";
  }

  if (disabled) {
    buttonClasses += " btn-disabled";
  }

  switch (color) {
    case "primary":
      buttonClasses += " btn-primary";
      break;
    case "secondary":
      buttonClasses += " btn-secondary";
      break;
    case "accent":
      buttonClasses += " btn-accent";
      break;
    case "info":
      buttonClasses += " btn-info";
      break;
    case "success":
      buttonClasses += " btn-success";
      break;
    case "warning":
      buttonClasses += " btn-warning";
      break;
    case "error":
      buttonClasses += " btn-error";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonClasses} ${className}`}
      disabled={disabled}
    >
      {isLoading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
};

export default Button;
