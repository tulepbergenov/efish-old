export const getToken = (): string | null => {
  const token = localStorage.getItem("TOKEN");

  if (token) {
    return token;
  }

  return null;
};
