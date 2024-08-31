"use client";

import QuizzCard from "@/components/quizzes/quizzCard";
import { QuizzWithLikeAndFavourite } from "@/models/quizz";
import styles from "@/styles/quizzes/quizzesHome.module.css";
import { useEffect, useState } from "react";
import QuizzService from "@/services/quizzes.service";
import QuizzPagination from "@/components/quizzes/quizzPagination";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/quizzes/searchBar";

export default function QuizzesHome() {
  const [quizzes, setQuizzes] = useState<QuizzWithLikeAndFavourite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchQuizzes = async (page: number = 1) => {
    try {
      const search = searchParams.get("search") || "";
      const category = searchParams.get("category") || "";
      const level = searchParams.get("level") || "";

      const quizzesData = await QuizzService.getQuizzes(
        page - 1,
        14,
        search,
        search,
        category,
        level
      );
      setQuizzes(quizzesData.content);
      setTotalPages(quizzesData.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erreur lors de la récupération des quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (search: string, category: string, level: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (level) params.set("level", level);

    setCurrentPage(1);
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    fetchQuizzes(page);
  };

  useEffect(() => {
    fetchQuizzes(currentPage);
  }, [searchParams, currentPage]);

  return (
    <div className={styles.container}>
      <h1>Liste des Quizzes</h1>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.quizzesContainer}>
        {loading ? (
          <p>Chargement des quizzes...</p>
        ) : quizzes.length === 0 ? (
          <p>Aucun quiz disponible.</p>
        ) : (
          <div className={styles.quizzesGrid}>
            {quizzes.map((quizz) => (
              <QuizzCard key={quizz.idQuizz} quizz={quizz} />
            ))}
          </div>
        )}
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
