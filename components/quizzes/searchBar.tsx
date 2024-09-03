"use client";

import { useState, useEffect } from "react";
import CategoryService from "@/services/category.service";
import LevelService from "@/services/level.service";
import { QuizzCategory } from "@/models/quizz";
import { QuizzLevel } from "@/models/quizz";
import styles from "@/styles/quizzes/searchBar.module.css";
import { useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import Dropdown from "./dropdown";
import Input from "../general/input";

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

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(search, selectedCategory, selectedLevel);
  };

  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
      <Input
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title or by nickname..."
        className={styles.searchInput}
      />
      <Dropdown
        options={categories.map((category) => ({
          value: category.idCategory,
          label: category.label,
        }))}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        placeholder="All categories"
      />

      <Dropdown
        options={levels.map((level) => ({
          value: level.idLevel,
          label: level.label,
        }))}
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        placeholder="All levels"
      />
      <button type="submit" className={styles.searchButton}>
        <CiSearch />
        Search
      </button>
    </form>
  );
}
