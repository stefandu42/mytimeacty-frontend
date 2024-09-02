"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { clearToken } from "@/utils/authUtils";
import styles from "@/styles/header.module.css";
import { useRouter } from "next/navigation";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href={isLoggedIn ? "/quizzes" : "/login"} className={styles.logo}>
          <img src="/logo.jpeg" alt="Logo" />
        </Link>

        {isLoggedIn && (
          <>
            <div className={styles.links}>
              <Link href="/quizzes" className={styles.navLink}>
                All quizzes
              </Link>
              <Link href="/trends" className={styles.navLink}>
                Trends
              </Link>
              <Link href="/quizzes/create" className={styles.navLink}>
                Create a quizz
              </Link>
            </div>
            <div className={styles.userActions}>
              <Link href="/profile" className={styles.icon}>
                <CgProfile />
              </Link>
              <button onClick={handleLogout} className={styles.icon}>
                <TbLogout />
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
