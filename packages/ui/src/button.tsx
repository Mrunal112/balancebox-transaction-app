"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export const Button = ({ onClick, children, variant = "primary", className = "" }: ButtonProps) => {
  const baseStyles = "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 focus:ring-gray-500",
    secondary: "text-white hover:text-gray-200 px-4 py-2",
    ghost: "text-white hover:text-gray-200"
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button onClick={onClick} type="button" className={buttonStyles}>
      {children}
    </button>
  );
};
