export const getToken = () => {
  const token = localStorage.getItem("TOKEN");

  return token;
};

export const setToken = (value: string) => {
  localStorage.setItem("TOKEN", value);
};

export const removeToken = () => {
  localStorage.removeItem("TOKEN");
};
