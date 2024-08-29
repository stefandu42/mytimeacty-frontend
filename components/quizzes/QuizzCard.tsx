"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Quizz } from "@/models/quizz";
import { getAuthToken } from "@/utils/authUtils";
import styles from "@/styles/quizzes/quizzCard.module.css";
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";

interface QuizzCardProps {
  quizz: Quizz;
}
export default function QuizzCard({ quizz }: QuizzCardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handlePlayClick = () => {
    console.log("play");
    //router.push(`/play/${quizz.idQuizz}`);
  };

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleProfileClick = () => {
    router.push(`/profile/${quizz.creatorId}`);
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
          <span className={styles.levelLabel}>{quizz.level.label}</span>
          <span className={styles.categoryLabel}>{quizz.category.label}</span>
        </div>
        <div className={styles.actions}>
          <span className={styles.creator}>
            <a
              href={`/profile/${quizz.creatorId}`}
              className={styles.creatorLink}
            >
              {quizz.creatorNickname}
            </a>
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
