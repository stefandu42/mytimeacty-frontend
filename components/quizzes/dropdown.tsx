import React from "react";
import styles from "@/styles/general/dropdown.module.css";

interface DropdownProps {
  options: { value: number; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: DropdownProps) {
  return (
    <select value={value} onChange={onChange} className={styles.dropdown}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
