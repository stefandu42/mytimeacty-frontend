export const getAuthToken = (): string | null => {
  let token = window.localStorage.getItem("token");

  if (!token) {
    token = window.sessionStorage.getItem("token");
  }

  return token;
};
