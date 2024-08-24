const getAll = async () => {
  const res = await fetch("http://localhost:4000/quizzes", {
    next: {
      revalidate: 0,
    },
  });
  const data = await res.json();
  return data;
};

export { getAll };
