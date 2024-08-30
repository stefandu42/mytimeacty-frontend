"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizzWithLikeAndFavourite } from "@/models/quizz";
import { getAuthToken } from "@/utils/authUtils";
import styles from "@/styles/quizzes/quizzCard.module.css";
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import QuizzService from "@/services/quizzes.service";
import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";

interface QuizzCardProps {
  quizz: QuizzWithLikeAndFavourite;
}
export default function QuizzCard({ quizz }: QuizzCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsFavourite(quizz.favourite);
    setIsLiked(quizz.liked);
  }, []);

  const handlePlayClick = () => {
    console.log("play");
    //router.push(`/play/${quizz.idQuizz}`);
  };

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    if (!isFavourite) QuizzService.favouriteQuizz(quizz.idQuizz);
    else QuizzService.unfavouriteQuizz(quizz.idQuizz);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) QuizzService.likeQuizz(quizz.idQuizz);
    else QuizzService.unlikeQuizz(quizz.idQuizz);
  };

  const getLevelClass = (level: string) => {
    switch (level.toLowerCase()) {
      case "easy":
        return styles.levelEasy;
      case "medium":
        return styles.levelMedium;
      case "hard":
        return styles.levelHard;
      default:
        return "";
    }
  };

  return (
    <div className={styles.quizzCard}>
      <div className={styles.imageAndTitle}>
        <img
          src="/defaultImage.jpeg"
          alt={quizz.title}
          className={styles.quizzImage}
        />
        <div className={styles.titleAndButton}>
          <h3 className={styles.title}>{quizz.title}</h3>
          <button className={styles.playButton}>Jouer</button>
        </div>
      </div>
      <div className={styles.labelsAndActions}>
        <div className={styles.labels}>
          <span
            className={`${styles.label} ${getLevelClass(quizz.level.label)}`}
          >
            <IoStatsChart className={styles.icon} />
            {quizz.level.label}
          </span>
          <span className={styles.label}>
            <BiSolidCategory className={styles.icon} />
            {quizz.category.label}
          </span>
        </div>
        <div className={styles.actions}>
          <span className={styles.creator}>
            <Link
              href={`/profile/${quizz.creatorId}`}
              className={styles.creatorLink}
            >
              {quizz.creatorNickname}
            </Link>
          </span>
          <div className={styles.emojiContainer}>
            <span
              className={styles.emoji + " " + styles.emojiStar}
              onClick={handleFavourite}
            >
              {isFavourite ? <FaStar /> : <FaRegStar />}
            </span>
            <span
              className={styles.emoji + " " + styles.emojiHeart}
              onClick={handleLike}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
