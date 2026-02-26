import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "contained",
  color = "primary",
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "rounded-md px-4 py-2 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses: Record<string, string> = {
    contained:
      color === "primary"
        ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 disabled:text-white focus:ring-blue-500"
        : "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-300 disabled:text-white focus:ring-gray-500",
    outlined:
      color === "primary"
        ? "border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-blue-300 disabled:text-blue-300 focus:ring-blue-500"
        : "border border-gray-600 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:border-gray-300 disabled:text-gray-300 focus:ring-gray-500",
    text:
      color === "primary"
        ? "text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-blue-300 focus:ring-blue-500"
        : "text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:text-gray-300 focus:ring-gray-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};