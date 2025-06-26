"use client";
import React from "react";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className,
}) => {
  const baseStyle =
    "px-4 py-2 rounded text-white transition-colors duration-200";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={classNames(baseStyle, variants[variant], className)}
    >
      {children}
    </button>
  );
};
