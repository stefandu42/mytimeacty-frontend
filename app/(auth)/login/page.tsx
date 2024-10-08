import LoginForm from "@/components/auth/loginForm";
import Link from "next/link";
import styles from "@/styles/auth/auth.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Connexion</h2>
        </div>
        <LoginForm />
        <div className={styles.footer}>
          <Link href={`/register`}>Créer un compte ?</Link>
        </div>
      </div>
    </div>
  );
}
