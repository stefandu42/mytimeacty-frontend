import React from "react";
import styles from "@/styles/general/label.module.css";

interface LabelProps {
  text: string;
  icon: React.ReactNode;
  level?: string;
  className?: string;
}
export default function Label({ text, icon, level, className }: LabelProps) {
  const levelClass = level
    ? styles[`level${level.charAt(0).toUpperCase() + level.slice(1)}`]
    : "";

  return (
    <span className={`${styles.label} ${levelClass} ${className}`}>
      {icon}
      {text}
    </span>
  );
}
