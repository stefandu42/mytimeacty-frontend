"use client";

import { useEffect, useState } from "react";
import AuthService from "@/services/authService";

type Props = {
  params: { token: string };
};

export default function VerifyPage({ params }: Props) {
  const token = params.token;
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof token === "string") {
      const verifyToken = async () => {
        try {
          const response = await AuthService.verifyAccount(token);
          setMessage(response); // Show success message or response
        } catch (err) {
          setError(
            "Verification failed. Please check your token and try again."
          );
        }
      };

      verifyToken();
    }
  }, [token]); // Only run when token changes

  return (
    <div>
      <h1>Verify Your Account</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
