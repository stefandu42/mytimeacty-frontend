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
import Button from "../general/button";

export default function CreateQuizz() {
  const [categories, setCategories] = useState<QuizzCategory[]>([]);
  const [levels, setLevels] = useState<QuizzLevel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

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

  // Gestion de l'aperçu de l'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      //setQuizzCreate({ ...quizzCreate, img: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.imageContainer}>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Selected"
              className={styles.quizzImage}
            />
          ) : (
            <div className={styles.placeholder}>No Image Selected</div>
          )}
        </div>

        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className={styles.fileInput}
        />

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

        <div className={styles.buttonGroup}>
          <Button
            type="button"
            className={styles.cancelButton}
            variant="cancel"
            onClick={() => router.push("/quizzes")}
          >
            Cancel
          </Button>

          <Button type="submit" className={styles.submitButton}>
            Create Quizz
          </Button>
        </div>
      </form>
    </div>
  );
}
