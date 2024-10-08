"use client";

import { useState } from "react";
import { Login } from "@/models/auth";
import AuthService from "@/services/auth.service";
import styles from "@/styles/auth/auth.module.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import Input from "../general/input";
import Button from "../general/button";

export default function LoginForm() {
  const [emailOrNickname, setOrNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
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
      dispatch(login());
      router.push("/quizzes");
    } catch (err) {
      toast.error(
        "La connexion a échoué. Veuillez vérifier vos identifiants et réessayer."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="emailOrNickname" className={styles.label}>
          Email ou pseudo:
        </label>
        <Input
          id="emailOrNickname"
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
          <Input
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

      <Button type="submit" className={styles.submitButton}>
        Se connecter
      </Button>
    </form>
  );
}
