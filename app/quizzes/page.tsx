"use client";

import QuizzCard from "@/components/quizzes/quizzCard";
import { QuizzWithLikeAndFavourite } from "@/models/quizz";
import styles from "@/styles/quizzes/quizzesHome.module.css";
import { useEffect, useState } from "react";
import QuizzService from "@/services/quizzes.service";
import QuizzPagination from "@/components/quizzes/quizzPagination";

export default function QuizzesHome() {
  const [quizzes, setQuizzes] = useState<QuizzWithLikeAndFavourite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchQuizzes = async (page: number = 1) => {
    try {
      const quizzesData = await QuizzService.getQuizzes(page - 1, 14);
      setQuizzes(quizzesData.content);
      setTotalPages(quizzesData.totalPages);
    } catch (error) {
      console.error("Erreur lors de la récupération des quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    fetchQuizzes(page);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return <p>Chargement des quizzes...</p>;
  }

  if (quizzes.length === 0) {
    return <p>Aucun quiz disponible.</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Liste des Quizzes</h1>
      <div className={styles.quizzesContainer}>
        <div className={styles.quizzesGrid}>
          {quizzes.map((quizz) => (
            <QuizzCard key={quizz.idQuizz} quizz={quizz} />
          ))}
        </div>
        <div className={styles.paginationContainer}>
          <QuizzPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
