export const getAuthToken = (): string | null => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  return token;
};

export const clearToken = (): void => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};
