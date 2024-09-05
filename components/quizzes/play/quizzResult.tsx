"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuizzPlayService from "@/services/quizzPlay.service";
import QuizzService from "@/services/quizzes.service";
import { QuizzPlayWithAnswer } from "@/models/quizzPlay";
import styles from "@/styles/quizzes/play/quizzResult.module.css";
import { toast } from "react-toastify";
import { QuizzWithDetails } from "@/models/quizz";
import Question from "./question";
import Label from "@/components/general/label";
import { IoStatsChart } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { format } from "date-fns";
import ScoreDisplay from "./scoreDisplay";

interface QuizzResultProps {
  quizzPlayId: number;
}

export default function QuizzResult({ quizzPlayId }: QuizzResultProps) {
  const [quizzPlay, setQuizzPlay] = useState<QuizzPlayWithAnswer | null>(null);
  const [quizz, setQuizz] = useState<QuizzWithDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzPlayDetails = async () => {
      try {
        const result = await QuizzPlayService.getUserAnswersByQuizzPlay(
          quizzPlayId
        );
        setQuizzPlay(result);

        console.log("ok");
        const quizzDetails = await QuizzService.getQuizzWithDetails(
          result.quizzId
        );
        console.log("not");
        setQuizz(quizzDetails);
      } catch (error) {
        toast.error("Failed to get quizz play details");
      }
    };

    fetchQuizzPlayDetails();
  }, [quizzPlayId]);

  if (!quizzPlay || !quizz) return <p>Loading...</p>;

  return (
    <div className={styles.quizzResult}>
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

      <p className={styles.quizzDate}>
        Played on:{" "}
        {quizzPlay.playedAt
          ? format(quizzPlay.playedAt, "dd MMMM yyyy HH:mm")
          : "N/A"}
      </p>

      <div className={styles.score}>
        <ScoreDisplay score={quizzPlay.score} />
      </div>

      {quizz.questions.map((question) => {
        // Answer selected by user
        const userAnswerId = quizzPlay.userAnswers.find((ua) =>
          question.answers.some((answer) => answer.idAnswer === ua.answerId)
        )?.answerId;

        // Correct answer id for that question
        const correctAnswerId = question.answers.find(
          (answer) => answer.isCorrect
        )?.idAnswer;

        return (
          <Question
            key={question.idQuestion}
            question={question}
            selectedAnswer={userAnswerId}
            isResultPage
            correctAnswerId={correctAnswerId}
          />
        );
      })}
    </div>
  );
}
