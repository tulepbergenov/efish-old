export const addToken = (token: string): void => {
  localStorage.setItem("TOKEN", token);
};
