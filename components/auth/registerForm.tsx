"use client";

import { useState } from "react";
import { Register } from "@/models/auth/register";
import AuthService from "@/services/authService";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const registerDTO: Register = { email, nickname, password };

    try {
      const response = await AuthService.register(registerDTO);
      setMessage(response); // Affiche le message de succès ou autre réponse
      setEmail("");
      setNickname("");
      setPassword("");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Nickname:</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <button type="submit">Register</button>
    </form>
  );
}
