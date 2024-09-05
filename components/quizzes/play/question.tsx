import type { Question } from "@/models/question";
import Answer from "@/components/quizzes/play/answer";
import styles from "@/styles/quizzes/play/question.module.css";

interface QuestionProps {
  question: Question;
  selectedAnswer: number | undefined;
  correctAnswerId?: number;
  isResultPage?: boolean;
  onAnswerChange?: (questionId: number, answerId: number) => void;
}

export default function Question({
  question,
  selectedAnswer,
  correctAnswerId,
  isResultPage = false,
  onAnswerChange,
}: QuestionProps) {
  return (
    <div className={styles.questionContainer}>
      <h2 className={styles.questionText}>{question.question}</h2>
      <div className={styles.answersContainer}>
        {question.answers.map((answer) => (
          <Answer
            key={answer.idAnswer}
            answer={answer}
            isSelected={selectedAnswer === answer.idAnswer}
            isCorrect={isResultPage && answer.idAnswer === correctAnswerId}
            isIncorrect={
              isResultPage &&
              selectedAnswer === answer.idAnswer &&
              answer.idAnswer !== correctAnswerId
            }
            isResultPage={isResultPage}
            onSelect={() =>
              onAnswerChange?.(question.idQuestion, answer.idAnswer)
            }
          />
        ))}
      </div>
    </div>
  );
}
