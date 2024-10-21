import React from "react";

const Button = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded font-bold focus:outline-none border-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
