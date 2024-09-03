"use client";

import { useState } from "react";
import AuthService from "@/services/auth.service";
import styles from "@/styles/auth/auth.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../general/input";
import Button from "../general/button";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const registerDTO = { email, nickname, password };

    try {
      await AuthService.register(registerDTO);
      toast.success(
        "Votre compte a été créé avec succès. Veuillez vérifier vos e-mails pour activer votre compte."
      );
    } catch (err) {
      toast.error("La création de compte a échoué. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="nickname" className={styles.label}>
          Pseudo:
        </label>
        <Input
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
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

      <Button type="submit" className={styles.submitButton}>
        S'inscrire
      </Button>
    </form>
  );
}
