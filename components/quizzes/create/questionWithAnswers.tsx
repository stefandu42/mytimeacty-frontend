import Input from "@/components/general/input";
import styles from "@/styles/quizzes/create/questionWithAnswers.module.css";

interface Answer {
  answer: string;
  numAnswer: number;
  isCorrect: boolean;
}

interface QuestionWithAnswersProps {
  question: string;
  numQuestion: number;
  answers: Answer[];
  onQuestionChange: (question: string) => void;
  onAnswerChange: (index: number, answer: string) => void;
  onCorrectAnswerChange: (index: number) => void;
  onDelete?: () => void;
  isRemovable?: boolean;
}

export default function QuestionWithAnswers({
  question,
  numQuestion,
  answers,
  onQuestionChange,
  onAnswerChange,
  onCorrectAnswerChange,
  onDelete,
  isRemovable = false,
}: QuestionWithAnswersProps) {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.questionHeader}>
        <Input
          id={`Question${numQuestion}`}
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder={`Question ${numQuestion}`}
          className={styles.questionInput}
          required
        />
        {isRemovable && (
          <button
            className={styles.deleteButton}
            onClick={(e) => {
              e.preventDefault();
              if (onDelete) {
                onDelete();
              }
            }}
          >
            🗑️
          </button>
        )}
      </div>
      <div className={styles.answersContainer}>
        {answers.map((answer, index) => (
          <div key={index} className={styles.answerRow}>
            <Input
              id={`Answer${index + 1}`}
              value={answer.answer}
              onChange={(e) => onAnswerChange(index, e.target.value)}
              placeholder={`Answer ${index + 1}`}
              className={styles.answerInput}
              required
            />
            <input
              type="radio"
              checked={answer.isCorrect}
              onChange={() => onCorrectAnswerChange(index)}
              name={`correct-answer-${numQuestion}`}
              className={styles.correctAnswerRadio}
            />
            <label className={styles.correctLabel}>Correct</label>
          </div>
        ))}
      </div>
    </div>
  );
}
