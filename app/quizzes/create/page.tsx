"use client";

import { useState } from "react";
import { QuizzCreate } from "@/models/quizz";
import QuizzService from "@/services/quizzes.service";
import { useRouter } from "next/navigation";

const CreateQuizzPage = () => {
  const [quizzCreate, setQuizzCreate] = useState<QuizzCreate>({
    title: "Je teste",
    levelId: 1,
    categoryId: 3,
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
      {
        question: "Qui est le plus fort dans Marvel ?",
        numQuestion: 2,
        answers: [
          { answer: "Paris", numAnswer: 1, isCorrect: true },
          { answer: "Berlin", numAnswer: 2, isCorrect: false },
          { answer: "Madrid", numAnswer: 3, isCorrect: false },
        ],
      },
    ],
  });

  const router = useRouter();

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
      <button type="submit">Create Quizz</button>
    </form>
  );
};

export default CreateQuizzPage;
