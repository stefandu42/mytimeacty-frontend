"use client";

import QuizzCard from "@/components/quizzes/QuizzCard";
import { Quizz } from "@/models/quizz";
import styles from "@/styles/quizzes/quizzesHome.module.css";
import { useEffect, useState } from "react";
import QuizzService from "@/services/quizzes.service";

export default function QuizzesHome() {
  const [quizzes, setQuizzes] = useState<Quizz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchQuizzes = async () => {
    try {
      const quizzesData = await QuizzService.getQuizzes();
      console.log(quizzesData);
      setQuizzes(quizzesData.content); // Stocker les données dans l'état
    } catch (error) {
      console.error("Erreur lors de la récupération des quizzes:", error);
    } finally {
      setLoading(false); // Le chargement est terminé
    }
  };

  useEffect(() => {
    fetchQuizzes(); // Appel de la fonction fetchQuizzes lors du montage du composant
  }, []);

  if (loading) {
    return <p>Chargement des quizzes...</p>;
  }

  if (quizzes.length === 0) {
    return <p>Aucun quiz disponible.</p>;
  }

  return (
    <div className={styles.quizzesContainer}>
      <h1>Liste des Quizzes</h1>
      <div className={styles.quizzesGrid}>
        {quizzes.map((quizz) => (
          <QuizzCard key={quizz.idQuizz} quizz={quizz} />
        ))}
      </div>
    </div>
  );
}
