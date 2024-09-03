import React from "react";
import styles from "@/styles/general/input.module.css";

interface InputProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function Input({
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${className} ${
        type === "password" ? styles.inputPassword : ""
      }`}
      required={required}
    />
  );
}
