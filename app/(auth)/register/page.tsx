// app/register/page.tsx

import RegisterForm from "@/components/auth/registerForm";
import Link from "next/link";
import styles from "@/styles/auth/auth.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Inscription</h2>
        </div>
        <RegisterForm />
        <div className={styles.footer}>
          <Link href={`/login`}>Déjà un compte ?</Link>
        </div>
      </div>
    </div>
  );
}
