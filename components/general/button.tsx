import React from "react";
import styles from "@/styles/general/button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: string;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
