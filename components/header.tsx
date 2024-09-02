"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { clearToken } from "@/utils/authUtils";
import styles from "@/styles/header.module.css";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi"; // Import de l'icône hamburger

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour contrôler le menu
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    dispatch(logout());
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={isLoggedIn ? "/quizzes" : "/login"} className={styles.logo}>
          <img src="/logo.jpeg" alt="Logo" />
        </Link>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <GiHamburgerMenu />
        </div>

        <div className={`${styles.links} ${isMenuOpen ? styles.menuOpen : ""}`}>
          {isLoggedIn && (
            <>
              <Link href="/quizzes" className={styles.navLink}>
                All quizzes
              </Link>
              <Link href="/trends" className={styles.navLink}>
                Trends
              </Link>
              <Link href="/quizzes/create" className={styles.navLink}>
                Create a quizz
              </Link>
            </>
          )}
        </div>

        {isLoggedIn && (
          <div className={styles.userActions}>
            <Link href="/profile" className={styles.icon}>
              <CgProfile />
            </Link>
            <button onClick={handleLogout} className={styles.icon}>
              <TbLogout />
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
