export const getAuthToken = (): string | null => {
  // Essayer de récupérer le token du localStorage
  let token = window.localStorage.getItem("token");

  // Si le token est null, essayer de récupérer du sessionStorage
  if (!token) {
    token = window.sessionStorage.getItem("token");
  }

  return token;
};
