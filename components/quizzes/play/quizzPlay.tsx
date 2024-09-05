"use client";

import { useState, useEffect } from "react";
import QuizzService from "@/services/quizzes.service";
import QuizzPlayService from "@/services/quizzPlay.service";
import { QuizzWithDetails } from "@/models/quizz";
import { useRouter } from "next/navigation";
import { UserAnswerCreate, QuizzPlay } from "@/models/quizzPlay";
import { toast } from "react-toastify";
import Question from "@/components/quizzes/play/question";
import styles from "@/styles/quizzes/play/quizzPlay.module.css";
import Button from "@/components/general/button";
import { format } from "date-fns";
import Label from "@/components/general/label";
import { IoStatsChart } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";

interface QuizPlayerProps {
  quizzId: number;
}

export default function QuizzPlayer({ quizzId }: QuizPlayerProps) {
  const [quizz, setQuizz] = useState<QuizzWithDetails>();
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(
    new Map()
  );
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzDetails = async () => {
      try {
        const quizzDetails = await QuizzService.getQuizzWithDetails(quizzId);
        console.log(quizzDetails);
        setQuizz(quizzDetails);
      } catch (error) {
        toast.error("Failed to get quizz details");
      }
    };

    fetchQuizzDetails();
  }, [quizzId]);

  const handleAnswerChange = (questionId: number, answerId: number) => {
    setUserAnswers((prev) => new Map(prev).set(questionId, answerId));
  };

  const handleSubmit = async () => {
    if (!quizz) return;

    const unansweredQuestions = quizz.questions.some(
      (question) => !userAnswers.get(question.idQuestion)
    );

    if (unansweredQuestions) {
      toast.warning("Not all questions have been answered.");
      return;
    }

    try {
      const userAnswerSubmissions: UserAnswerCreate[] = quizz.questions.map(
        (question) => ({
          answerId: userAnswers.get(question.idQuestion)!,
        })
      );

      const quizzPlay: QuizzPlay = await QuizzPlayService.submitUserAnswers(
        quizzId,
        userAnswerSubmissions
      );

      router.push(`/quizzes/play/result/${quizzPlay.idQuizzPlay}`);
    } catch (error) {
      toast.error("Failed to submit answers:");
    }
  };

  if (!quizz) return <p>Loading...</p>;

  return (
    <div className={styles.quizzPlayer}>
      <h1 className={styles.quizzTitle}>{quizz.quizz.title}</h1>

      <div className={styles.quizzImageContainer}>
        <img
          src="/defaultImage.jpeg"
          alt="Quizz image"
          className={styles.quizzImage}
        />
      </div>

      <div className={styles.labelsAndActions}>
        <div className={styles.labels}>
          <Label
            text={quizz.quizz.level.label}
            icon={<IoStatsChart />}
            level={quizz.quizz.level.label.toLowerCase()}
          />
          <Label text={quizz.quizz.category.label} icon={<BiSolidCategory />} />
        </div>
      </div>

      <p className={styles.quizzCreator}>
        Created by:{" "}
        <a href={`/profile/${quizz.quizz.creatorId}`}>
          {quizz.quizz.creatorNickname}
        </a>
      </p>

      <p className={styles.quizzDate}>
        Created on:{" "}
        {quizz.quizz.createdAt
          ? format(quizz.quizz.createdAt, "dd MMMM yyyy HH:mm")
          : "N/A"}
      </p>

      {quizz.questions.map((question) => (
        <Question
          key={question.idQuestion}
          question={question}
          selectedAnswer={userAnswers.get(question.idQuestion)}
          onAnswerChange={handleAnswerChange}
        />
      ))}

      <Button className={styles.submitButton} onClick={handleSubmit}>
        Submit Answers
      </Button>
    </div>
  );
}
