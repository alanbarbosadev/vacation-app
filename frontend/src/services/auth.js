export const isAuthenticated = () => localStorage.getItem("TOKEN_KEY") !== null;
export const signOutUser = () => {
  // localStorage.removeItem("TOKEN_KEY");
  localStorage.removeItem("ID_USER");
  localStorage.removeItem("CURRENT_USER");
};
export const getUserAuthenticated = () => localStorage.getItem("ID_USER");
export const getCurrentUser = () => localStorage.getItem("CURRENT_USER");
export const getToken = () => localStorage.getItem("TOKEN_KEY");
export const getRole = () => localStorage.getItem("ROLE");
export const getAuthHeader = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  };
};
