export const TOKEN_KEY = "x-access-token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = accessToken => {
  localStorage.setItem(TOKEN_KEY, accessToken);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
