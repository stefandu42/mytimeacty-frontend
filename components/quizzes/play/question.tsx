import type { Question } from "@/models/question";
import Answer from "@/components/quizzes/play/answer";
import styles from "@/styles/quizzes/play/question.module.css";

interface QuestionProps {
  question: Question;
  selectedAnswer: number | undefined;
  onAnswerChange: (questionId: number, answerId: number) => void;
}

export default function Question({
  question,
  selectedAnswer,
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
            onSelect={() =>
              onAnswerChange(question.idQuestion, answer.idAnswer)
            }
          />
        ))}
      </div>
    </div>
  );
}
