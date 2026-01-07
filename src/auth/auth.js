export const isAuthenticated = () => {
  return !!localStorage.getItem("sfAuth");
};

export const getAuth = () => {
  const data = localStorage.getItem("sfAuth");
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem("sfAuth");
};
