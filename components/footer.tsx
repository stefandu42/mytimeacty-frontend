"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/footer.module.css";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>
          No Copyright &copy; | Made by Stefan | {year}
        </p>
      </div>
    </footer>
  );
}
