"use client";

import { useEffect, useState } from "react";
import { QuizzCategory, QuizzCreate, QuizzLevel } from "@/models/quizz";
import QuizzService from "@/services/quizzes.service";
import { useRouter } from "next/navigation";
import Input from "@/components/general/input";
import Dropdown from "@/components/quizzes/dropdown";
import CategoryService from "@/services/category.service";
import LevelService from "@/services/level.service";
import styles from "@/styles/quizzes/createQuizz.module.css";

export default function CreateQuizz() {
  const [categories, setCategories] = useState<QuizzCategory[]>([]);
  const [levels, setLevels] = useState<QuizzLevel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const [quizzCreate, setQuizzCreate] = useState<QuizzCreate>({
    title: "",
    levelId: 0,
    categoryId: 0,
    img: null,
    questions: [
      {
        question: "Qui est le plus fort dans Marvel ?",
        numQuestion: 1,
        answers: [
          { answer: "Paris", numAnswer: 1, isCorrect: true },
          { answer: "Berlin", numAnswer: 2, isCorrect: false },
          { answer: "Madrid", numAnswer: 3, isCorrect: false },
        ],
      },
    ],
  });

  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesAndLevels = async () => {
      try {
        const categoriesData = await CategoryService.getAllCategories();
        const levelsData = await LevelService.getAllLevels();
        setCategories(categoriesData);
        setLevels(levelsData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des catégories et niveaux:",
          error
        );
      }
    };

    fetchCategoriesAndLevels();
  }, []);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const createdQuizz = await QuizzService.createQuizz(quizzCreate);
      router.push(`/quizzes/${createdQuizz.idQuizz}`);
    } catch (error) {
      console.error("Failed to create quizz:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="title"
        value={quizzCreate.title}
        onChange={(e) =>
          setQuizzCreate({ ...quizzCreate, title: e.target.value })
        }
        placeholder="Enter the quizz title"
        className={styles.title}
        required
      />

      <Dropdown
        options={categories.map((category) => ({
          value: category.idCategory,
          label: category.label,
        }))}
        value={String(quizzCreate.categoryId)}
        onChange={(e) => {
          setQuizzCreate({
            ...quizzCreate,
            categoryId: Number(e.target.value),
          });
          setSelectedCategory(e.target.value);
        }}
        placeholder="Select category"
      />

      <Dropdown
        options={levels.map((level) => ({
          value: level.idLevel,
          label: level.label,
        }))}
        value={String(quizzCreate.levelId)}
        onChange={(e) => {
          setQuizzCreate({ ...quizzCreate, levelId: Number(e.target.value) });
          setSelectedLevel(e.target.value);
          console.log(e.target.value);
        }}
        placeholder="Select level"
      />

      <input type="file" onChange={(e) => {}} accept="image/*" />

      <button type="submit">Create Quizz</button>
    </form>
  );
}
