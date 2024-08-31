"use client";

import { useState, useEffect } from "react";
import CategoryService from "@/services/category.service";
import LevelService from "@/services/level.service";
import { QuizzCategory } from "@/models/quizz";
import { QuizzLevel } from "@/models/quizz";
import styles from "@/styles/quizzes/searchBar.module.css";
import { useSearchParams } from "next/navigation";

interface SearchBarProps {
  onSearch: (search: string, category: string, level: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<QuizzCategory[]>([]);
  const [levels, setLevels] = useState<QuizzLevel[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedLevel, setSelectedLevel] = useState(
    searchParams.get("level") || ""
  );

  useEffect(() => {
    const fetchCategoriesAndLevels = async () => {
      try {
        const categoriesData = await CategoryService.getAllCategories();
        const levelsData = await LevelService.getAllLevels();
        setCategories(categoriesData);
        setLevels(levelsData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des catégories et niveaux:",
          error
        );
      }
    };

    fetchCategoriesAndLevels();
  }, []);

  const handleSearch = () => {
    onSearch(search, selectedCategory, selectedLevel);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search by title or by nickname..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className={styles.dropdown}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.idCategory} value={category.label}>
            {category.label}
          </option>
        ))}
      </select>
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        className={styles.dropdown}
      >
        <option value="">All levels</option>
        {levels.map((level) => (
          <option key={level.idLevel} value={level.label}>
            {level.label}
          </option>
        ))}
      </select>
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
    </div>
  );
}
