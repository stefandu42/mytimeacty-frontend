"use client";

import { useEffect, useState } from "react";
import AuthService from "@/services/auth.service";
import styles from "@/components/auth/verifyPage.module.css";
import { useRouter } from "next/navigation";

type Props = {
  params: { token: string };
};

export default function VerifyPage({ params }: Props) {
  const token = params.token;
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redirectTimer, setRedirectTimer] = useState<number>(5); // 5 seconds timer
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof token === "string") {
      const verifyToken = async () => {
        try {
          const response = await AuthService.verifyAccount(token);
          setMessage(response); // Show success message or response
          setRedirecting(true); // Start redirect timer
        } catch (err) {
          setError("Verification failed. Your link is expired or invalid.");
        }
      };

      verifyToken();
    }
  }, [token]);

  useEffect(() => {
    if (redirecting && redirectTimer > 0) {
      const timer = setInterval(() => {
        setRedirectTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (redirectTimer === 0) {
      router.push("/login");
    }
  }, [redirecting, redirectTimer]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Verify Your Account</h1>
      {message && (
        <div className={styles.messageContainer}>
          <p className={styles.successMessage}>{message}</p>
          {redirecting && (
            <p className={styles.redirectInfo}>
              You will be redirected to the login page in {redirectTimer}{" "}
              seconds.
            </p>
          )}
        </div>
      )}
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
          <button
            onClick={() => router.push("/login")}
            className={styles.retryButton}
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
}
