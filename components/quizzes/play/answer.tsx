import type { Answer } from "@/models/answer";
import styles from "@/styles/quizzes/play/answer.module.css";

interface AnswerProps {
  answer: Answer;
  isSelected: boolean;
  onSelect: () => void;
}

export default function Answer({ answer, isSelected, onSelect }: AnswerProps) {
  return (
    <div
      className={`${styles.answer} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      {answer.answer}
    </div>
  );
}
