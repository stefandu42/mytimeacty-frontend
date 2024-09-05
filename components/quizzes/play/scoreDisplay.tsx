import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "@/styles/quizzes/play/scoreDisplay.module.css";

interface ScoreCircleProps {
  score: number;
}

export default function ScoreCircle({ score }: ScoreCircleProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const animationDuration = 2000; // Duration of animation in ms
    let start = 0;
    const increment = score / (animationDuration / 10);
    const interval = setInterval(() => {
      start += increment;
      setAnimatedScore(Math.min(start, score));
      if (start >= score) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, [score]);

  const getColor = (score: number) => {
    if (score >= 90) return "#4caf50"; // Dark green
    if (score >= 70) return "#8bc34a"; // Light green
    if (score >= 50) return "#ffeb3b"; // Yellow
    if (score >= 30) return "#ff9800"; // Orange
    return "#f44336"; // Red
  };

  return (
    <div className={styles.circleContainer}>
      <CircularProgressbar
        value={animatedScore}
        text={`${Math.round(animatedScore)}%`}
        strokeWidth={12}
        styles={buildStyles({
          pathColor: getColor(score),
          textColor: getColor(score),
          trailColor: "#d6d6d6",
          textSize: "20px",
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  );
}
