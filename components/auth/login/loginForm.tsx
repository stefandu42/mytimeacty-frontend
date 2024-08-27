"use client";

import { useState } from "react";
import { Login } from "@/models/auth/login";
import AuthService from "@/services/authService";
import styles from "./loginForm.module.css";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [emailOrNickname, setOrNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginDTO: Login = { nicknameOrEmail: emailOrNickname, password };

    try {
      const token = await AuthService.login(loginDTO);
      if (rememberMe) {
        window.localStorage.setItem("token", token);
      } else {
        window.sessionStorage.setItem("token", token);
      }
      router.push("/homepage");
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="emailOrNickname" className={styles.label}>
          Email ou pseudo:
        </label>
        <input
          id="emailOrNickname"
          type="text"
          value={emailOrNickname}
          onChange={(e) => setOrNickname(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Mot de passe:
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordToggle}
          >
            {showPassword ? (
              <span role="img" aria-label="hide password">
                🙈
              </span>
            ) : (
              <span role="img" aria-label="show password">
                👁️
              </span>
            )}
          </button>
        </div>
      </div>

      <div className={styles.checkboxContainer}>
        <input
          id="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
          className={styles.checkbox}
        />
        <label htmlFor="rememberMe" className={styles.label}>
          Rester connecté ?
        </label>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submitButton}>
        Connexion
      </button>
    </form>
  );
}
