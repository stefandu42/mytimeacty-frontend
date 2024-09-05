"use client";

import { useEffect, useState } from "react";
import { QuizzCategory, QuizzCreate, QuizzLevel } from "@/models/quizz";
import QuizzService from "@/services/quizzes.service";
import { useRouter } from "next/navigation";
import Input from "@/components/general/input";
import Dropdown from "@/components/quizzes/dropdown";
import CategoryService from "@/services/category.service";
import LevelService from "@/services/level.service";
import Button from "@/components/general/button";
import QuestionWithAnswers from "@/components/quizzes/create/questionWithAnswers";
import styles from "@/styles/quizzes/create/createQuizz.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateQuizz() {
  const [categories, setCategories] = useState<QuizzCategory[]>([]);
  const [levels, setLevels] = useState<QuizzLevel[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  const [quizzCreate, setQuizzCreate] = useState<QuizzCreate>({
    title: "",
    levelId: 0,
    categoryId: 0,
    img: null,
    questions: [
      {
        question: "",
        numQuestion: 1,
        answers: [
          { answer: "", numAnswer: 1, isCorrect: false },
          { answer: "", numAnswer: 2, isCorrect: false },
          { answer: "", numAnswer: 3, isCorrect: false },
          { answer: "", numAnswer: 4, isCorrect: false },
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
        toast.error("Error retrieving categories and levels.");
      }
    };

    fetchCategoriesAndLevels();
  }, []);

  const handleQuestionChange = (index: number, question: string) => {
    const newQuestions = [...quizzCreate.questions];
    newQuestions[index].question = question;
    setQuizzCreate({ ...quizzCreate, questions: newQuestions });
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    answer: string
  ) => {
    const newQuestions = [...quizzCreate.questions];
    newQuestions[questionIndex].answers[answerIndex].answer = answer;
    setQuizzCreate({ ...quizzCreate, questions: newQuestions });
  };

  const handleCorrectAnswerChange = (
    questionIndex: number,
    answerIndex: number
  ) => {
    const newQuestions = [...quizzCreate.questions];
    newQuestions[questionIndex].answers[answerIndex].isCorrect = true;
    setQuizzCreate({ ...quizzCreate, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuizzCreate({
      ...quizzCreate,
      questions: [
        ...quizzCreate.questions,
        {
          question: "",
          numQuestion: quizzCreate.questions.length + 1,
          answers: [
            { answer: "", numAnswer: 1, isCorrect: false },
            { answer: "", numAnswer: 2, isCorrect: false },
            { answer: "", numAnswer: 3, isCorrect: false },
            { answer: "", numAnswer: 4, isCorrect: false },
          ],
        },
      ],
    });
  };

  const removeQuestion = (index: number) => {
    const newQuestions = quizzCreate.questions
      .filter((_, questionIndex) => questionIndex !== index)
      .map((question, idx) => ({
        ...question,
        numQuestion: idx + 1,
      }));

    setQuizzCreate({ ...quizzCreate, questions: newQuestions });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        //setQuizzCreate({ ...quizzCreate, img: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (quizzCreate.levelId === 0) {
      toast.warning("Please select a level.");
      return;
    }

    if (quizzCreate.categoryId === 0) {
      toast.warning("Please select a category.");
      return;
    }

    // Checking if all questions have a correct answer selected
    const missingCorrectAnswer = quizzCreate.questions.find(
      (question, index) => !question.answers.some((answer) => answer.isCorrect)
    );

    if (missingCorrectAnswer) {
      const questionIndex = quizzCreate.questions.indexOf(missingCorrectAnswer);
      toast.warning(
        `Question ${questionIndex + 1} is missing a correct answer.`
      );
      return;
    }

    try {
      await QuizzService.createQuizz(quizzCreate);
      router.push(`/quizzes`);
    } catch (error) {
      toast.error("Failed to create the quizz, please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.imagePreviewContainer}>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected Preview"
              className={styles.quizzImage}
            />
          ) : (
            <div className={styles.placeholderImage}>No image selected</div>
          )}
        </div>

        <input
          type="file"
          onChange={handleImageChange}
          accept=".png, .jpeg, .jpg"
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

        <div className={styles.dropdowns}>
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
              setQuizzCreate({
                ...quizzCreate,
                levelId: Number(e.target.value),
              });
            }}
            placeholder="Select level"
          />
        </div>

        {quizzCreate.questions.map((question, index) => (
          <QuestionWithAnswers
            key={index}
            question={question.question}
            numQuestion={question.numQuestion}
            answers={question.answers}
            onQuestionChange={(value) => handleQuestionChange(index, value)}
            onAnswerChange={(answerIndex, value) =>
              handleAnswerChange(index, answerIndex, value)
            }
            onCorrectAnswerChange={(answerIndex) =>
              handleCorrectAnswerChange(index, answerIndex)
            }
            onDelete={() => removeQuestion(index)}
            isRemovable={index !== 0} // The first question cannot be removed
          />
        ))}

        <Button
          type="button"
          className={styles.addButton}
          onClick={addQuestion}
        >
          <CiCirclePlus /> Add Question
        </Button>

        <div className={styles.buttonGroup}>
          <Button
            type="button"
            className={styles.cancelButton}
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
