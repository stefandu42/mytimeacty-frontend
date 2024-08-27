import LoginForm from "@/components/auth/login/loginForm";
import Link from "next/link";
import styles from "@/components/auth/login/loginForm.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Se connecter</h2>
        </div>
        <LoginForm />
        <div className={styles.footer}>
          <Link href={`/register`}>Créer un compte ?</Link>
        </div>
      </div>
    </div>
  );
}
