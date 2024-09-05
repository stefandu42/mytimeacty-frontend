import type { Answer } from "@/models/answer";
import styles from "@/styles/quizzes/play/answer.module.css";

interface AnswerProps {
  answer: Answer;
  isSelected: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  isResultPage?: boolean;
  onSelect?: () => void;
}

export default function Answer({
  answer,
  isSelected,
  isCorrect = false,
  isIncorrect = false,
  isResultPage = false,
  onSelect,
}: AnswerProps) {
  return (
    <div
      className={`${styles.answer} ${
        !isResultPage ? styles.noResultPage : ""
      } ${isSelected ? styles.selected : ""} ${
        isCorrect ? styles.correct : ""
      } ${isIncorrect ? styles.incorrect : ""} ${
        isResultPage ? styles.noHover : ""
      }`}
      onClick={!isResultPage ? onSelect : undefined}
    >
      {answer.answer}
    </div>
  );
}
